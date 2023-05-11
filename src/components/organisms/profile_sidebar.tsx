import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../styles'
import { useMediaQuery } from '@mui/material'

interface Props {
  menu: string
  setMenu: Dispatch<SetStateAction<string>>
  role: string
}

const ProfileSidebar: React.FC<Props> = ({ menu, setMenu, role }) => {
  const navigate = useNavigate()
  const matchesSm = useMediaQuery(theme.breakpoints.down('lg'))

  const menuList = [
    {
      key: 'accesses',
      text: 'Meu acesso',
      link: () => setMenu('accesses'),
    },
    {
      key: 'changePwd',
      text: 'Alterar senha',
      link: () => setMenu('changePwd'),
    },
    {
      key: 'edit_aupair',
      text: 'Informações pessoais',
      link: () => navigate('/edit_aupair'),
    },
    {
      key: 'loginHistory',
      text: 'Histórico de login',
      link: () => setMenu('loginHistory'),
    },
    {
      key: 'buysHistory',
      text: 'Histórico de compras',
      link: () => setMenu('buysHistory'),
    },
  ]

  if (role === 'ROLE_FAMILY') delete menuList[2]

  return (
    <Paper
      sx={{
        width: { xs: '100%', lg: 352 },
        justifySelf: 'center',
        maxWidth: '100%',
        height: { xs: '60px', lg: '340px' },
        display: { xs: 'flex', lg: 'row' },
      }}
    >
      <MenuList
        sx={{
          width: '100%',
          padding: { xs: 0, lg: 'auto' },
          display: { xs: 'flex', lg: 'grid' },
          height: { xs: '60px', lg: 'auto' },
        }}
      >
        {menuList.map((menuItem) => (
          <MenuItem
            onClick={menuItem.link}
            key={menuItem.text}
            sx={{
              height: '60px',
              width: { xs: 'fit-content', lg: 352 },
              backgroundColor:
                menuItem.key === menu ? theme.palette.grey[200] : '#fff',
              borderLeft:
                !matchesSm && menuItem.key === menu
                  ? `2px solid ${theme.palette.primary.dark}`
                  : 'none',
              borderBottom:
                matchesSm && menuItem.key === menu
                  ? `2px solid ${theme.palette.primary.dark}`
                  : 'none',
            }}
          >
            <ListItemText>{menuItem.text}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  )
}

export default ProfileSidebar
