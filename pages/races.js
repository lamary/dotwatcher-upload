import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import CreateRace from '../components/create-race'
import DeleteRace from '../components/delete-button'
import { WithRaces } from '../data/with-races';

const Races = ({ allRaces }) => (
  <React.Fragment>
    <Head>
      <title>Races</title>
      <link rel='icon' href='/favicon.ico' />
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
    </Head>

    <Nav />

    <div className="grid">
      <CreateRace/>
      <div>
        <h1 className="ttu tracked f3 fw6 mt0 mb4">All races</h1>
        {
          allRaces.map((race, index) => {
            return <React.Fragment key={`heading-${index}`}>
              <h2 className="f4 fw6">{race.name}</h2>
              <table key={`table-${index}`} className="w-100 f5 mb5">
                <thead>
                  <tr className="tl">
                    <th>Slug</th>
                    <th>Year</th>
                    <th>Length (km)</th>
                    <th colSpan="2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    race.events.map((event, index) => {
                      return <tr key={index}>
                        <td>{event.slug}</td>
                        <td>{event.year}</td>
                        <td>{event.length}</td>
                        <td><a className="link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2" href={`/race/${event.id}`}>Edit results</a></td>
                        <td><DeleteRace deleteType="race" race={event} /></td>
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
