import { builder } from "../builder";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    role: t.expose("role", { type: Role }),
    post: t.relation("Posts"),
  }),
});

const Role = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});

builder.queryField("user", (t) =>
  t.prismaField({
    type: ["User"],

    resolve: async (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({ ...query }),
  })
);
