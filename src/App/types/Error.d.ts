export interface Error {
    param: string;
    msg: string;
}

export interface ErrorResponse {
    errors: Error[]
}