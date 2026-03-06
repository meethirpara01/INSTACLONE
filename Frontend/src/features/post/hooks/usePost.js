import { useContext } from "react";
import { createPost, getFeed, getPost, likePost, unLikePost } from "../services/post.api";
import { PostContext } from "../post.context";
import { useEffect } from "react";

export const usePost = () => {

    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {

        setLoading(true);

        const data = await getFeed();

        setFeed(data.posts);
        setLoading(false);
    }

    const handleCreatePost = async (imageFile, caption) => {

        setLoading(true);

        const data = await createPost(imageFile, caption);

        // console.log(data.post);
        setFeed([data.post, ...feed]);
        // console.log(feed);

        handleGetPost();

        setLoading(false);
    }

    const handleGetPost = async () => {

        const response = await getPost();

        setPost(response.posts);
    }

    const handleLike = async (post) => {

        const data = await likePost(post);
        await handleGetFeed();
    }

    const handleUnLike = async (post) => {

        const data = await unLikePost(post);
        await handleGetFeed();
    }

    useEffect(() => {
        handleGetFeed();
    }, []);

    return {
        loading, post, feed, handleGetFeed, handleCreatePost, handleLike, handleUnLike, handleGetPost
    }
}