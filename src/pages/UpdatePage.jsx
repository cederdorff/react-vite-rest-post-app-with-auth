import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
  const [post, setPost] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_FIREBASE_DB_URL}/posts/${
    params.postId
  }.json`;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const data = await response.json();
      data.id = params.postId;
      setPost(data);
    }

    getPost();
  }, [params.postId, url]);

  async function savePost(postToUpdate) {
    postToUpdate.uid = post.uid;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(postToUpdate)
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Post updated: ", data);
      navigate("/");
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <section className="page">
      <div className="container">
        <h1>Update Post</h1>
        <PostForm post={post} savePost={savePost} />
      </div>
    </section>
  );
}
