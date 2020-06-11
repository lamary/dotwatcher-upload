import React, { Component, Fragment } from "react";
import Router from "next/router";

class CreateRace extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      values: {},
    };
  }

  async componentDidMount() {
    if (!this.props.race || Object.keys(this.props.race).length <= 0) return;

    await this.setState({
      values: this.props.race,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const values = {};
    for (const entry of data.entries()) {
      values[entry[0]] = entry[1];
    }

    if (this.props.handleSubmit) {
      this.props.handleSubmit(values);
      return;
    }

    const result = await fetch("/api/create-race", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await result.json();

    if (response.status === 200) {
      Router.push(`/race/${response.id}`);
    }
  }

  render() {
    const { editing } = this.props;
    return (
      <div style={{ marginBottom: "40px" }}>
        <form id="form" className="near-black" onSubmit={this.handleSubmit}>
          <fieldset className="pa4 ba">
            <legend className="ttu ph2 tracked f3 fw6">
              {editing ? "Edit Race ( start / end date is un-editable) " : "Add a new race"}
            </legend>
            <label className="f4 mb2 db" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="input ba w-100 border-box f4 pa3 mb4"
              name="name"
              id="name"
              required
              defaultValue={this.state.values["name"]}
            />
            {!editing && (
              <Fragment>
                <label className="f4 mb2 db" htmlFor="year">
                  Year
                </label>
                <input
                  type="text"
                  className="input ba w-100 border-box f4 pa3 mb4"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="year"
                  id="year"
                  required
                />
              </Fragment>
            )}
            <label className="f4 mb2 db" htmlFor="length">
              Length (km)
            </label>
            <input
              type="text"
              className="input ba w-100 border-box f4 pa3 mb4"
              inputMode="numeric"
              pattern="[0-9]*"
              name="length"
              id="length"
              required
              defaultValue={this.state.values["length"]}
            />

            {/* Only show when creating a new race */}
            {!editing && (
              <Fragment>
                <label className="f4 mb2 db" htmlFor="start-date">
                  Start date
                </label>
                <input
                  type="date"
                  className="input ba w-100 border-box f4 pa3 mb4"
                  name="start-date"
                  id="start-date"
                  required
                />
                <label className="f4 mb2 db" htmlFor="end-date">
                  End date
                </label>
                <input
                  type="date"
                  className="input ba w-100 border-box f4 pa3 mb4"
                  name="end-date"
                  id="end-date"
                  required
                />
              </Fragment>
            )}

            <label className="f4 mb2 db" htmlFor="start-location">
              Start location
            </label>
            <input
              type="text"
              className="input ba w-100 border-box f4 pa3 mb4"
              name="start-location"
              id="start-location"
              required
              defaultValue={this.state.values["startlocation"]}
            />
            <label className="f4 mb2 db" htmlFor="end-location">
              End location
            </label>
            <input
              type="text"
              className="input ba w-100 border-box f4 pa3 mb4"
              name="end-location"
              id="end-location"
              required
              defaultValue={this.state.values["finishlocation"]}
            />
            <label className="f4 mb2 db" htmlFor="terrain">
              Terrain
            </label>
            <input
              type="text"
              className="input ba w-100 border-box f4 pa3 mb4"
              name="terrain"
              id="terrain"
              required
              defaultValue={this.state.values["terrain"]}
            />
            <label className="f4 mb2 db" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="input ba w-100 border-box f4 pa3 mb4"
              rows="5"
              defaultValue={decodeURIComponent(this.state.values["description"])}
            ></textarea>
            <button className="input w-100 ba bg-near-black hover-bg-blue white f3 ttu tracked fw6 pa3">
              {editing ? "Edit" : "Create"}
            </button>
          </fieldset>
        </form>

        <style jsx>{`
          input:focus,
          textarea:focus {
            background-color: #f6fffe;
            border-color: #96ccff;
          }
        `}</style>
      </div>
    );
  }
}

export default CreateRace;
