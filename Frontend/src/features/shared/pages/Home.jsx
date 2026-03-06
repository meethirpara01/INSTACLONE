import React from 'react'
import Nav from '../components/Nav'
import Leftpart from '../components/Leftpart'
import Rightpart from '../components/Rightpart'
import "../home.scss"
import { Navigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Home = () => {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <main className='home-page'>
      <Leftpart />
      <Nav />
      <Rightpart />
    </main>
  )
}

export default Home