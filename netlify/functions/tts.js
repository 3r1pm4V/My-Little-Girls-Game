const https = require('https');

const API_KEY = process.env.VIENEU_API_KEY || '';
const DEFAULT_VOICE = 'Trúc Ly';

exports.handler = async function(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  if (!API_KEY) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'VIENEU_API_KEY environment variable is not configured in Netlify.' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const text = (data.text || '').trim();
    const voice = data.voice || DEFAULT_VOICE;

    if (!text) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Text required' })
      };
    }

    const payload = JSON.stringify({
      model: 'vieneu-v4',
      input: text,
      voice: voice
    });

    const buf = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.vieneu.io',
        path: '/api/v1/audio/speech',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          const resBuf = Buffer.concat(chunks);
          if (res.statusCode === 200) resolve(resBuf);
          else reject(new Error(`Vieneu API ${res.statusCode}: ${resBuf.toString()}`));
        });
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    const base64Audio = `data:audio/mpeg;base64,${buf.toString('base64')}`;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ url: base64Audio, cached: false })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: err.message })
    };
  }
};
