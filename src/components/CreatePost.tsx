import React, { useState } from "react";

type Props = {};

const CreatePost = (props: Props) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  return (
    <form className="space-y-4 max-w-md mx-auto border-b-2 border-zinc-300 pb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
      />
      <div className="flex items-center gap-2">
        <button className="bg-zinc-400/60 px-3 py-1 focus:ring-1 ring-opacity-30 ring-zinc-500 ring-offset-2 ring-offset-zinc-200 rounded-lg hover:bg-zinc-400/40">
          Clear
        </button>
        <button
          type="submit"
          className="focus:ring-1 ring-opacity-50 ring-violet-600 ring-offset-2 ring-offset-zinc-200 bg-violet-600 hover:bg-violet-500 px-3 py-1 font-medium text-white rounded-lg"
        >
          Create Post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
