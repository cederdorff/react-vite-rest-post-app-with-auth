import placerholder from "../assets/img/user-placeholder.jpg";

export default function UserAvatar({ user }) {
    return (
        <div className="avatar">
            <img src={user.image || placerholder} alt={user.id} />
            <span>
                <h3>{user.name}</h3>
                <p>{user.title}</p>
            </span>
        </div>
    );
}
