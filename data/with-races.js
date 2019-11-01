// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';
import auth from '../utils/auth-check'

export const WithRaces = Page => {
  const WithRaces = props => <Page {...props} />

  WithRaces.getInitialProps = async (ctx) => {

    auth(ctx)

    const allResultsResponse = await fetch(`${process.env.URL}/api/all-races`);
    const allRaces = await allResultsResponse.json();
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
      allRaces
    };
  };

  return WithRaces;
};
