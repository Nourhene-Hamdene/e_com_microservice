// apigateway.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { express: voyagerMiddleware } = require('graphql-voyager/middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mysql = require('mysql2');

const productProtoPath = './product.proto';
const orderProtoPath = './order.proto';
const userProtoPath = './user.proto';
const { productResolvers, orderResolvers, userResolvers } = require('./resolvers');
const { typeDefs } = require('./schema');

const app = express();

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce_db',
});

// Établir la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL:', err);
    return;
  }
  console.log('Connexion à la base de données MySQL réussie!');

  // Exécution d'une requête SQL pour ajouter un utilisateur
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: 'sousse',
    phone: 855555,
  };

  connection.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête:', err);
      return;
    }
    console.log('Utilisateur ajouté avec succès!');
    console.log('ID de l\'utilisateur ajouté:', result.insertId);
  });

  // Fermer la connexion à la base de données lorsque vous avez fini
  connection.end();
});

app.use(cors());
app.use(bodyParser.json());

const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProtoDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(productProtoDefinition);
const userProto = grpc.loadPackageDefinition(userProtoDefinition);
const orderProto = grpc.loadPackageDefinition(orderProtoDefinition);

const productClient = new productProto.ecommerce.ProductService('localhost:50051', grpc.credentials.createInsecure());
const orderClient = new orderProto.ecommerce.OrderService('localhost:50052', grpc.credentials.createInsecure());
const userClient = new userProto.ecommerce.UserService('localhost:50053', grpc.credentials.createInsecure());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [productResolvers, orderResolvers, userResolvers],
});

const server = new ApolloServer({
  schema,
  context: { productClient, orderClient, userClient },
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

module.exports = app;
