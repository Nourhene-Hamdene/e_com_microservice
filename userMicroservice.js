const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const userProtoPath = 'user.proto';
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userProtoDefinition);

const userService = {
    getUser: (call, callback) => {
        const user = {
            id: call.request.userId,
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: '123 Street, City, Country',
        };
        callback(null, { user });
    },
    createUser: (call, callback) => {
        const { name, email, address } = call.request;
        const user = {
            id: '1',
            name,
            email,
            address,
        };
        callback(null, { user });
    },
};

const server = new grpc.Server();
server.addService(userProto.ecommerce.UserService.service, userService);
const port = 50053;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error('Failed to bind server:', err);
        return;
    }
    console.log(`Server is running on port ${port}`);
    server.start();
});
console.log(`User microservice is running on port ${port}`);
