const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io");
const ioClient = require("socket.io-client");

const PORT = 8000;
let socket;
let ioServer;

/**
 * Setup Socket & HTTP server
 */
beforeAll((done) => {
    server.listen(PORT);
    ioServer = io.listen(server);
    done();
});

/**
 *  Cleanup Socket & HTTP servers
 */
afterAll((done) => {
    if (server) server.close();
    if (ioServer) ioServer.close();

    done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
    // Setup
    socket = ioClient.connect(`http://localhost:${server.address().port}`);
    socket.on("connect", () => {
        done();
    });
});

/**
 * Run after each test
 */
afterEach((done) => {
    // Cleanup
    if (socket && socket.connected) {
        socket.disconnect();
    }
    done();
});

describe("socket io test", () => {
    test("socket commmunication", (done) => {
        ioServer.emit("echo", "Hello");

        socket.on("connection", (mySocket) => {
            expect(mySocket).toBeDefined();
        });

        socket.on("echo", (msg) => {
            expect(msg).toBe("Hello");
            done();
        });
    });
});
