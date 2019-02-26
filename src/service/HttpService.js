export default class HttpService {
    _handleErrors(res) {
        if (res.ok)
            return res;
        throw res;
    }

    _getRequestInfo(body, method) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': localStorage.getItem('auth-token')
            },
            method: method,
            body: JSON.stringify(body)
        };
    }

    get(url) {
        return fetch(url, this._getRequestInfo(undefined, 'get'))
            .then(this._handleErrors)
            .then(res => res.json())
            .catch(res => {
                console.log(res);
                throw res;
            });
    }

    post(url, body) {
        return fetch(url, this._getRequestInfo(body, 'post'))
            .then(this._handleErrors)
            .then(res => res.json())
            .catch(res => {
                console.log(res);
                throw res;
            });
    }
}