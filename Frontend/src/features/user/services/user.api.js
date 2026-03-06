import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/users",
    withCredentials: true
});

export async function followersList() {

    const response = await api.get("/followersList", );

    return response.data;
}

export async function followingList() {

    const response = await api.get("/followingList", );

    return response.data;
}

export async function pendingReq() {

    const response = await api.get("/PendingReq", );

    return response.data;
}

export async function followUser(username) {

    const response = await api.post("/follow/" + username);

    return response.data;
}

export async function unfollowUser(username) {

    const response = await api.post("/unfollow/" + username);

    return response.data;
}

export async function acceptReq(username) {

    const response = await api.post("/accept/" + username);

    return response.data;
}

export async function rejectReq(username) {

    const response = await api.post("/reject/" + username);

    return response.data;
}

export async function suggesteduserList() {

    const response = await api.get("/suggestedusers");

    return response.data;
}

