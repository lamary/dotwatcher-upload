import React from 'react'

const Table = ({results}) => (
  <React.Fragment>
    <table className="w-100 f5 mb5">
      <thead>
        <tr className="tl">
          <th>Name</th>
          <th>Position</th>
          <th>Cap</th>
          <th>Class</th>
          <th>Days</th>
          <th>Hours</th>
          <th>Minutes</th>
          <th>Result</th>
          <th>Bike</th>
          <th>Category</th>
          <th>Finish location</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {
          results.map((result, index) => {
            return <tr key={index}>
              <td>{result.name}</td>
              <td>{result.position}</td>
              <td>{result.cap}</td>
              <td>{result.class}</td>
              <td>{result.days}</td>
              <td>{result.hours}</td>
              <td>{result.minutes}</td>
              <td>{result.result}</td>
              <td>{result.bike}</td>
              <td>{result.category}</td>
              <td>{result.finishlocation}</td>
              <td>{result.notes}</td>
            </tr>
          })
        }
      </tbody>
    </table>
    <style jsx>{`
      .grid {
        display: grid;
        grid-template-columns: 1fr [content];
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

export default Table
