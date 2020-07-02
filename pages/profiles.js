import React, { Fragment } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import { WithAuth } from "../data/with-auth";
import Axios from "axios";
import jsonexport from "jsonexport/dist";

const saveFile = (filename, data) => {
  var blob = new Blob([data], { type: "text/csv" });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    var elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
};

export default WithAuth(() => {
  const handleClickAll = async () => {
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

    try {
      const csv = await jsonexport(users);

      // any kind of extension (.txt,.cpp,.cs,.bat)
      var filename = "hello.csv";

      saveFile(filename, csv);

      console.log(csv);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <button onClick={handleClickAll}>All Users</button>

      <button>Claimed Users</button>
    </div>
  );
});
