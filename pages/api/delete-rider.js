import db from '../../database';

export default async function handle(req, res) {
	switch (req.method.toLowerCase()) {
		case 'delete':
			const { riders } = req.body;

			if (!riders) {
				return res.json('No riders sent in body');
			}

			try {
				await db.query(`DELETE FROM riders WHERE name IN ($1)`, [riders]);

				res.send({ status: 200 });

				return;
			} catch (error) {
				console.log(error);

				res.json({ status: 500, error });

				return;
			} finally {
				db.release();
			}

		default:
			return res.json('Method not implimented');
	}
}
