export function parseDate(el: string) {
    return new Date(Date.parse(el)).toLocaleDateString()
}

export function parseTime(el: string) {
    return new Date(Date.parse(el)).toLocaleTimeString()
}