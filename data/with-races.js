// HOC for fetching results from data.dotwatcher.cc (datasette)

import React from 'react';
import fetch from 'isomorphic-fetch';
import auth from '../utils/auth-check'
import apiUrl from '../utils/api-url'

export const WithRaces = Page => {
  const WithRaces = props => <Page {...props} />

  WithRaces.getInitialProps = async ctx => {

    auth(ctx)

    const allResultsResponse = await fetch(apiUrl('/api/all-races', ctx.req));
    const allRaces = await allResultsResponse.json();
    return {
      ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
      allRaces
    };
  };

  return WithRaces;
};
