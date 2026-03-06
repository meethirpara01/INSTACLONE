import { useUser } from "../hook/useUser";
import "../style/suggestedusers.scss"


const SuggestedUsers = ({ user }) => {

    const { handlefollowUser } = useUser();

    const handlefollowUserEvent = async (username) => {

        await handlefollowUser(username);
    }

    return (
        <div className="user">
            <div className="content">
                <img src={user.profileImage} alt="" srcset="" />
                <p>{user.username}</p>
            </div>
            <button onClick={() => { handlefollowUserEvent(user.username) }} className="follow-button">Follow</button>
        </div>
    )
}

export default SuggestedUsers