export const flattenFirebaseList = (list) =>
  Object.keys(list).map((key) => ({ key, ...list[key] }));
