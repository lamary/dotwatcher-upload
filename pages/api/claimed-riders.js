import db from "../../database";

export default async function handle(req, res) {
  try {
    const { rows: results } = await db.query("SELECT * from riders where riders.auth_id != ''");
    res.send({ results });
  } catch (error) {
    res.json({ error });
  }
}
