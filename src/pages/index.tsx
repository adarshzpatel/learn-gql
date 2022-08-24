import type { NextPage } from "next";
import { useState } from "react";
import CreatePost from "../components/CreatePost";
import RecentPosts from "../components/RecentPosts";

type Props = {
  launches: any;
};

const Home: NextPage<Props> = ({ launches }) => {
  return (
    <div className="max-w-md mx-auto p-4">
      <CreatePost />
      <h6 className="text-xl my-4">Recent Posts</h6>
      <RecentPosts/>
    </div>
  );
};

export default Home;
