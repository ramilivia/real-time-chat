import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { prisma } from "./lib/prisma";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    console.log('New Client Connected');

    const messages = await prisma.message.findMany({
      include: {
          author: true
      },
      orderBy: {
          createdAt: 'asc'
      }
    });

    io.emit('initial-messages', messages);

    socket.on('publish-message', (message) => {
      
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});