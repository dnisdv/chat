"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const cors = require("cors");
dotenv_1.default.config();
require("./core/db");
const routes_1 = __importDefault(require("./core/routes"));
const socket_1 = __importDefault(require("./core/socket"));
const app = express_1.default();
app.use(cors({
    origin: "*"
}));
// app.use(function(_, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
const http = http_1.createServer(app);
const io = socket_1.default(http);
routes_1.default(app, io);
const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;
http.listen(PORT, function () {
    console.log(`Server: http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map