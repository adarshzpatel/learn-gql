import { gql, useQuery } from "@apollo/client";
import { Post } from "@prisma/client";
import React from "react";

type Props = {};

const GetFeedQuery = gql`
  query Query {
    feed {
      id
      title
      content
    }
  }
`;

const RecentPosts = (props: Props) => {
  const { data, loading, error } = useQuery(GetFeedQuery, {
    fetchPolicy: "cache-and-network",
    refetchWritePolicy: "merge"
  });
  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{error.message.toString()}</div>;
  }
  return (
    <div className="divide-y divide-zinc-300">
      {data?.feed?.map((post: Post) => (
        <div className="p-4 hover:bg-zinc-300/50" key={post?.id}>
          <p className="text-xl font-bold">{post?.title}</p>
          <p>{post.content?.slice(0, 50) + "...."}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
