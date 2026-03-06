import "../style/followers.scss"

const Followers = ({follower}) => {
    console.log(follower);
    

    return (
        <div className="users">
            <div className="content">
                <img src={follower.profileImage} alt="" srcset="" />
                <p>{follower.username}</p>
            </div>
        </div>
    )
}

export default Followers