var url = ``;

class EasyDnsApiService {

    static async findAllZones() {

        let init = this._makeInit();

        let zones = await fetch(`${url}/v1/dns/zones`, init).then(response => response.json())

        return zones
    }

    static async removeRecord(zoneName, recordName) {
        let init = this._makeInit();
        init = { ...init, method: 'DELETE' }
        let response = await fetch(`${url}/v1/dns/zones/${zoneName}/records/${recordName}`, init)
        return response.status
    }

    static async saveRecord(zoneName, record) {

        let headers = this._makeHeaders()
        headers.append('Content-Type', 'application/json')

        let init = this._makeInit();
        init = { ...init, method: 'POST', body: JSON.stringify(record), headers }
        let response = await fetch(`${url}/v1/dns/zones/${zoneName}/records`, init)

        let json = response.status === 201 ? await response.json().then(data => data) : {}

        return { statusCode: response.status, content: json }
    }

    static async editRecord(zoneName, record) {
        let headers = this._makeHeaders()
        headers.append('Content-Type', 'application/json')

        let init = this._makeInit();
        init = { ...init, method: 'PUT', body: JSON.stringify(record), headers }
        let response = await fetch(`${url}/v1/dns/zones/${zoneName}/records/${record.recordName}`, init)

        return response.status
    }

    static async authUser(username, password) {


        let headers = this._makeHeaders()
        headers.append('Content-Type', 'application/json')

        let init = {
            ...init,
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers
        }

        let response = await fetch(`${url}/auth`, init).then(response => response)

        let json = response.status === 200 ? await response.json().then(data => data) : {}

        return { statusCode: response.status, content: json }
    }

    static _getToken() {
        const token = localStorage.getItem('token');
        return `Bearer ${token}`;
    }

    static _makeHeaders() {
        const headers = new Headers({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
        return headers

    }

    static _makeInit() {
        return {
            headers: this._makeHeaders(),
            mode: 'cors'
        }
    }
}

export default EasyDnsApiService

