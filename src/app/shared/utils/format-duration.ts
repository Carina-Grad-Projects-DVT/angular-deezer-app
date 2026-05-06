export const formatDuration = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
