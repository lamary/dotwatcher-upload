import React, { Component } from "react";
import CSVReader from "react-csv-reader";

class CreateResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const result = await fetch(`/api/create-results?id=${this.props.race.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.props.newResults),
    });
    const response = await result.json();

    if (response.status === 200) {
      this.props.setSavedResults(this.state.results);
      this.props.setUploadedResults([]);
      this.props.setErrors(response.erroringLines);
      document.getElementById("form").reset();
      this.setState({ loading: false });
    } else {
      console.log(response);
    }
  };

  handleCSV = (parsedCsvData) => {
    this.setState({ results: parsedCsvData });
    this.props.setUploadedResults(parsedCsvData);
  };

  render() {
    const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace(/\W/g, ""),
    };
    const FileUploadLabel = (
      <label className="f4 mb2 db lh-copy" htmlFor="description">
        Results from csv file{" "}
        <span className="f5 gray">
          (Download the template{" "}
          <a className="link blue" href="/sample.csv">
            here
          </a>
          )
        </span>
      </label>
    );

    const newResults = (
      <div>
        <p className="f4 measure">This race doesn’t have any results, upload a CSV to add some.</p>
      </div>
    );
    const changingResults = (
      <div>
        <p className="f4 measure">
          Looks like there are published results for this race, you can add more with this form.
        </p>
        <p className="f4 measure">But it’s more like that you're here to edit existing results:</p>
        <ul className="f4">
          <li>Download CSV of results</li>
          <li>Edit them and save a new csv file</li>
          <li>Delete the old results using the button below</li>
          <li>Upload new results</li>
          <li>Check it all looks good</li>
          <li>Click “save changes”</li>
        </ul>
      </div>
    );

    return (
      <div className="grid">
        {this.props.results.length === 0 ? newResults : changingResults}
        <form id="form" className="near-black" onSubmit={this.handleSubmit}>
          <fieldset className="pa4 ba">
            <legend className="ttu ph2 tracked f3 fw6">
              Add {this.props.race.name} {this.props.race.year} results
            </legend>
            <CSVReader
              cssClass="f4 mb4"
              label={FileUploadLabel}
              onFileLoaded={this.handleCSV}
              parserOptions={papaparseOptions}
              cssInputClass="black f4 pv3"
              inputId="csv"
            />
            <button className="input-reset w-100 ba bg-near-black hover-bg-blue white f3 ttu tracked fw6 pa3">
              Save changes
            </button>
            <img
              className={`${this.state.loading ? "db" : "dn"} mt3 w1 center`}
              src="/spinner.gif"
            />
          </fieldset>
        </form>

        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 4em;
            margin: 2em;
          }

          textarea:focus {
            background-color: #f6fffe;
            border-color: #96ccff;
          }
        `}</style>
      </div>
    );
  }
}

export default CreateResults;
