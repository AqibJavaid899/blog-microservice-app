import axios from "axios";
import { useState } from "react";


const PostCreate = () => {
    const [title, setTitle] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = { title }

        try {
            const response = await axios.post("http://posts.com/posts/create", payload)

        } catch (error) {
            console.log("Error is : ", error)
        }
        setTitle("")
    }

    return (
        <div className="form-layout">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label style={{ fontWeight: "bold", fontSize: "20px" }}>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <button disabled={!title} className={`${title ? "btn btn-primary" : "btn btn-secondary"}`}>Submit</button>
          </form>
        </div>
      );
}

export default PostCreate