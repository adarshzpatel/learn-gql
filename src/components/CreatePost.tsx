import React, { FormEventHandler, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { client } from "../pages/_app";

type Props = {};

const CreatePostMutation = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      createdAt
      title
      content
      published
    }
  }
`;

const CreatePost = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [createPost, { data, loading, error }] =
    useMutation(CreatePostMutation);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (title && content) {
      console.log({ title, content });
      await createPost({
        variables: {
          title,
          content,
        },
      });
      await client.refetchQueries({include:"all"})
    }
    clearFields();
  };

  const clearFields = () => {
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4  border-b-2 border-zinc-300 pb-4"
    >
      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={clearFields}
          className="bg-zinc-400/60 px-3 py-1 focus:ring-1 ring-opacity-30 ring-zinc-500 ring-offset-2 ring-offset-zinc-200 rounded-lg hover:bg-zinc-400/40"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={loading}
          className="focus:ring-1 ring-opacity-50 ring-violet-600 ring-offset-2 ring-offset-zinc-200 bg-violet-600 hover:bg-violet-500 px-3 py-1 font-medium text-white rounded-lg"
        >
          {loading ? "Loading ..." : "Create Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
