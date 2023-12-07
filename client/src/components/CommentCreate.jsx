import axios from "axios";
import { useState } from "react";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { content: comment }
    try {
      const response = await axios.post(`http://posts.com/posts/${postId}/comments`, payload);
    } catch (error) {
      console.log("Error is : ", error);
    }
    setComment("");
  };

  return (
    <div className="form-layout">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label style={{ fontWeight: "bold", fontSize: "18px" }}>New Comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button disabled={!comment} className={`${comment ? "btn btn-primary" : "btn btn-secondary"}`}>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
