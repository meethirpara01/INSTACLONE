import { useEffect } from "react"
import { useUser } from "../../user/hook/useUser"
import Followers from "../../user/pages/Followers"
import Following from "../../user/pages/Following"
import PendingReq from "../../user/pages/PendingReq"
import "../rightpart.scss"

const Rightpart = () => {

    const { loading, followers, handelFollowersList, following, handelFollowingList, pendingrequest, handelPendingReq } = useUser();


    useEffect(() => {
        handelFollowersList();
        handelFollowingList();
        handelPendingReq();
    }, []);


    return (
        <div className='right-part'>
            <div className="Following">
                <h2>Following</h2>
                <div className="FollowingUsers">
                    {following.map((followee) => {
                        return <Following followee={followee.followee} />
                    })}
                </div>
            </div>

            <div className="Followers">
                <h2>Followers</h2>
                <div className="FollowersUsers">
                    {followers.map((follower) => {
                        return <Followers follower={follower.follower} />
                    })}
                </div>
            </div>

            <div className="Padding-Request">
                <h2>Padding Request</h2>
                <div className="Padding-RequestUsers">
                    {pendingrequest.map((req) => {
                        return <PendingReq follower={req.follower} />
                    })}
                </div>
            </div>

        </div>
    )
}

export default Rightpart