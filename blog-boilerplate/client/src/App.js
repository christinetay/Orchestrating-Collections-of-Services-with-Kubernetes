import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {

  // const postURL = process.env.POST_BACKEND_PORT;
  // console.log("@@test postURL:", postURL);
  return (
    <>
      <div className="container">
        <h1>Create post</h1>
        <PostCreate />
        <hr />
        <h3>Posts</h3>
        <PostList />
      </div>
    </>
  );
};

export default App;
