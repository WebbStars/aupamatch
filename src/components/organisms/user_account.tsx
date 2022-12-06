import React from 'react'
import { Popover, IconButton, Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { UserAccountsPopover } from '../organisms'

const UserAccounts: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Box display="flex">
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        id="button-open-user-menu"
      >
        <AccountCircle sx={{ fontSize: '32px' }} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <UserAccountsPopover />
      </Popover>
    </Box>
  )
}

export default UserAccounts
