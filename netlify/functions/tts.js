// Serverless stub: Tất cả âm thanh giọng đọc đã được sinh sẵn bằng Local CIT Voice Studio (Giọng Mai Anh, tốc độ 0.9)
// và đóng gói offline trong thư mục audio/ + audio-map.js. Không gọi API cloud bên ngoài.
exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      }
    };
  }
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ error: 'Offline pre-generated audio only (CIT Voice Studio Mai Anh 0.9x).' })
  };
};
