import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createPreviewController,validatePreviewFile} from '../src/lib/transcriptionPreview.mjs';
const config={enabled:true,maxFileBytes:1024,previewSeconds:60,dailyAttempts:3,supportedExtensions:['wav','mp3']};
const result={text:'<b>Actual transcript</b>',processedSeconds:60,hasMoreAudio:true};
const file={name:'voice.wav',size:100};
test('rejects unsupported, empty and oversize files before sending',()=>{
  assert.match(validatePreviewFile({...file,size:1025},config),/25|limit|large/i);
  assert.match(validatePreviewFile({...file,size:0},config),/empty/i);
  assert.match(validatePreviewFile({...file,name:'file.exe'},config),/format/i);
  assert.equal(validatePreviewFile(file,config),'');
});
test('returns real text and preserves it after a later failed request',async()=>{
  let calls=0;
  const c=createPreviewController({getConfig:async()=>config,transcribe:async()=>{if(++calls===2)throw new Error('Offline');return result;}});
  await c.init();c.select(file);await c.submit();
  assert.equal(c.state.result.text,result.text); assert.equal(c.state.status,'success');
  await c.submit();assert.equal(c.state.result.text,result.text);assert.equal(c.state.error,'Offline');assert.equal(calls,2);
});
test('does not submit while unavailable or already running',async()=>{
  let finish;let calls=0;
  const c=createPreviewController({getConfig:async()=>config,transcribe:()=>{calls++;return new Promise(r=>finish=r);}});
  await c.submit(); assert.equal(calls,0);
  await c.init();c.select(file);const first=c.submit();await c.submit();assert.equal(calls,1);finish(result);await first;
});
test('service config controls availability instead of a fake form',async()=>{
  const c=createPreviewController({getConfig:async()=>({...config,enabled:false}),transcribe:async()=>{throw Error('should not send');}});
  await c.init();c.select(file);await c.submit();assert.equal(c.state.status,'disabled');
});
test('late responses after dispose do not change the page',async()=>{
  let finish;const c=createPreviewController({getConfig:async()=>config,transcribe:()=>new Promise(r=>finish=r)});
  await c.init();c.select(file);const p=c.submit();c.dispose();finish(result);await p;assert.equal(c.state.result,null);
});
