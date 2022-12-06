import { Box, Tab, Tabs } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { makeStyles } from '@material-ui/styles'
import { theme } from '../../styles'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  tabs: {
    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: 'white !important',
      fontWeight: 'bold',
      borderRadius: '5px'
    },
    borderRadius: '5px',
    backgroundColor: 'white',
    margin: '0 !important',
    padding: '8px',

    [theme.breakpoints.down('sm')]: {
      width: '300px'
    }
  },
  tab: {
    padding: '16px 48px !important'
  }
})

interface Props {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

const JobsHeader: React.FC<Props> = ({ value, setValue }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        variant="fullWidth"
        TabIndicatorProps={{
          style: { display: 'none' }
        }}
      >
        <Tab
          label={t('molecules.jobs_header.best')}
          value={0}
          className={classes.tab}
        />
        <Tab
          label={t('molecules.jobs_header.families')}
          value={1}
          className={classes.tab}
        />
        <Tab
          label={t('molecules.jobs_header.agencies')}
          value={2}
          className={classes.tab}
        />
      </Tabs>
    </Box>
  )
}

export default JobsHeader
