import db from '../../database';

export default async function handle(req, res) {
	switch (req.method.toLowerCase()) {
		case 'delete':
			let { riders } = req.body;

			if (!riders) {
				return res.json('No riders sent in body');
			}

			riders = riders.map((x) => `'${x}'`);

			riders = riders.join(', ');

			try {
				await db.query(`DELETE FROM riders WHERE name IN (${riders})`);

				res.send({ status: 200 });

				return;
			} catch (error) {
				console.log(error);

				res.json({ status: 500, error });

				return;
			}

		default:
			return res.json('Method not implimented');
	}
}
