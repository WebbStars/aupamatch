import React from 'react'
import About from '../organisms/home_about'
import NotLoggedTemplate from '../templates/not_logged'

const Home: React.FC = () => {
  return (
    <NotLoggedTemplate>
      <About />
    </NotLoggedTemplate>
  )
}

export default Home
