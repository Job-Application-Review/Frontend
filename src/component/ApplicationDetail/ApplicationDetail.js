import React, { useState, useEffect } from "react";
import axios from "axios";
export default function ApplicationDetail(url) {
  const baseURL = "http://127.0.0.1:8000/application-detail/5/";

  const [post, setPost] = useState(null);

  React.useEffect(() => {
    axios
      .get(baseURL, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPost([...response.data["email"]]);
        console.log(response.data);
        console.log(post);
        return post;
      });
  }, []);

  //   if (!post) {
  //     axios.get(baseURL).then((response) => {
  //       setPost(...response.data["email"]);
  //       console.log(response.data);
  //       console.log(post);
  //     });
  //     return null;
  //   }

  return <div>Name: post.name;</div>;
}
