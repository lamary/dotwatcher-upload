import React, { Component } from 'react';
import Router from 'next/router'

class CreateRace extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = {}
    for (const entry of data.entries()) {
      values[entry[0]] = entry[1]
    }
    
    const result = await fetch('/api/create-race', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    const response = await result.json()
    
    if (response.status === 200) {
      Router.push('/races')
      document.getElementById('form').reset();
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="form" className="near-black" onSubmit={this.handleSubmit}>
          <fieldset className="pa4 ba">
            <legend className="ttu ph2 tracked f3 fw6">
              Add a new race
            </legend>
            <label className="f4 mb2 db" htmlFor="name">Name</label>
            <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="name" id="name" required />
            <label className="f4 mb2 db" htmlFor="year">Year</label>
            <input type="text" className="input ba w-100 border-box f4 pa3 mb4" inputMode="numeric" pattern="[0-9]*" name="year" id="year" required />
            <label className="f4 mb2 db" htmlFor="length">Length (km)</label>
            <input type="text" className="input ba w-100 border-box f4 pa3 mb4" inputMode="numeric" pattern="[0-9]*" name="length" id="length" required />
            <label className="f4 mb2 db" htmlFor="start-date">Start date</label>
            <input type="date" className="input ba w-100 border-box f4 pa3 mb4" name="start-date" id="start-date" required />
            <label className="f4 mb2 db" htmlFor="end-date">End date</label>
            <input type="date" className="input ba w-100 border-box f4 pa3 mb4" name="end-date" id="end-date" required />
            <label className="f4 mb2 db" htmlFor="start-location">Start location</label>
            <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="start-location" id="start-location" required />
            <label className="f4 mb2 db" htmlFor="end-location">End location</label>
            <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="end-location" id="end-location" required />
            <label className="f4 mb2 db" htmlFor="terrain">Terrain</label>
            <input type="text" className="input ba w-100 border-box f4 pa3 mb4" name="terrain" id="terrain" required />
            <label className="f4 mb2 db" htmlFor="description">Description</label>
            <textarea name="description" id="description" className="input ba w-100 border-box f4 pa3 mb4" rows="5"></textarea>
            <button className="input w-100 ba bg-near-black hover-bg-blue white f3 ttu tracked fw6 pa3">
              Create
            </button>
          </fieldset>
        </form>

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

        input:focus {
          background-color: #f6fffe;
          border-color: #96CCFF;
        }
      `}</style>
      </React.Fragment>
    )
  }
}

export default CreateRace
