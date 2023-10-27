import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { useState, useEffect } from "react";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const url = `${import.meta.env.VITE_FIREBASE_DB_URL}/users/${post.uid}.json`;

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url);
            const data = await response.json();
            setUser(data);
        }
        getUser();
    }, [url]);

    /**
     * handleClick is called when user clicks on the Article (PostCard)
     */
    function handleClick() {
        navigate(`/posts/${post.id}`);
    }

    async function handleAddToFav() {
        const favs = user.favs || [];
        favs.push(post.id);
        await updateFavs(favs);
    }

    async function handleRemoveFromFav() {
        const favs = user.favs.filter(fav => fav !== post.id);
        updateFavs(favs);
    }

    async function updateFavs(favs) {
        const response = await fetch(url, { method: "PATCH", body: JSON.stringify({ favs }) });
        if (response.ok) {
            setUser({ ...user, favs: favs });
        }
    }

    return (
        <article>
            <div onClick={handleClick}>
                <UserAvatar user={user} />
                <img src={post.image} alt={post.caption} />
                <h2>{post.caption}</h2>
            </div>
            {user.favs?.includes(post.id) ? (
                <button className="light" onClick={handleRemoveFromFav}>
                    Remove from favorites
                </button>
            ) : (
                <button onClick={handleAddToFav}>Add to favorites</button>
            )}
        </article>
    );
}
