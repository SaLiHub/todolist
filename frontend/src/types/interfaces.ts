export interface FieldProps {
    id: string,
    helperText?: string,
    error?: boolean
}

export interface ChangeHolder {
    sendRequest: (closeSnack?: boolean) => {}
    timeout: NodeJS.Timeout
}

export interface DataList {
    id: number,
    isChecked: boolean,
    startedAt: string,
    finishedAt: string,
    value: string,
}

export interface PendingState {
    id: number,
    action: string
}
