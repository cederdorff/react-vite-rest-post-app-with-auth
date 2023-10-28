import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function PostCard({ post }) {
    const auth = getAuth();
    const navigate = useNavigate();
    const [favs, setFavs] = useState({});
    const url = `${import.meta.env.VITE_FIREBASE_DB_URL}/users/${auth?.currentUser?.uid}/favorites.json`;
    const favUrl = `${import.meta.env.VITE_FIREBASE_DB_URL}/users/${auth?.currentUser?.uid}/favorites/${post.id}.json`;

    useEffect(() => {
        async function getFavorites() {
            const response = await fetch(url);
            const data = await response.json();
            if (data) {
                console.log(data);
                setFavs(data);
            }
        }
        getFavorites();
    }, [url]);

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
            setFavs({ ...favs, [post.id]: post.id });
        }
    }

    async function handleRemoveFromFav() {
        const response = await fetch(favUrl, {
            method: "DELETE"
        });
        if (response.ok) {
            // update local state
            const current = { ...favs };
            delete current[post.id];
            setFavs(current);
        }
    }

    return (
        <article>
            <div onClick={handleClick}>
                <UserAvatar uid={post.uid} />
                <img src={post.image} alt={post.caption} />
                <h2>{post.caption}</h2>
            </div>
            {favs[post.id] ? (
                <button className="light" onClick={handleRemoveFromFav}>
                    Remove from favorites
                </button>
            ) : (
                <button onClick={handleAddToFav}>Add to favorites</button>
            )}
        </article>
    );
}
