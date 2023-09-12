const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment.id}>
        {comment.status === "approved"
          ? comment.content
          : comment.status === "pending"
          ? "This comment is awaiting moderation"
          : "This comment has been rejected"}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
