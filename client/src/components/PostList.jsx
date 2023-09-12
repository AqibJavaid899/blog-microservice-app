import axios from "axios"
import { useEffect, useState } from "react"

import CommentList from "./CommentList"
import CommentCreate from "./CommentCreate"

const PostList = () => {
    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:4002/posts")
            setPosts(response.data)
        } catch (error) {
            console.log("Error is : ", error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div key={post.id} className="card" style={{ width: "30%", marginBottom: "20px" }} >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>
  )
}

export default PostList