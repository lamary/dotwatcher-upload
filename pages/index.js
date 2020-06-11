import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import { WithAuth } from "../data/with-auth";
import cookie from "js-cookie";

export const REDIRECT_URL = process.env.GITHUB_REDIRECT_URL || `https://${process.env.VERCEL_URL}`;

console.log(REDIRECT_URL);
//
const Home = ({ justLoggedIn, member, username, avatar_url }) => {
  if (justLoggedIn) {
    const cookieData = {
      username,
      avatar_url,
    };

    cookie.set("membership", JSON.stringify(cookieData), {
      expires: 30,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Dotwatcher uploader thing</h1>
        <p className="description">
          {member ? `hello ${username}` : "To get started, you need to login."}
        </p>

        <div className="row">
          {member ? (
            <a href="/races" className="card">
              <h3>Add a race</h3>
            </a>
          ) : (
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=read%3Aorg%2Cread%3Auser`}
              className="card"
            >
              <h3>Login</h3>
              <p>
                With your Github account, you need to be a member of the Dotwatcher organisation too
              </p>
            </a>
          )}
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          font-size: 1.2rem;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default WithAuth(Home);
