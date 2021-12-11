import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typedefs from "../../graphql/typedefs";
import {Mutations, Queries} from "../../graphql/resolvers"

const apolloServer = new ApolloServer({
  typeDefs: typedefs,
  resolvers: {
    Query: Queries,
    Mutation: Mutations
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
