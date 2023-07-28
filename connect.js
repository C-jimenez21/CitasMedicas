import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();
export const con = mysql2.createPool(JSON.parse(process.env.MY_CONNECTION));