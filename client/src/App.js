import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <div className="container">
          <h1>Create a Post</h1>
          <PostCreate />

          <hr />
          <h1>Posts</h1>
          <PostList />
        </div>
    </div>
  );
}

export default App;
