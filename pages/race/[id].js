import React, { Component } from "react";
import Head from "next/head";
import { CSVLink } from "react-csv";
import Nav from "../../components/nav";
import CreateResults from "../../components/create-results";
import DeleteButton from "../../components/delete-button";
import Table from "../../components/table";
import EditRace from "../../components/edit-race";
import { WithRace } from "../../data/with-race";

class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newResults: [],
      savedResults: [],
      errors: [],
    };
    this.setUploadedResults = this.setUploadedResults.bind(this);
  }

  setUploadedResults(results) {
    this.setState({ newResults: results });
  }

  setSavedResults(results) {
    this.setState({ savedResults: results });
  }

  setErrors(erroringLines) {
    this.setState({ errors: erroringLines });
  }

  render() {
    const dateNow = new Date();

    return (
      <React.Fragment>
        <Head>
          <title>Races</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
        </Head>

        <Nav />

        <div className="grid">
          <CreateResults
            race={this.props.race}
            results={this.props.results}
            newResults={this.state.newResults}
            setUploadedResults={this.setUploadedResults.bind(this)}
            setSavedResults={this.setSavedResults.bind(this)}
            setErrors={this.setErrors.bind(this)}
          />
          <div>
            {this.state.errors.length > 0 ? (
              <div className="pa4 bg-washed-red mb5">
                <h2 className="red">There were errors with the following lines</h2>
                <p className="f4 lh-copy">These lines have not been added</p>
                {this.state.errors.map((error) => {
                  return (
                    <p className="f4 code lh-copy">
                      <strong>Line {error.line}:</strong> {error.row.join()}
                    </p>
                  );
                })}
              </div>
            ) : null}
            {this.state.newResults.length > 0 ? (
              <div className="pa4 bg-washed-yellow mb5">
                <h1 className="ttu tracked f3 fw6 mt0 mb4">CSV preview</h1>
                <p className="f4">These results will be appended to the existing results</p>
                <Table results={this.state.newResults} />
              </div>
            ) : null}

            <EditRace race={this.props.race} />

            <h1 className="ttu f3 fw6 mt0 mb4">
              <span className="tracked">
                {this.props.race.name} {this.props.race.year}
              </span>
              <span className="fr">
                <DeleteButton deleteType="results" race={this.props.race} />
                <CSVLink
                  className="ml4 ttn f4 link blue fw4 underline"
                  data={this.props.download}
                  filename={`${this.props.race.slug}-download-${dateNow.toISOString()}.csv`}
                >
                  Download CSV of results
                </CSVLink>
              </span>
            </h1>
            <Table
              results={
                this.state.savedResults.length > 0 ? this.state.savedResults : this.props.results
              }
            />
          </div>
        </div>
        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: 1fr [content];
            grid-gap: 4em;
            margin: 2em;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default WithRace(Races);
