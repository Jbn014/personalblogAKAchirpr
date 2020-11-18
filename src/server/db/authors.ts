import { Query } from "./index"


const insert = async (name: string, email: string) => Query("INSERT INTO authors (name, email) VALUES (?, ?)", [name, email]);

export default {
    insert
}