export function cleanLatOrLongString(value: string) {
    const arr = value.replace(/[^0-9\,\.]/g, '').replace(',', '.')
    .split(".")
    let rs = arr.shift()
    return rs + '.' + arr.join()
}