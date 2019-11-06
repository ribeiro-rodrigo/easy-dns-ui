
class EasyDnsApiService {

    static async findAllZones() {

        const headers = new Headers({ 'Authorization': `Bearer ${token}` });
        const init = {
            headers,
            mode: 'cors'
        }

        let zones = await fetch(`/v1/dns/zones`, init).then(response => response.json())

        return zones
    }
}

export default EasyDnsApiService

