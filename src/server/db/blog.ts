import { Query } from './index'

export const all  = async () => Query("SELECT * FROM BLOGS JOIN authors on authors.id = blogs.authorid")

export const single  = async (id) =>  Query(`SELECT * FROM BLOGS WHERE id = ? `, [id]) 

export const newBlog  =  (authorid: number, content: string, title: string) => Query("INSERT INTO blogs (authorid, content, title) VALUES (?, ?, ?);", [authorid, content, title])

export const update = (content: string, id: number) => Query("UPDATE blogs SET content = ? WHERE blogs.id = ?;", [content, id])

export const destroy = (id: number) => Query("DELETE FROM blogs WHERE blogs.id = ?", [id])
    

export default {
    all,
    single,
    newBlog,
    update,
    destroy
}