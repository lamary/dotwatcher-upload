import React from 'react';
import fetch from 'isomorphic-fetch';
import nextCookies from 'next-cookies'

export const WithAuth = Page => {
  const WithAuth = props => <Page {...props} />

  WithAuth.getInitialProps = async(ctx) => {
    const { code } = ctx.query
    const { membership } = nextCookies(ctx)
    const membershipDetails = membership ? JSON.parse(membership) : false

    if (code) {
      const accessResponse = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const { access_token } = await accessResponse.json()

      const userResponse = await fetch(`https://api.github.com/user`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `token ${access_token}`
        }
      });

      const { login: username, avatar_url } = await userResponse.json()

      const { status } = await fetch(`https://api.github.com/orgs/dotwatcher/members/${username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `token ${access_token}`
        }
      });
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
        username,
        avatar_url,
        status,
        member: status === 204,
        justLoggedIn: true
      };
    }

    if (membershipDetails) {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
        username: membershipDetails.username,
        avatar_url: membershipDetails.avatar_url,
        member: true,
        justLoggedIn: false
      };
    } else {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps() : {}),
        member: false,
        justLoggedIn: false
      };
    }
  };

  return WithAuth;
};
