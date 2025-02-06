// pages/api/proxy/[...path].js
// app/api/q2/:path
export default async function handler(req, res) {
  const { path } = req.query;
  const apiUrl = `https://external-api.com/${path.join('/')}`;

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward any necessary headers
        ...req.headers,
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error proxying request' });
  }
}
