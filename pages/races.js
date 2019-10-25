import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import { WithRaces } from '../data/with-races';

const Races = ({allRaces}) => (
  <React.Fragment>
    <Head>
      <title>Races</title>
      <link rel='icon' href='/favicon.ico' />
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
    </Head>

    <Nav />

    <div className="grid">
      <form className="near-black">
        <fieldset className="pa4 ba">
          <legend className="ttu ph2 tracked f3 fw6">
            Add a new race
          </legend>
          <label className="f4 mb2 db" htmlFor="name">Name</label>
          <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="name" id="name" />
          <label className="f4 mb2 db" htmlFor="year">Year</label>
          <input type="text" className="input ba w-100 border-box f4 pa3 mb4" inputMode="numeric" pattern="[0-9]*" name="year" id="year" />
          <label className="f4 mb2 db" htmlFor="length">Length (km)</label>
          <input type="text" className="input ba w-100 border-box f4 pa3 mb4" inputMode="numeric" pattern="[0-9]*" name="length" id="length" />
          <label className="f4 mb2 db" htmlFor="start-date">Start date</label>
          <input type="date" className="input ba w-100 border-box f4 pa3 mb4" name="start-date" id="start-date" />
          <label className="f4 mb2 db" htmlFor="end-date">End date</label>
          <input type="date" className="input ba w-100 border-box f4 pa3 mb4" name="end-date" id="end-date" />
          <label className="f4 mb2 db" htmlFor="start-location">Start location</label>
          <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="start-location" id="start-location" />
          <label className="f4 mb2 db" htmlFor="end-location">End location</label>
          <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="end-location" id="end-location" />
          <label className="f4 mb2 db" htmlFor="terrain">Terrain</label>
          <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="terrain" id="terrain" />
          <button className="input w-100 ba bg-near-black white f3 ttu tracked fw6 pa3">
            Create
          </button>
        </fieldset>
      </form>
      <div>
        <h1 className="ttu tracked f3 fw6 mt0 mb4">All races</h1>
        {
          allRaces.map((race, index) => {
            return <React.Fragment>
              <h2 className="f4 fw6" key={`heading-${index}`}>{race.name}</h2>
              <table key={`table-${index}`} className="w-100 f5 mb5">
                <thead>
                  <tr className="tl">
                    <th>Slug</th>
                    <th>Year</th>
                    <th>Length (km)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    race.events.map((event, index) => {
                      return <tr key={index}>
                        <td>{event.slug}</td>
                        <td>{event.year}</td>
                        <td>{event.length}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </React.Fragment>
          })
        }
      </div>
    </div>
    <style jsx>{`
      .grid {
        display: grid;
        grid-template-columns: 32rem [sidebar] 1fr [content];
        grid-gap: 4em;
        margin: 2em;
      }

      table {
        border-spacing: 0;
        border-collapse: collapse;
      }

      th {
        border-bottom: 1px solid currentColor;
        padding: .5rem 0;
        font-weight: 600;
      }

      td {
        border-bottom: 1px solid currentColor;
        padding: .5rem 0;
      }

      tr:nth-child(even) td {
        background-color: #f4f4f4;
      }
    `}</style>

  </React.Fragment>
)

export default WithRaces(Races)
