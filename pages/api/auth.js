import fetch from 'isomorphic-fetch';

export default async function handle(req, res) {
  const result = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${req.query.code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  const response = await result.json()

  res.writeHead(302, { Location: `/?auth=${response.access_token}` })
  return res.end()
}
