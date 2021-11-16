import db from '../../database';

export default async function handle(req, res) {
  switch (req.method.toLowerCase()) {
    case 'delete':
      const { riders } = req.body;

      if (!riders) {
        return res.json('No riders sent in body');
      }

      try {
        const res = await db.query(`DELETE from riders where riders.name in ($1))`, [riders]);

        console.log(res);

        return res.json('OK');
      } catch (error) {
        console.log(error);
        return res.json({ error });
      } finally {
        db.release();
      }

    default:
      return res.json('Method not implimented');
  }
}
