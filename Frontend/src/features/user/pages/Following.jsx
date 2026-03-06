import { useUser } from "../hook/useUser";
import "../style/following.scss"

const Following = ({followee}) => {

    const { handleunfollowUser } = useUser();

    const handleunfollowUserEvent = async (username) => {

        await handleunfollowUser(username);
    }

    return (
        <div className="users">
            <div className="content">
                <img src={followee.profileImage} alt="" srcset="" />
                <p>{followee.username}</p>
            </div>
            <button onClick={() => { handleunfollowUserEvent(followee.username) }} className="follow-button">Unfollow</button>
        </div>
    )
}

export default Following