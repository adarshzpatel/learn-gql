import type { NextPage } from "next";
import { useState } from "react";
import CreatePost from "../components/CreatePost";

type Props = {
  launches: any;
};

const Home: NextPage<Props> = ({ launches }) => {
  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default Home;
