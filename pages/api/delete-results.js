import db from '../../database'

export default async function handle(req, res) {
  const { id } = req.query

  try {
    await db.query(`DELETE FROM results WHERE raceid = '${id}';`)
    return res.json({ status: 200 })
  } catch (error) {
    res.json({ error })
  }
}
