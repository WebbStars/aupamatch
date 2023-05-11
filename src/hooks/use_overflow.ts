import { useEffect, useState } from 'react'

const useOverflow = (
  elementRef: React.MutableRefObject<HTMLSpanElement | null>,
  isFetching: boolean
): boolean => {
  const [overflowActive, setOverflowActive] = useState(false)

  useEffect(() => {
    const checkOverflow = () => {
      if (elementRef.current) {
        return (
          elementRef.current.offsetHeight < elementRef.current.scrollHeight ||
          elementRef.current.offsetWidth < elementRef.current.scrollWidth
        )
      }
      return false
    }

    const handleResize = () => {
      setOverflowActive(checkOverflow())
    }

    !isFetching && handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [elementRef, isFetching])

  return overflowActive
}

export default useOverflow
