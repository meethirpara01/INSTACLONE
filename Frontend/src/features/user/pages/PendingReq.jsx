import { useUser } from "../hook/useUser";
import "../style/pendingreq.scss"

const PendingReq = ({ follower }) => {

    const { handleAcceptReq, handlerejectReq } = useUser();

    const handleAcceptRequestUser = async (username) => {

        await handleAcceptReq(username);
    }
    
    const handleRejectRequestUser = async (username) => {

        await handlerejectReq(username);
    }

    return (
        <div className="users">
            <div className="content">
                <img src={follower.profileImage} alt="" srcset="" />
                <p>{follower.username}</p>
            </div>
            <div className="btns">
                <button onClick={() => { handleAcceptRequestUser(follower.username) }} className="follow-button">Accept</button>
                <button onClick={() => { handleRejectRequestUser(follower.username) }} className="follow-button">Reject</button>
            </div>
        </div>
    )
}

export default PendingReq