import { Server } from "socket.io";
import http from "http";
import express from "express";
import crypto from "crypto";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://secure-chat-b0il0y9le-pratik123-coder.vercel.app"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};


// Function to generate Diffie-Hellman key pair
function generateDHKeyPair() {
	const dh = crypto.createDiffieHellman(2048); // Increase the key size to 2048 bits
	dh.generateKeys();
	return {
			prime: dh.getPrime('hex'),
			generator: dh.getGenerator('hex'),
			publicKey: dh.getPublicKey('hex'),
			privateKey: dh.getPrivateKey('hex')
	};
}
// Function to compute shared secret from own private key and other party's public key
function computeSharedSecret(myPrivateKey, otherPublicKey) {
    const dh = crypto.createDiffieHellman(Buffer.from(myPrivateKey, 'hex'));
    return dh.computeSecret(Buffer.from(otherPublicKey, 'hex')).toString('hex');
}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    // Generate DH key pair for this connection
    const dhKeys = generateDHKeyPair();
    socket.emit("dhKeys", dhKeys);

    socket.on("otherPublicKey", (otherPublicKey) => {
        // Compute shared secret
        const sharedSecret = computeSharedSecret(dhKeys.privateKey, otherPublicKey);
        console.log("Shared secret:", sharedSecret);

    });

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to the events. can be used both on client and server side
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
