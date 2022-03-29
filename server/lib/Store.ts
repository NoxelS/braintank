import { createPool, MysqlError, Pool, PoolConfig } from 'mysql';


require('dotenv').config();

export const mainPool: Pool = createPool(<PoolConfig>{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

function query(query: string, inputs: any[], callback: (error: MysqlError, result: any[]) => void, pool: Pool) {
    pool.getConnection(function (error, connection) {
        connection.beginTransaction(function (error) {
            if (error) {
                // Transaction Error (Rollback and release connection)
                connection.rollback(function () {
                    connection.release();
                    callback(error, []);
                });
            } else {
                connection.query(query, inputs, function (error, results) {
                    if (error) {
                        // Query Error (Rollback and release connection)
                        connection.rollback(function () {
                            connection.release();
                            callback(error, []);
                        });
                    } else {
                        connection.commit(function (error) {
                            if (error) {
                                connection.rollback(function () {
                                    connection.release();
                                    callback(error, []);
                                });
                            } else {
                                connection.release();
                                callback(error, results);
                            }
                        });
                    }
                });
            }
        });
    });
}

/**
 * @param article Article that will be stored
 * @param pool Connectin pool
 * @description Will only store a flat if the uniqueKey is unique in the database.
 */
export function storeUserJson(pool: Pool, jsonString: string, callback: (error: any, result: any) => void) {
    mainPool.query('INSERT INTO `braintank`.`user_json` (`json`) VALUES (?);', [jsonString], callback);
}

export function getUserJsons(callback: (error: any, result: any) => void) {
    mainPool.query('SELECT * FROM braintank.user_json;', callback);
}
