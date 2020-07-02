import axios from "axios";

/**
 * Get all users from Auth0
 *
 * @param {*} req: NextRequest
 * @param {*} res: NextResponse
 */
const baseURL = process.env.GITHUB_REDIRECT_URL || `https://${process.env.VERCEL_URL}`;

export default async function handle(req, res) {
  try {
    const { data: token } = await axios({ method: "get", url: baseURL + "/api/auth0/token" });
    switch (req.method.toLowerCase()) {
      case "get":
        const body = {
          ...req.query,
          include_totals: true,
        };

        var query = Object.keys(body)
          .map((key) => key + "=" + body[key])
          .join("&");

        try {
          const { data: users } = await axios({
            method: "get",
            url: process.env.AUTH0_API_URL + "users" + `?${query}`,
            headers: { Authorization: `Bearer ${token.access_token}` },
          });

          res.send(users);
        } catch (err) {
          console.log(err);
          res.send(err);
        }

        break;

      default:
        res.send("Nothing to see here");
        break;
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}
