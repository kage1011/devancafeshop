import { createServer } from "http";

import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

async function bootstrap() {
  await connectDatabase();

  const server = createServer(app);

  server.listen(env.port, () => {
    console.log(
      `Server running at http://localhost:${env.port}`
    );
  });
}

bootstrap();