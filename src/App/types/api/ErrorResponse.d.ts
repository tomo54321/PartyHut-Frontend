export namespace PartyHutAPI {
    interface Error {
        param: string;
        msg: string;
    }
    interface ErrorResponse {
        errors: Error[];
    }
}