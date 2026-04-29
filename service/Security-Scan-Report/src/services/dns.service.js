const axios = require('axios');

exports.checkDNS = async (domain) => {
    try {
        const response = await axios.get(`https://1.1.1.1/dns-query?name=${domain}&type=A`, {
            headers: { 'accept': 'application/dns-json' }
        });

        if (response.data.Answer) {
            return {
                status: 'Protegido',
                source: 'Cloudflare Resolver',
                details: response.data.Answer[0].data // Esto devuelve la IP real
            };
        }
        return { status: 'Vulnerable', source: 'DNS', details: 'No se hallaron registros A' };
    } catch (e) {
        return { status: 'Error', source: 'DNS', details: 'Timeout en resolución' };
    }
};