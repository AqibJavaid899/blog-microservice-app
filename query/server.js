import axios from "axios";
import express from "express"
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const posts = {}

const handleEvents = (type, data) => {
    console.log("Event Recieved is : ", type)

    if (type === "PostCreated") {
        const { id, title } = data;

        // Add the post to the Post data structure
        posts[id] = { id, title, comments: [] }
    }

    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;

        // Find the post using PostId and then push the new comment in the array
        const post = posts[postId];
        post.comments.push({ id, content, postId, status })
    }

    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;

        // Find the comment using PostId and replace the comment (mainly status and content) with the new comment object
        const post = posts[postId]
        const comment = post.comments.find((comment) => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}

app.get("/posts", (req, res) => {
    // Fetch all of the posts and then send it back to the client
    res.status(200).json(posts)
})

app.post("/events", (req, res) => {
    const { type, data } = req.body;

    // Call the handleEvents helper function and process the recieved event
    handleEvents(type, data)

    res.status(200).json({ status: "OK" })
})

app.listen(4002, async () => {
    console.log("\nQuery listening on Port 4002")

    // Fetch all of the events from the Event API and process them in the handleEvents function
    try {
        const response = await axios.get("http://localhost:4005/events")
        response.data.forEach(({ type, data }) => handleEvents(type, data))
    } catch (error) {
        console.log("Error is : ", error.message)
    }
});