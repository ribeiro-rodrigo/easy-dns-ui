var url = 'http://localhost:8081';
var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzMwMjc4MjcsIm5iZiI6MTU3MzAyNzgyNywianRpIjoiZTg3MWViZDEtMzVjYS00Njg3LWFjNmMtOTIwN2NkZjI3OGY5IiwiZXhwIjoxNTczMDMwMjI3LCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.xKSZtd324iNYGLMuiTJYJHzpQBYQJMDXq4JCE9FOKkY'
const headers = new Headers({ 'Authorization': `Bearer ${token}` });
let init = {
    headers,
    mode: 'cors'
}

class EasyDnsApiService {

    static async findAllZones() {

        let zones = await fetch(`${url}/v1/dns/zones`, init).then(response => response.json())

        return zones
    }

    static async removeRecord(zoneName, recordName) {
        init = { ...init, method: 'DELETE' }
        let response = await fetch(`${url}/v1/dns/zones/${zoneName}/records/${recordName}`, init)
        return response.status
    }
}

export default EasyDnsApiService

