
export function padToStringByTotalDigits(val: number, totalDigits: number) {
  const str = String(val).toString();
  return str.padStart(totalDigits, "0");
}

export function generateSlid(networkName: string, onuId: number){
    let networkSubName = networkName.split('-')[1].substring(3)
    return `${networkSubName}${padToStringByTotalDigits(onuId, 4)}`
}