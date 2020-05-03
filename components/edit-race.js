import { useState } from "react";
import CreateRace from "./create-race";
import Router from "next/router";

export default ({ race }) => {
  const [updateState, setUpdateState] = useState(false);

  const handleSubmit = async (values) => {
    const data = {
      slug: race.slug,
      ...values,
    };

    const result = await fetch("/api/edit-race", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await result.json();

    if (response.status === 200) {
      setUpdateState("Race successfully updated");
    } else {
      setUpdateState(response);
    }
  };

  return (
    <div>
      <CreateRace race={race} editing={true} handleSubmit={handleSubmit} />

      {updateState && (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "40px",
            borderBottom: "1px solid black",
            paddingBottom: "40px",
          }}
        >
          {typeof updateState === "string" ? updateState : JSON.stringify(updateState)}
        </div>
      )}
    </div>
  );
};
