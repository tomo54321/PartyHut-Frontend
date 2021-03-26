export interface APIError {
    param: string;
    msg: string;
}

export interface APIErrorResponse {
    errors: APIError[]
}

export interface APIUserResponse{
    id: string;
    username: string;
    createdAt?: Date;
}