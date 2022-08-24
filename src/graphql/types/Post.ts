import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, nonNull, nullable, objectType, stringArg } from "nexus";

export const GQLDate = asNexusMethod(DateTimeResolver, "date");

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.int("id");
    t.date("createdAt");
    t.string("title");
    t.nullable.string("content");
    t.boolean("published");
  },
});

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("post", {
      type: "Post",
      args: {
        postId: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        return await ctx.prisma.post.findUnique({
          where: { id: Number(args.postId) },
        });
      },
    });

    t.list.field("feed", {
      type: "Post",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post.findMany({
          where: { published: true },
        });
      },
    });

    t.list.field("drafts", {
      type: "Post",
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.post.findMany({
          where: { published: false },
        });
      },
    });

    t.list.field("filterPosts", {
      type: "Post",
      args: {
        searchString: nullable(stringArg()),
      },
      async resolve(_, { searchString }, ctx) {
        return await ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        });
      },
    });
  },
});

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.nullable.field("deletePost", {
      type: "Post",
      args: {
        postId: stringArg(),
      },
      async resolve(_, { postId }, ctx) {
        return await ctx.prisma.post.delete({
          where: { id: Number(postId) },
        });
      },
    });

    t.field("createPost", {
      type: "Post",
      args: {
        title: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      async resolve(_, { title, content }, ctx) {
        return await ctx.prisma.post.create({
          data: {
            title,
            content,
            published: true,
          },
        });
      },
    });
  },
});
