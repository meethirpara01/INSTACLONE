import { useNavigate } from "react-router"
import "../nav.scss"
import Feed from "../../post/pages/Feed";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className='nav-bar'>
      <div className="top">
        <button onClick={() => { navigate("/create-post") }} className='button primary-button'>New Post</button>
      </div>
      <Feed />
    </div>
  )
}

export default Nav