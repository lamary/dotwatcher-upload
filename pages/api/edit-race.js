import db from "../../database";

function formatDate(dateString) {
  const dateTime = new Date(dateString);
  return dateTime.toISOString();
}

export default async function handle(req, res) {
  const formData = req.body;

  const { slug } = formData;

  const values = {
    name: formData.name,
    startLocation: formData["start-location"],
    endLocation: formData["end-location"],
    length: formData.length,
    terrain: formData.terrain,
    description: formData.description,
  };

  const query = `UPDATE races set name = '${values.name}', startlocation = '${values.startLocation}', finishlocation = '${values.endLocation}', length = ${values.length}, terrain = '${values.terrain}', description = '${values.description}' where races.slug = '${slug}'`;

  try {
    const result = await db.query(query);
    return res.json({ status: 200, race: result.rows[0] });
  } catch (error) {
    return res.json({ status: 500, title: "something was bad with your inputs", error });
  }
}

// CREATE TABLE races(
//   name varchar(80),
//   slug varchar(80),
//   year int,
//   description text,
//   startDate date,
//   endDate date,
//   startLocation varchar(80),
//   finishLocation varchar(80),
//   length varchar(80),
//   terrain: varchar(80)
// );
