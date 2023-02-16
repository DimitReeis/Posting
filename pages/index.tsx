import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import type { Post } from "@prisma/client";
import Admin from "../components/CreatePost";
import { format } from "date-fns";

const AllPostsQuery = gql`
  query {
    posts {
      id
      title
      description
      category
      createdAt
    }
  }
`;

export default function Home() {
  const {
    data: dataPosts,
    loading: loadingPosts,
    error: errorPosts,
  } = useQuery(AllPostsQuery);

  const { user } = useUser();
  if (loadingPosts) return <p>Loading...</p>;
  if (errorPosts) return <p>Oh no... {errorPosts.message}</p>;

  return (
    <div>
      <Head>
        <title>Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && <Admin />}
      <p>dd/MM/yyy hh:mm:ss GMT +1</p>
      <div className="container mx-auto my-20 ">
        <ul className="grid mx-auto max-w-lg">
          {dataPosts.posts.map(
            ({ id, title, description, createdAt }: Post) => (
              <li key={id}>
                <p>{title}</p>
                <p>{description}</p>
                <p>{format(new Date(createdAt * 1), "dd/MM/yyyy kk:mm:ss")}</p>
                <br />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
