import { useContext } from "react"
import { UserContext } from "../user.context";
import { acceptReq,  followersList,  followingList, followUser, pendingReq, rejectReq, suggesteduserList, unfollowUser } from "../services/user.api";

export const useUser = () => {
    const context = useContext(UserContext);

    const { loading, setLoading, followers, setFollowers, following, setFollowing, pendingrequest, setPendingrequest, suggestedUsers, setSuggestedUsers } = context;

    const handelFollowersList = async () => {

        setLoading(true);

        const response = await followersList();
        console.log(response);
        
        setFollowers(response.followers);
        console.log(response.followers);
        

        setLoading(false);
    }
    
    const handelFollowingList = async () => {

        setLoading(true);

        const response = await followingList();
        console.log(response);
        
        setFollowing(response.following);
        console.log(response);
        

        setLoading(false);
    }
    
    const handelPendingReq = async () => {

        setLoading(true);

        const response = await pendingReq();
        console.log(response);
        
        setPendingrequest(response.pendingRequests);
        console.log(response);
        

        setLoading(false);
    }

    const handlesuggestedUsers = async () => {

        const response = await suggesteduserList();
        setSuggestedUsers(response.suggestions)
        console.log(response);
    }

    const handlefollowUser = async (username) => {

        const response = await followUser(username);
        console.log(response);
        handelFollowingList();
        handelFollowersList();
        handelPendingReq();
        handlesuggestedUsers();
    }
    
    const handleunfollowUser = async (username) => {

        const response = await unfollowUser(username);
        console.log(response);
        handelFollowingList();
        handelFollowersList();
        handelPendingReq();
        handlesuggestedUsers();
    }

    const handleAcceptReq = async (username) => {

        const response = await acceptReq(username);
        console.log(response);
        handelFollowingList();
        handelFollowersList();
        handelPendingReq();
        handlesuggestedUsers();
    }
    
    const handlerejectReq = async (username) => {

        const response = await rejectReq(username);
        console.log(response);
        handelFollowingList();
        handelFollowersList();
        handelPendingReq();
        handlesuggestedUsers();
    }
    
    

    return {
        loading, followers, handelFollowersList, following, handelFollowingList, pendingrequest, handelPendingReq, suggestedUsers, handlefollowUser, handlesuggestedUsers, handleunfollowUser, handleAcceptReq, handlerejectReq, handlesuggestedUsers
    }
}