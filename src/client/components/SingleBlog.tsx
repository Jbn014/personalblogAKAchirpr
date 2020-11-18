  
import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { blog } from "../types";


const SingleBlog: React.FC<ISingleBlogProps> = (props: ISingleBlogProps) => {
    const [blog, setBlog] = React.useState<blog>({
        id: "",
        name: "",
        content: "",
        title: ""

    });

    React.useEffect(() => {
        (async () => {
            try {
                let res = await fetch(`/api/blogs/${props.match.params.id}`);
                let blog = await res.json();
                setBlog(blog);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const deleteBlog = async (id: string) => {
        await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });

        props.history.push("/");
    };

    const editBlog = async (id: string) => {
        await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog.content)
        });

        props.history.push("/");
    };

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBlog({
        id: blog.id,
        name: blog.name,
        content: e.target.value,
        title: blog.title
    });

    return (
        <div className="container">
            <div className="card shadow-lg m-2">
                <div className="card-body">
                    <div className="row">
                        <h5 className="card-title">@{blog.name}</h5>
                    </div>
                    <div className="row">
                        <textarea className="card-text" defaultValue={blog.content} cols={50} rows={15} onChange={(e) => onMessageChange(e)}></textarea>
                    </div>
                    <button className="btn btn-sm btn-outline-dark float-right mx-1" onClick={() => editBlog(blog.id)}>Save</button>
                    <button className="btn btn-sm btn-outline-dark float-right mx-1" onClick={() => deleteBlog(blog.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

interface ISingleBlogProps extends RouteComponentProps<{ id: string }> { }

export default SingleBlog;
