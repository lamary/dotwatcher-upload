import React, { useState } from "react";
import Head from "next/head";
import Nav from "../../components/nav";
import auth from "../../utils/auth-check";
import Axios from "axios";
import jsonexport from "jsonexport/dist";
import saveCSV from "../../utils/save-csv";
import styled from "styled-components";
import { DateRangePicker } from "react-date-range";
import { isWithinInterval } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const DateSelectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Page = styled.div`
  position: relative;
`;

const Loading = styled.div`
  width: 100%;
  text-align: center;
  background: blue;
  margin: 30px 0;
  color: white;
  padding: 30px 0;
`;

const claimedRiders = async () => {
  const { data } = await Axios({
    method: "get",
    url: "/api/claimed-riders",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return data.results;
};

const allUsers = async () => {
  let users = [];
  let page = 0;

  const getUsers = async (currentPage = 0) => {
    const { data } = await Axios({
      method: "get",
      url: `http://localhost:3000/api/auth0/users?page=${currentPage}&per_page=100`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { total, start } = data;

    if (data.users && data.users.length) {
      users = [...users, ...data.users];
    }

    if (start < total) {
      page++;

      await getUsers(page);
    }
  };

  await getUsers(page);

  return users;
};

const getClaimedRiders = async () => {
  const users = await allUsers();
  const profiles = await claimedRiders();

  const profilesIDs = profiles.map((profile) => profile.auth_id);

  const filterdUsers = users.filter((user) => profilesIDs.includes(user.user_id));

  return filterdUsers;
};

const filterByDateRange = ({ data, startDate, endDate }) => {
  return data.filter((d) => {
    const date = new Date(d.created_at);

    return isWithinInterval(date, { start: startDate, end: endDate });
  });
};

const Profiles = () => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [loading, setLoading] = useState(false);

  const handleClickAll = async () => {
    setLoading(true);
    try {
      const data = await allUsers();
      console.log(data);
      const csv = await jsonexport(data);

      var filename = "all-users.csv";

      saveCSV({ filename, csv });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimedUsers = async () => {
    setLoading(true);
    try {
      const data = await claimedRiders();
      const csv = await jsonexport(data);

      var filename = "calimed-riders.csv";

      saveCSV({ filename, csv });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisteredAndClaimed = async () => {
    setLoading(true);
    try {
      let data = await getClaimedRiders();

      data = filterByDateRange({ data, ...date });

      const csv = await jsonexport(data);

      var filename = "registed-and-claimed.csv";

      saveCSV({ filename, csv });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisteredAndUnclaimed = async () => {
    setLoading(false);
    try {
      const auth0 = await allUsers();
      const claimedUsers = await getClaimedRiders();

      const claimedUserIds = claimedUsers.map((user) => user.user_id);

      const unclaimedUsers = auth0.filter((user) => !claimedUserIds.includes(user.user_id));

      const data = filterByDateRange({ data: unclaimedUsers, ...date });

      const csv = await jsonexport(data);

      var filename = "registed-and-unclaimed.csv";

      saveCSV({ filename, csv });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = ({ selection }) => {
    setDate((prev) => ({ ...prev, ...selection }));
  };

  return (
    <div>
      <Head>
        <title>Profiles</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
      </Head>

      <Nav />

      <Page>
        {loading && (
          <Loading>
            <h4>Generating ....</h4>
          </Loading>
        )}
        <h1 className="ttu tracked f3 fw6 mt0 mb4">Profiles</h1>

        <p>
          To get an all time list of registered but unclaimed users set the starte date to
          01/01/2020 and the end date to today's date.
        </p>

        <p>"All Users" and "Claimed Users" do not rely on the date picker.</p>

        <p>
          The Auth0 API is rate limited so concurrent tasks may fail. If this happens, wait a minute
          and try again.
        </p>
      </Page>

      <hr />

      <DateSelectorGrid>
        <div>
          <p>Please select date, by default start and end date is today.</p>

          <DateRangePicker onChange={handleDateChange} ranges={[date]} />
        </div>

        <div>
          <div>
            <h2>Registered and claimed</h2>
            <button
              onClick={handleRegisteredAndClaimed}
              className="link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2"
            >
              Download
            </button>
          </div>

          <div>
            <h2>Registered and un claimed</h2>
            <button
              onClick={handleRegisteredAndUnclaimed}
              className="link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2"
            >
              Download
            </button>
          </div>
        </div>
      </DateSelectorGrid>

      <hr />

      <Wrapper>
        <div>
          <h2>All Users</h2>
          <button
            onClick={handleClickAll}
            className="link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2"
          >
            Download
          </button>
        </div>

        <div>
          <h2>Claimed Users</h2>

          <button
            onClick={handleClaimedUsers}
            className="link ba bw1 b--blue bg-blue hover-bg-dark-blue white ttn f4 fw4 pv1 ph2"
          >
            Download
          </button>
        </div>
      </Wrapper>
    </div>
  );
};

Profiles.getInitialProps = async (ctx) => {
  auth(ctx);

  return {};
};

export default Profiles;
