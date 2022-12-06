import React from 'react'
import { Skeleton, SkeletonProps } from '@mui/material'

interface Props extends SkeletonProps {
  children: React.ReactElement
  isLoading: boolean
  height?: string | number
}

const SkeletonHOC: React.FC<Props> = ({
  children,
  isLoading,
  height,
  ...props
}) => {
  return isLoading ? (
    <Skeleton width="100%" height={height || 80} {...props} />
  ) : (
    children
  )
}

export default SkeletonHOC
