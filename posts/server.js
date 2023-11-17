import express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const app = express();

const posts = {};

app.use(cors());
app.use(express.json());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  // Add the post in the In-Memory DB
  posts[id] = { id, title, comments: [] };

  // Create the event payload and generate the PostCreated event
  const event = { type: "PostCreated", data: { id, title } };
  await axios
    .post("http://localhost:4005/events", event)
    .catch((err) => console.log("Error is : ", err));

  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  console.log("Event Recieved is : ", type);

  res.status(200).json({ status: "OK" });
});

app.listen(4000, () => {
  console.log("There is a new update here... Version 20!!");
  console.log("\nPosts listening on Port 4000");
});
