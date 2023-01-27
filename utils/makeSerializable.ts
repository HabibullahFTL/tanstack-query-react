export const makeSerializable = <T extends any>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};
