import { builder } from "../builder";

builder.prismaObject("Post", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    category: t.exposeString("category"),
    user: t.relation("User"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
  }),
});

builder.queryField("posts", (t) =>
  t.prismaField({
    type: ["Post"],

    resolve: (_query, _parent, _args, _ctx, _info) =>
      prisma.post.findMany({ orderBy: [{ createdAt: "desc" }] }),
  })
);

builder.mutationField("createPost", (t) =>
  t.prismaField({
    type: "Post",
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      category: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { title, description, category } = args;

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }

      return prisma.post.create({
        ...query,
        data: {
          title,
          description,
          category,
        },
      });
    },
  })
);
