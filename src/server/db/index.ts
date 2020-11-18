import config from "../config/dbconfig"
import * as mysql from "mysql"
import Blogs from "./blog"
import Authors from "./authors"

export const Connection = mysql.createConnection(config.mysql)

Connection.connect(err =>{
    if(err) console.log(err);
});

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


export default {
    Blogs,
    Authors
}