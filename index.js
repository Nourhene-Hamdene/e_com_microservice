const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`API Gateway is running on port ${port}`);
    console.log(`GraphQL Playground is available at http://localhost:${port}/graphql`);
  });
}

startApolloServer().catch((err) => {
  console.error('Error starting Apollo Server:', err);
});
