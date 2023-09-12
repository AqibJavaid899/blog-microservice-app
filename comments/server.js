import express from "express"
import cors from "cors"
import {randomBytes} from 'crypto'
import axios from 'axios'

const app = express()

const commentsByPostId = {};

app.use(cors())
app.use(express.json())

app.get("/posts/:id/comments", (req, res) => {
    // Fetch all the comments and send it back to client
    const comments = commentsByPostId[req.params.id] || []
    res.status(200).json(comments)
})

app.post("/posts/:id/comments", async (req, res) => {
    const id = randomBytes(4).toString("hex")
    const { content } = req.body;

    // Add the new comment in the In-Memory DB
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id, content, postId: req.params.id, status: "pending" })
    commentsByPostId[req.params.id] = comments
    
    // Create event payload and generate the CommentCreated event
    const event = { type: "CommentCreated", data: { id, content, postId: req.params.id, status: "pending" } }
    await axios.post("http://localhost:4005/events", event).catch((err) => console.log("Error is : ", err))

    res.status(201).json(comments)
})

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    console.log("Event Recieved is : ", type)

    if (type === "CommentModerated") {
        const { id, content, postId, status } = data;

        // Find the comment with PostId and update the status of the comment
        const comments = commentsByPostId[postId]
        const comment = comments.find((comment) => comment.id === id)
        comment.status = status

        // Create event payload and generate the CommentUpdated event
        const event = { type: "CommentUpdated", data: { id, content, postId, status } }
        await axios.post("http://localhost:4005/events", event)
    }
 
    res.status(200).json({ status: "OK" })
})


app.listen(4001, () => console.log("\nComments listening on Port 4001"));