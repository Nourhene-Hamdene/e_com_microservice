const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', 
  port: 3306, 
  user: 'root', 
  password: '', 
  database: 'ecommerce_db', 
});

// Load the proto file for the ecommerce service
const userProtoPath = './user.proto';
const orderProtoPath = './order.proto';
const productProtoPath = './product.proto';

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;

const orderProtoDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const orderProto = grpc.loadPackageDefinition(orderProtoDefinition).order;

const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;

const productResolvers = {
  Query: {
    getProducts: () => {
      const product = new productProto.ProductService('localhost:50051',
grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products', (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
  },
  Mutation: {
    createProduct: (_, { input }) => {
      return new Promise((resolve, reject) => {
        const { name, price } = input;
        connection.query(
          'INSERT INTO products (name, price) VALUES (?, ?)',
          [name, price],
          function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve({ id: result.insertId, name, price });
            }
          }
        );
      });
    },
  },
};

const orderResolvers = {
  Query: {
    getOrders: () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM orders', (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
  },
  Mutation: {
    createOrder: (_, { input }) => {
      return new Promise((resolve, reject) => {
        const { productId, userId, quantity } = input;
        connection.query(
          'INSERT INTO orders (productId, userId, quantity) VALUES (?, ?, ?)',
          [productId, userId, quantity],
          function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve({ id: result.insertId, productId, userId, quantity });
            }
          }
        );
      });
    },
  },
};

const userResolvers = {
  Query: {
    getUsers: () => {
      const user = new userProto.UserService('localhost:50051',
      grpc.credentials.createInsecure());
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    },
  },
  Mutation: {
    createUser: (_, { input }) => {
      return new Promise((resolve, reject) => {
        const { name, email, address, phone } = input;
        connection.query(
          'INSERT INTO users (name, email, address, phone) VALUES (?, ?, ?, ?)',
          [name, email, address, phone],
          function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve({ id: result.insertId, name, email, address, phone });
            }
          }
        );
      });
    },
  },
};

module.exports = {
  productResolvers,
  orderResolvers,
  userResolvers,
};
