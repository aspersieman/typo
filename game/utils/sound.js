export var trackOffset = 0;
export const audioCtx = new AudioContext();
export const getFile = async (filepath) => {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const loadFile = async (filePath) => {
  const track = await getFile(filePath);
  return track;
};

export const playTrack = (audioBuffer) => {
  const trackSource = new AudioBufferSourceNode(audioCtx, {
    buffer: audioBuffer,
  });
  trackSource.connect(audioCtx.destination);

  if (trackOffset == 0) {
    trackSource.start();
    trackOffset = audioCtx.currentTime;
  } else {
    trackSource.start(0, audioCtx.currentTime - trackOffset);
  }

  return trackSource;
};
