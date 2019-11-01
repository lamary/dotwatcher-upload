// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';

export const WithRaces = Page => {
  const WithRaces = props => <Page {...props} />

  WithRaces.getInitialProps = async () => {

    const allResultsResponse = await fetch(`http://localhost:3000/api/all-races`);
    const allRaces = await allResultsResponse.json();
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
      allRaces
    };
  };

  return WithRaces;
};
