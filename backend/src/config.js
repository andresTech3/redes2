import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || 1234;
const DATABASE = process.env.DATABASE || "redes2";

console.log(PORT);
console.log(DB_HOST);
console.log(DB_PORT);
console.log(DB_USER);
console.log(DB_PASS);
console.log(DATABASE);

export { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASS, DATABASE };
