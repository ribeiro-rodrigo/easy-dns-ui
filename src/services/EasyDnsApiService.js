class EasyDnsApiService {

    static async findAllZones() {
        return [
            {
                "zone": "test.example.com",
                "records": [
                    { name: "host1.test.example.com", "type": "A", "ttl": "300", "answer": "201.17.89.171" },
                    { name: "host25.test.example.com", "type": "CNAME", "ttl": "300", "answer": "201.17.89.171" }
                ]
            }
        ]
    }
}

export default EasyDnsApiService

