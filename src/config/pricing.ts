export const durations = [
  { id: "1", label: "1 Month", days: 30 },
  { id: "3", label: "3 Months", days: 90 },
  { id: "6", label: "6 Months", days: 180 },
  { id: "12", label: "12 Months", days: 360 },
] as const;
export type DurationId = (typeof durations)[number]["id"];
export const connectionOptions = [1, 2, 3, 4, 5, 6] as const;
export type Connections = (typeof connectionOptions)[number];
export const priceMatrix: Record<Connections, Record<DurationId, number>> = {
  1: { "1": 23, "3": 37, "6": 47, "12": 67 },
  2: { "1": 39, "3": 63, "6": 80, "12": 114 },
  3: { "1": 78, "3": 126, "6": 160, "12": 228 },
  4: { "1": 117, "3": 189, "6": 240, "12": 342 },
  5: { "1": 156, "3": 252, "6": 320, "12": 456 },
  6: { "1": 196, "3": 315, "6": 399, "12": 570 },
};
export const priceFor = (duration: DurationId, connections: Connections) =>
  priceMatrix[connections][duration];
export const formatPrice = (price: number) =>
  Number.isInteger(price) ? price.toFixed(0) : price.toFixed(2);
