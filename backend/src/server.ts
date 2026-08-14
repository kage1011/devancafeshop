import { createServer } from "http";

import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { initSocket } from "./config/socket";

async function bootstrap() {
  await connectDatabase();
  const server = createServer(app);
  initSocket(server);
  server.listen(env.port, () => {
    console.log(`Server running at http://localhost:${env.port}`);
    console.log(`Socket.IO running on port ${env.port}`);
  });
}

bootstrap();
