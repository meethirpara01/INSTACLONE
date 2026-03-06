import React from 'react'
import Nav from '../components/Nav'
import Leftpart from '../components/Leftpart'
import Rightpart from '../components/Rightpart'
import "../home.scss"

const Home = () => {

  return (
    <main className='home-page'>
      <Leftpart />
      <Nav />
      <Rightpart />
    </main>
  )
}

export default Home