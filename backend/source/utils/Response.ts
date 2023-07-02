export interface JsonResponseModel {
    status: Boolean;
    status_code: Number;
    message: String;
    results: Array<any> | Object | Object;
}

export function httpInternalServerError(response: Array<any> | Object, message: string) {
    const json_response: JsonResponseModel = {
        status: false,
        status_code: 500,
        message: message,
        results: response
    }
    return json_response;
}


export function httpOk(response: Array<any> | Object, message: string) {
    const json_response: JsonResponseModel = {
        status: true,
        status_code: 200,
        message: message,
        results: response
    }
    return json_response;
}

export function httpUnauthorized(response: Array<any> | Object, message: string) {
    const json_response: JsonResponseModel = {
        status: false,
        status_code: 401,
        message: message,
        results: response
    }
    return json_response;
}

export function httpNotFoundOr404(response: Array<any> | Object, message: string) {
    const json_response: JsonResponseModel = {
        status: false,
        status_code: 404,
        message: message,
        results: response
    }
    return json_response;
}