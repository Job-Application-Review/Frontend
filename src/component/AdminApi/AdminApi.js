import React, { useEffect, useState } from "react";
import TableShow from "../AdminTable/Table";

export default function Api2() {
  const [applicationData, setApplicationData] = React.useState([]);

  const [auth, setAuth] = useState({
    displayed_form: "",
    logged_in: localStorage.getItem("token") ? true : false,
    username: "",
  });

  useEffect(() => {
    if (auth.logged_in) {
      fetch("http://127.0.0.1:8000/application-list-admin/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((results) => results.json())
        .then((data) => {
          setApplicationData(data);
          console.log(data);
        });
    }
  }, []); // <-- Have to pass in [] here!

  return (
    <div>
      <div>
        {/* {applicationData["name"] ? <TableShow data={applicationData} /> : " "} */}
        <TableShow data={applicationData} />
      </div>
    </div>
  );
}
