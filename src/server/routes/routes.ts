import * as express from 'express';
import DB from "../db"
import { OkPacket } from "mysql"
const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/blogs', async (req, res) => {
    try {
    let blogs = await DB.Blogs.all()
    res.json(blogs)
    } catch(e) {
        res.sendStatus(500)
    }
})
router.get('/api/blogs/:id', async (req, res) => {
    try {
    const id: number = Number(req.params.id);    
    let blog = await DB.Blogs.single(id)
    res.json(blog)
    } catch(e) {
        res.sendStatus(500)
    }
});
router.post("/api/blogs", async (req: express.Request, res: express.Response) => {
    try {
        const Blog = req.body
        const newBlogpost = await DB.Blogs.newBlog(Blog.authorid, Blog.content, Blog.title, );
        res.status(200).send(`
        user created with id: ${Blog.authorid}
        `);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.put("/api/blogs/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id: number = Number(req.params.id);
        const newBlogContent = req.body;
        

        await DB.Blogs.update(newBlogContent.content, id);
    
        res.status(200).send(`Updated blog ${id}`)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
router.delete("/api/blogs/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id: number = Number(req.params.id);

        await DB.Blogs.destroy(id);

        res.send(`blog entry ${id} was deleted`);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
export default router;