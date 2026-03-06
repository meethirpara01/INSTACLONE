import { RouterProvider } from "react-router"
import { router } from "./routes/app.routes"
import "./features/shared/global.scss"
import { AuthProvider } from "./features/auth/auth.context"
import { PostContextProvider } from "./features/post/post.context"
import { UserContextProvider } from "./features/user/user.context"


const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App