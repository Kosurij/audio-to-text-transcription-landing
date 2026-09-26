export const faqs = [
  {
    question: 'What is Audio To Text Transcription?',
    answer: 'Audio To Text Transcription is a Chrome extension that turns any audio—from meetings, lectures, podcasts, or browser tabs—into searchable text powered by advanced AI.'
  },
  {
    question: 'What recording modes are available?',
    answer: 'You can upload an audio file, capture audio from your microphone, record the current browser tab, or combine microphone + tab recording. Switch between modes instantly.'
  },
  {
    question: 'How does the transcription work?',
    answer: 'We use advanced AI to deliver fast, high-quality transcripts—even for long sessions and diverse accents.'
  },
  {
    question: 'Does the extension support themes?',
    answer: 'Yes. Audio To Text Transcription adapts to both light and dark themes automatically, and you can toggle them manually in the settings.'
  },
  {
    question: 'Which audio/video formats are supported?',
    answer: 'We support 14 audio and video formats: FLAC, MP3, M4A, MPEG, MPGA, OGG, WAV, WEBM, AAC, OPUS, WMA, MOV, MP4, and M4V. The extension can extract and transcribe audio from video files as well.'
  },
  {
    question: 'Can I edit transcripts inside the extension?',
    answer: 'Yes, users can edit transcripts. You will see both the original and edited versions side by side.'
  },
  {
    question: 'How accurate are the results?',
    answer: 'Accuracy depends on the recording quality. Our AI model delivers excellent results for clear speech with minimal background noise.'
  },
  {
    question: 'Is Audio To Text Transcription free to use?',
    answer: 'Yes. The Free plan includes 200 minutes per week. Optional paid subscriptions grant a larger minute allowance upfront each month, plus priority processing and priority support.'
  },
  {
    question: 'How do paid plan minute allowances work?',
    answer: 'Paid plans grant your full minute allowance upfront at the start of each month, rather than refreshing weekly. Unused minutes do not roll over into the next month.'
  },
  {
    question: 'What happens when I upgrade?',
    answer: 'A paid plan gives you a larger monthly minute allowance upfront, priority processing and priority support. Pro and Max also use 33% fewer minutes in High Accuracy mode.'
  },
  {
    question: 'Can I cancel my subscription?',
    answer: 'Yes. You can cancel a paid subscription at any time, and every paid plan includes a 30-day money-back guarantee.'
  }
];

export const steps = [
  {
    title: 'Install the Extension',
    description: 'Add Audio to Text to Chrome with one click. The extension appears in your toolbar instantly.',
    mediaLabel: 'Screenshot → /screenshots/chrome-store.png\nСкрин страницы расширения в Chrome Web Store: кнопка "Add to Chrome", иконка, рейтинг',
  },
  {
    title: 'Upload or Record Audio',
    description: 'Drop an audio or video file, or click Record to capture your microphone or any browser tab in real time. MP3, WAV, M4A, OGG, MP4 and more.',
    mediaLabel: 'GIF → /gifs/upload-step.gif\nЗапись: открыть попап → нажать Upload → выбрать файл в диалоге → появляется прогресс-бар загрузки',
  },
  {
    title: 'Get Your Transcript',
    description: 'Accurate text appears in seconds. Edit inline, copy to clipboard, or download as TXT.',
    mediaLabel: 'GIF → /gifs/transcript-result.gif\nЗапись: прогресс завершается → текст транскрипции появляется → пользователь нажимает Copy или Download TXT',
  },
];

// Chrome Web Store snapshot checked on 2026-09-15. Keep display and schema in sync.
export const storeRating = { value: "5.0", count: "70" };
