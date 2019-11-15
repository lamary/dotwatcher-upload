import db from '../../database'

export default async function handle(req, res) {
  const raceID = req.query.id
  let riderID

  const resultsData = JSON.parse(req.body)

  try {
    resultsData.forEach(row => {
      const { rows: riderResults } = await db.query(`SELECT id, riders.name FROM riders WHERE riders.name = '${row.name}'`) || []


      if (riderResults.length) {
        // console.log('rider found', riderResults[0].name, riderResults[0].id)
        riderID = riderResults[0].id
      } else {
        // console.log('rider not found')
        const newRider = await db.query(`INSERT INTO riders(name) VALUES($1) RETURNING id`, [row.name])
        riderID = newRider.rows[0].id
        // console.log('New rider created:', newRider)
      }

      row.name = riderID
      const rowToArray = [raceID, ...Object.values(row)]
      await db.query(`INSERT INTO results(raceid, riderid, position, cap, class, days, hours, minutes, result, bike, category) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, rowToArray)
    })

    return res.json({ status: 200 })
  } catch (error) {
    return res.json({ error })
  }
}
// raceid UUID,
// riderID UUID,
// position int,
// cap varchar(80),
// class classification,
// days int,
// hours int,
// minutes int,
// result resultType,
// bike bike,
// dataSource varchar(80),
// category category,
// notes text
