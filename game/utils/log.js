export const log = (lap) => {
  log.prev = log.prev || performance.now();
  if (lap)
    console.log(`${lap} in: ${(performance.now() - log.prev).toFixed(3)}ms`);
  else console.log("log initialised");
  log.prev = performance.now();
};
