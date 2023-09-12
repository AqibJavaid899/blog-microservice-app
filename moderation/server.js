import axios from "axios";
import express from "express"

const app = express()

app.use(express.json())

app.post("/events", async (req, res) => {
    const { type, data } = req.body;

    console.log("Event Recieved is : ", type)

    if (type === "CommentCreated") {

        // Define the Filter words list and search the comment for the filter words to moderate the comment  
        let filterWords = ["orange"]
        const status = data.content.toLowerCase().includes(filterWords) ? "rejected" : "approved"

        // Update the comment status according to the moderation result
        data.status = status;

        // Create the event payload and generate the CommentModerated event
        const event = { type: "CommentModerated", data }
        await axios.post("http://localhost:4005/events", event)
    }

    res.status(200).json({ status: "OK" })
})

app.listen(4003, () => console.log("\nModeration listening on Port 4003"));