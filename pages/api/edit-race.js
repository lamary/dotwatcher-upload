import db from '../../database';

export default async function handle(req, res) {
	const formData = req.body;

	const { slug } = formData;

	const values = {
		name: formData.name,
		startLocation: formData['start-location'],
		endLocation: formData['end-location'],
		length: formData.length,
		terrain: formData.terrain,
		description: encodeURIComponent(formData.description),
	};

	const query = `UPDATE races set name = $1, startlocation = $2, finishlocation = $3, length = $4, terrain = $5, description = $6 where races.slug = $7`;

	try {
		const result = await db.query(query, [
			values.name,
			values.startLocation,
			values.endLocation,
			values.length,
			values.terrain,
			values.description,
			slug,
		]);

		return res.json({ status: 200, race: result.rows[0] });
	} catch (error) {
		console.log(error);
		return res.json({ status: 500, title: 'something was bad with your inputs', error });
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
