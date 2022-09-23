export function parseDate(el: string | undefined) {
    if (el === undefined) return '';
    return new Date(Date.parse(el)).toLocaleDateString()
}

export function parseTime(el: string | undefined) {
    if (el === undefined) return '';
    return new Date(Date.parse(el)).toLocaleTimeString()
}

export function isValidEmail(email: string) {
    return /\S+@\S+.\S+/.test(email);
}