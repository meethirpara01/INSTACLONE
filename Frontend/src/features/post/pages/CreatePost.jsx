import { useState, useRef } from "react"
import "../style/createpost.scss"
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router";
import { Navigate } from 'react-router'
import { useAuth } from "../../auth/hooks/useAuth";

const CreatePost = () => {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const { loading, handleCreatePost, } = usePost();

    const [caption, setCaption] = useState("");
    const postImageInputFeildRef = useRef(null);
    const navigate = useNavigate();

    async function handelSubmit(e) {
        e.preventDefault();

        const file = postImageInputFeildRef.current.files[0];

        await handleCreatePost(file, caption);
        navigate("/home");
    }

    if (loading) {
        return (<main>
            <h1>Creating Post...</h1>
        </main>)
    }

    return (
        <main className='create-post-page'>
            <div className="form-container">
                <h1>Create Post</h1>
                <form onSubmit={handelSubmit}>
                    <label className='post-image-lable' htmlFor="postImage">Browse File</label>
                    <input ref={postImageInputFeildRef} hidden type="file" name='postImage' id='postImage' />
                    <input onChange={(e) => { setCaption(e.target.value) }} value={caption} type="text" name='caption' id='caption' placeholder='Caption' />
                    <button className='button primary-button' type='submit'>Share Post</button>
                </form>
            </div>
        </main>
    )
}

export default CreatePost