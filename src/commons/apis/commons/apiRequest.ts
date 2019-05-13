import config from '../../../config';

const API_SERVER = `${config.protocol}://${config.apiHost}:${config.apiPort}`;

interface IMakeApiRequestOptions {
    method: string,
    uri: string,
    params: {
        [key: string]: string
    },
    headers: {
        [key: string]: string
    },
    body: {
        [key: string]: any
    }
}

async function makeApiRequest(options: IMakeApiRequestOptions): Promise<Response> {
    function param(params: { [key: string]: any }) {
        if (!params) {
            return '';
        }

        let pairs = [];
        for (const key in params) {
            const value = params[key];
            if (value !== undefined) {
                pairs.push(`${key}=${encodeURIComponent(String(value))}`);
            }
        }

        return pairs.join('&');
    }

    function buildUrl(baseUri: string, uri: string, params: { [key: string]: any }) {
        const queryString = param(params);
        if (queryString) {
            return `${baseUri}${uri}?${queryString}`;
        }
        return `${baseUri}${uri}`;
    }

    const url = buildUrl(API_SERVER, options.uri, options.params);

    const fetchResponse = await fetch(url, {
        mode: "cors",
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    });

    return fetchResponse;
}

interface IRequestApiOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    resource: string,
    params?: {
        [key: string]: any
    },
    body?: {
        [key: string]: any
    },
    tokenIncluded?: boolean
}

export interface IApiResponse {
    isOk: boolean,
    status?: number,
    body?: {
        message?: string,
        [other: string]: any
    }
}

async function requestApi(options: IRequestApiOptions): Promise<IApiResponse> {
    const { method, resource, params, body, tokenIncluded } = options;
    let headers: { [key: string]: string } = {
        'Content-Type': 'application/json'
    }

    if (tokenIncluded) {
        const expiredAtRaw = localStorage.getItem('expiredAt');
        if (!expiredAtRaw) {
            expiredAtRaw && localStorage.setItem('expiredAt', String(Date.now()));
        }

        const expiredAt = new Date(Number.parseInt(expiredAtRaw));
        const difference = Date.now() - expiredAt.getTime();
        const differenceMinutes = Math.ceil(difference / 1000 / 60);
        if (differenceMinutes <= 5) {
            const userId = localStorage.getItem('userId');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await requestApi({
                method: 'POST',
                resource: '/token',
                body: {
                    userId: userId,
                    refreshToken: refreshToken
                },
                tokenIncluded: false
            });

            if (!response.isOk) {
                return response
            }

            if (response.status === 200) {
                localStorage.setItem('refreshToken', response.body.refreshToken);
                localStorage.setItem('accessToken', response.body.accessToken);
                localStorage.setItem('expiredAt', String(response.body.expiredAt));
                localStorage.setItem('user', JSON.stringify(response.body.user));
            } else {
                localStorage.clear();
                window.location.replace('/login');
                return;
            }
        }

        const accessToken = localStorage.getItem('accessToken');
        headers['X-Access-Token'] = accessToken;
    }

    let result: IApiResponse;
    try {
        const response = await makeApiRequest({
            method: method,
            uri: resource,
            headers: headers,
            body: body,
            params: params
        });

        result = {
            isOk: true,
            status: response.status,
            body: await response.json()
        };
    } catch (ex) {
        result = {
            isOk: false
        }
    }

    return result;
}

export default requestApi;
