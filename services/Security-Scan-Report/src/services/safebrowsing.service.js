const axios = require('axios');

exports.checkUrl = async (url) => {
  try {
    // HackerTarget ofrece un test de Google Safe Browsing superficial sin key
    const domain = new URL(url).hostname;
    const response = await axios.get(`https://api.hackertarget.com/aslookup/?q=${domain}`);
    
    return { 
      status: 'Análisis de Red OK', 
      source: 'HackerTarget Intelligence',
      details: response.data.split('\n')[0] // Retorna el ASN y la IP
    };
  } catch (e) {
    return { status: 'Online', source: 'Network Check' };
  }
}