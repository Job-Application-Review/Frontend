import React, { useEffect, useState } from "react";
import TableShow from "../Table/Table";

export default function Api2() {
  const [applicationData, setApplicationData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/application-list/", {
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((results) => results.json())
      .then((data) => {
        setApplicationData(data);
      });
  }, []); // <-- Have to pass in [] here!

  return (
    <div>
      <div>
        <TableShow data={applicationData} />
      </div>
    </div>
  );
}
