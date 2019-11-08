// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';
import auth from '../utils/auth-check'

export const WithRace = Page => {
  const WithRace = props => <Page {...props} />

  WithRace.getInitialProps = async (ctx) => {

    auth(ctx)

    const allResultsResponse = await fetch(`${process.env.URL}/api/race?id=${ctx.query.id}`);
    const {race, results} = await allResultsResponse.json();

    const csvHeaders = ['Name', 'Position', 'Cap', 'Class', 'Days', 'Hours', 'Minutes', 'Result', 'Bike', 'Category']
    const download = [csvHeaders, ...results.map(result => Object.values(result))]

    return {
      ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
      race: race[0],
      results,
      download
    };
  };

  return WithRace;
};
