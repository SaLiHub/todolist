import { DataList } from "../types/interfaces";

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

export function countCompletedTasks(data: DataList[]) {
    if (data.length === 0) return 0;
    let completed = 0;
    data.forEach((curr) => {
        if (curr.isChecked) completed += 1;
    }, 0)
    return completed;
}