import axios from "axios";
import express from "express"

const app = express()

app.use(express.json())

const events = []

app.get("/events", (req, res) => {
    // Fetch the Events data and send it back to other microservices
    res.status(200).json(events)
})

app.post("/events", async (req, res) => {
    const event = req.body;

    // Storing the event in the In-Memory Event DB
    events.push(event);
    
    console.log("Event Recieved is : ", event.type)

    // Catching the event and then pass the received event to all the microservices 
    await axios.post("http://localhost:4000/events", event).catch((err) => console.log("Error is : ", err))
    await axios.post("http://localhost:4001/events", event).catch((err) => console.log("Error is : ", err))
    await axios.post("http://localhost:4002/events", event).catch((err) => console.log("Error is : ", err))
    await axios.post("http://localhost:4003/events", event).catch((err) => console.log("Error is : ", err))
    
     
    res.status(200).json({ status: "OK" })
})

app.listen(4005, () => console.log("\nEvent Bus listening on Port 4005"));