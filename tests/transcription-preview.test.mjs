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
test('disabled config does not prevent trying the endpoint; its error is shown',async()=>{
  let calls=0;
  const c=createPreviewController({getConfig:async()=>({...config,enabled:false}),transcribe:async()=>{calls++;throw Error('Service unavailable');}});
  await c.init();c.select(file);await c.submit();assert.equal(calls,1);assert.equal(c.state.status,'error');assert.equal(c.state.error,'Service unavailable');
});
test('late responses after dispose do not change the page',async()=>{
  let finish;const c=createPreviewController({getConfig:async()=>config,transcribe:()=>new Promise(r=>finish=r)});
  await c.init();c.select(file);const p=c.submit();c.dispose();finish(result);await p;assert.equal(c.state.result,null);
});
test('file selection works before config arrives or when the API is offline', async()=>{
  let calls=0;
  const c=createPreviewController({getConfig:async()=>{throw Error('Offline')},transcribe:async()=>{calls++;throw Error('Service unavailable')}});
  c.select(file);assert.equal(c.state.file,file);
  await c.init();c.select({...file,name:'second.wav'});assert.equal(c.state.file.name,'second.wav');
  await c.submit();assert.equal(calls,1);assert.match(c.state.error,/unavailable/i);
});
test('offline selection still rejects files above 100 MiB and unsupported formats',()=>{
  const c=createPreviewController();
  c.select({...file,size:100*1024*1024});assert.ok(c.state.file);
  c.select({...file,size:100*1024*1024+1});assert.equal(c.state.file,null);
  c.select({...file,name:'bad.exe'});assert.equal(c.state.file,null);
});

test('removing or replacing the selected file clears its transcript even with unavailable config',async()=>{
  for(const nextFile of [null,{name:'next.mp3',size:100},{name:'invalid.exe',size:100}]){
    const c=createPreviewController({getConfig:async()=>({...config,enabled:false}),transcribe:async()=>result});
    await c.init();c.select(file);await c.submit();assert.equal(c.state.result,result);
    c.state.progress=100;c.select(nextFile);
    assert.equal(c.state.result,null);assert.equal(c.state.progress,0);assert.equal(c.state.status,'idle');
  }
});
test('a late config response cannot replace the active upload abort controller',async()=>{
  let resolveConfig, resolveUpload, uploadSignal;
  const c=createPreviewController({getConfig:()=>new Promise(r=>resolveConfig=r),transcribe:(_f,signal)=>{uploadSignal=signal;return new Promise(r=>resolveUpload=r)}});
  c.select(file);const uploading=c.submit();const loading=c.init();
  c.dispose();assert.equal(uploadSignal.aborted,true);
  resolveConfig(config);resolveUpload(result);await Promise.all([loading,uploading]);
  assert.equal(c.state.result,null);
});
