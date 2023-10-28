import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

export default function PostCard({ post, fav }) {
    const navigate = useNavigate();
    const auth = getAuth();
    const favUrl = `${import.meta.env.VITE_FIREBASE_DB_URL}/users/${auth?.currentUser?.uid}/favorites/${post.id}.json`;
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(fav ? true : false);
    }, [fav]);
    /**
     * handleClick is called when user clicks on the Article (PostCard)
     */
    function handleClick() {
        navigate(`/posts/${post.id}`);
    }

    async function handleAddToFav() {
        const response = await fetch(favUrl, {
            method: "PUT",
            body: JSON.stringify(post.id)
        });
        if (response.ok) {
            // update local state
            setIsFav(true);
        }
    }

    async function handleRemoveFromFav() {
        const response = await fetch(favUrl, {
            method: "DELETE"
        });
        if (response.ok) {
            setIsFav(false);
        }
    }

    return (
        <article>
            <div onClick={handleClick}>
                <UserAvatar uid={post.uid} />
                <img src={post.image} alt={post.caption} />
                <h2>{post.caption}</h2>
            </div>
            {isFav ? (
                <button className="light" onClick={handleRemoveFromFav}>
                    Remove from favorites
                </button>
            ) : (
                <button onClick={handleAddToFav}>Add to favorites</button>
            )}
        </article>
    );
}
