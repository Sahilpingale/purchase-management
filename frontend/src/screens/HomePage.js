import React, { useEffect } from 'react'

const HomePage = ({ history }) => {
  useEffect(() => {
    history.push('/vendorMaster')
  }, [history])
  return <div>HomePage</div>
}

export default HomePage
