import styled from 'styled-components'
import { theme } from '../../styles'
import { ButtonBaseProps } from '@mui/material'
import React from 'react'

interface Props extends ButtonBaseProps {
  secondary?: boolean
  width?: string
  height?: string
  margin?: string
  children: React.ReactNode
}

const Button = styled.button<Props>`
  border-radius: 4px;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width || '124px'};
  height: ${({ height }) => height || '40px'};
  color: ${({ color }) => color};
  border: ${({ secondary }) =>
    (secondary && `1px solid ${theme.palette.primary.main}`) || 'none'};
  color: ${({ secondary }) =>
    secondary ? theme.palette.primary.main : theme.palette.common.white};
  background-color: ${({ secondary }) =>
    secondary ? theme.palette.common.white : theme.palette.primary.main};
  transition: all linear 0.3s;
  &:hover {
    background-color: ${({ secondary }) =>
      secondary ? theme.palette.grey[200] : theme.palette.primary.light};
    border: ${({ secondary }) =>
      secondary ? theme.palette.grey[400] : theme.palette.primary.light};
    color: ${({ secondary }) => secondary && theme.palette.common.black};
    transition: all linear 0.3s;
    font-weight: bold;
  }
`

const CustomButton: React.FC<Props> = ({
  secondary,
  width,
  height,
  margin,
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      width={width}
      height={height}
      secondary={secondary}
      margin={margin}
    >
      {children}
    </Button>
  )
}

export default CustomButton
