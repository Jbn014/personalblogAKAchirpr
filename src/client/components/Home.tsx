import React from 'react'
import { Link } from "react-router-dom";
import { blog } from "../types"

const Home: React.FC<IHomeProps> = () => {
    const [blogs, setBlogs] = React.useState<blog[]>([]);

    React.useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            let res = await fetch("/api/blogs/")
            let blogs: blog[] = await res.json();
            blogs.reverse();
            setBlogs(blogs);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            {blogs.map((blog: blog) => (
                <div key={blog.id} className="card shadow-lg m-2">
                    <div className="card-body">
                        <h5 className="card-title">@{blog.name}</h5>
                        <p className="card-text">{blog.content}</p>
                        <Link to={`/blog/${blog.id}/`}>
                            <button className="btn btn-sm btn-outline-dark float-right">View More</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

interface IHomeProps { }

export default Home