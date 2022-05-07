export function plainObjectToArray(arr: [], prop: string) {
  // extract value from property
  let extractedValue = arr.map((item) => item[prop])

  return extractedValue
}
