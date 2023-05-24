const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const productProtoPath = 'product.proto';
const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const productProto = grpc.loadPackageDefinition(productProtoDefinition).ecommerce;

const productService = {
  getProduct: (call, callback) => {
    const product = {
      id: call.request.productId,
      name: 'Example Product',
      description: 'This is an example product.',
      price: 9.99,
      quantity: 10,
    };
    callback(null, { product });
  },
  searchProducts: (call, callback) => {
    const { query } = call.request;
    const products = [
      {
        id: '1',
        name: 'Example Product 1',
        description: 'This is the first example product.',
        price: 9.99,
        quantity: 5,
      },
      {
        id: '2',
        name: 'Example Product 2',
        description: 'This is the second example product.',
        price: 14.99,
        quantity: 3,
      },
    ];
    callback(null, { products });
  },
};

const server = new grpc.Server();
server.addService(productProto.ProductService.service, productService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
  server.start();
});
console.log(`Product microservice is running on port ${port}`);
