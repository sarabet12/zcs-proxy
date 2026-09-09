
export default async function handler(req, res) {
  const { thingKey } = req.query;
  const clientCode = req.headers['client-code'] || req.query.clientCode;
  const authKey = req.headers['auth-key'] || req.query.authKey;

  if (!thingKey) {
    return res.status(400).json({ error: 'Missing thingKey parameter' });
  }

  const targetUrl = `http://www.zcsazzurroportal.com:18082/realtime/getRealtimeData?thingKey=${thingKey}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Client-Code': clientCode,
        'Auth-Key': authKey
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy error', details: error.message });
  }
}
