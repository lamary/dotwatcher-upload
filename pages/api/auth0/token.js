import axios from "axios";

/**
 * Get all users from Auth0
 *
 * @param {*} req: NextRequest
 * @param {*} res: NextResponse
 */

const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;

export default async function handle(req, res) {
  switch (req.method.toLowerCase()) {
    case "get":
      try {
        const { data } = await axios({
          method: "POST",
          url: `https://${AUTH0_DOMAIN}/oauth/token`,
          headers: { "content-type": "application/json" },
          data: {
            client_id: AUTH0_CLIENT_ID,
            client_secret: AUTH0_CLIENT_SECRET,
            audience: `https://${AUTH0_DOMAIN}/api/v2/`,
            grant_type: "client_credentials",
          },
        });

        res.send(data);
      } catch (err) {
        res.send(err);
      }

      break;

    default:
      res.send("Nothing to see here");
      break;
  }
}
