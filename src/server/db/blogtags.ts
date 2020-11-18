import { Query } from "./index"


const getBlogTag = async (id) => Query(`SELECT * FROM BLOGTAGS WHERE id = ? `, [id]);

export default {
    getBlogTag
}