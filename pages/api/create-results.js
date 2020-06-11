import db from "../../database";

export default async function handle(req, res) {
  const raceID = req.query.id;
  let riderID;

  const resultsData = req.body;

  try {
    let erroringLines = [];
    let infoLines = [];

    let i = 2; // to offset zero index plus the fact the csv header isnt counted
    for (const row of resultsData) {
      const rowOriginal = { ...row };
      const { rows: riderResults } =
        (await db.query(
          `SELECT id, riders.name, riders.nationality FROM riders WHERE riders.name = '${row.name.replace(
            /'/g,
            "’"
          )}'`
        )) || [];

      if (riderResults.length) {
        // console.log("rider found", riderResults[0].name, riderResults[0].id);

        const [rider] = riderResults;
        riderID = rider.id;

        console.log(
          row.name,
          rider.nationality,
          row.nationality,
          rider.nationality !== row.nationality
        );

        if (!!row.nationality && rider.nationality !== row.nationality) {
          await db.query(
            `UPDATE riders SET nationality = '${row.nationality}' WHERE id = '${riderID}'`
          );

          infoLines = [
            ...infoLines,
            `Rider ${rider.name} nationality has been updated from ${rider.nationality} to ${row.nationality}`,
          ];
        }
      } else {
        // console.log('rider not found')
        const newRider = await db.query(
          `INSERT INTO riders(name, nationality) VALUES($1, $2) RETURNING id`,
          [row.name.replace(/'/g, "’"), row.nationality]
        );
        riderID = newRider.rows[0].id;
        // console.log("New rider created:", newRider.rows[0].id);
      }

      row.name = riderID;
      row.category = row.category.toUpperCase();

      const { nationality, ...results } = row;
      const rowToArray = [raceID, ...Object.values(results)];
      try {
        await db.query(
          `INSERT INTO results(raceid, riderid, position, cap, class, days, hours, minutes, result, bike, category, finishLocation, notes) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          rowToArray
        );
      } catch (error) {
        // console.log(error);
        erroringLines.push({ line: i, row: Object.values(rowOriginal), error });
      }
      i++;
    }

    return res.json({ status: 200, erroringLines, infoLines });
  } catch (error) {
    console.log(error);
    return res.json({ error });
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
// finishLocation varchar(80),
// category category,
// notes text
