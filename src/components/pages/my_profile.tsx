import React, { useState } from 'react'
import LoggedTemplate from '../templates/logged'
import { Box } from '@mui/material'
import MyAccessForm from '../organisms/profile_menus/my_access_form'
import ProfileSidebar from '../organisms/profile_sidebar'

interface MenuItems {
  [key: string]: JSX.Element
}

const MyProfile: React.FC = () => {
  const [menu, setMenu] = useState('accesses')

  const menuToShow: MenuItems = {
    accesses: <MyAccessForm />,
  }

  return (
    <LoggedTemplate>
      <Box
        width="100%"
        padding="36px 56px"
        display={{ xs: 'grid', lg: 'flex' }}
        justifyContent={{ xs: 'center', md: 'initial' }}
        gap={8}
      >
        <ProfileSidebar menu={menu} setMenu={setMenu} />
        {menuToShow[menu]}
      </Box>
    </LoggedTemplate>
  )
}

export default MyProfile
