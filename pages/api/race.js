import db from "../../database";

export default async function handle(req, res) {
  const { id } = req.query;

  try {
    const { rows: race } = await db.query(`SELECT * FROM races WHERE races.id = '${id}';`);
    const { rows: results } = await db.query(
      `SELECT riders.name, riders.nationality, results.position, results.cap, results.class, results.days, results.hours, results.minutes, results.result, results.bike, results.category, results.finishlocation, results.notes FROM results, riders, races WHERE riders.id = results.riderid AND races.id = results.raceid AND races.id = '${id}' ORDER BY results.position;`
    );
    res.json({ race, results });
  } catch (error) {
    res.json({ error });
  }
}
