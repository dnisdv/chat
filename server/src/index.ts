import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
const cors = require("cors");

dotenv.config();

import './core/db';
import createRoutes from './core/routes';
import createSocket from './core/socket';

const app = express();
app.use(cors({
  origin:"*"
}))

const http = createServer(app);
const io = createSocket(http);

createRoutes(app, io);

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3003;

http.listen(PORT, function () {
  console.log(`Server: http://localhost:${PORT}`);
});