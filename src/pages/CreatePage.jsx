import { getAuth } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function CreatePage() {
    const auth = getAuth();
    const navigate = useNavigate();

    async function createPost(newPost) {
        newPost.uid = auth.currentUser.uid; // authenticated user id

        const url = "https://react-rest-and-auth-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        if (response.ok) {
            const data = await response.json();
            console.log("New post created: ", data);
            navigate("/");
        } else {
            console.log("Sorry, something went wrong");
        }
    }

    return (
        <section className="page">
            <h1>Create New Post</h1>
            <PostForm savePost={createPost} />
        </section>
    );
}
