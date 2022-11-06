import mysql from "mysql2";

export const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.dbName,
  port: parseInt(process.env.dbPort),
});

const promisePool = pool.promise();

type MakeQueryType<Response> = {
  sql: string;
  params: string | string[];
  onSuccess?: (rows: any, fields: any) => Response[] | void | Promise<void>;
  onFail?: (error: any) => any;
};

export const makeDbQuery = async ({
  sql,
  params,
  onSuccess,
  onFail,
}: MakeQueryType<Response>) =>
  await promisePool
    .query({ sql, values: params })
    .then(([rows, fields]) => {
      onSuccess(rows, fields);
    })
    .catch((error) => onFail(error));

export default promisePool;
