const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const orderProtoPath = 'order.proto';
const orderProtoDefinition = protoLoader.loadSync(orderProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const orderProto = grpc.loadPackageDefinition(orderProtoDefinition).ecommerce;

const orderService = {
  createOrder: (call, callback) => {
    const { userId, products } = call.request;
    const totalAmount = products.reduce((total, product) => {
      return total + product.price;
    }, 0);
    const order = {
      id: '1',
      userId,
      products,
      totalAmount,
    };
    callback(null, { order });
  },
  getOrder: (call, callback) => {
    const order = {
      id: call.request.orderId,
      userId: '1',
      products: [
        {
          id: '1',
          name: 'Example Product 1',
          description: 'This is the first example product.',
          price: 9.99,
          quantity: 2,
        },
      ],
      totalAmount: 19.98,
    };
    callback(null, { order });
  },
};

const server = new grpc.Server();
server.addService(orderProto.OrderService.service, orderService);
const port = 50052;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
  server.start();
});
console.log(`Order microservice is running on port ${port}`);
