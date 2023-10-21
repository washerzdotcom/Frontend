import React, { useEffect } from 'react'
import useRefreshToken from '../hooks/useRefreshToken';

const Plant = () => {
  const refresh = useRefreshToken();
  useEffect(()=>
  {
    
    // const newAccessToken = await refresh();
  }, [])
  return (
    <>
    Plant
    </>
  )
}

export default Plant