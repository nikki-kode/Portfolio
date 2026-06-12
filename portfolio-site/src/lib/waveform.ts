export function waveform(key: string, n: number): number[] {
  let seed = 0;
  for (let i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) % 9973;
  const bars: number[] = [];
  for (let i = 0; i < n; i++) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    bars.push(18 + (seed % 82));
  }
  return bars;
}
