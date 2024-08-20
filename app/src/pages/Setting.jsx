import SideBar from '../components/SideBar'
import UserSetting from '../components/UserSetting'
import React from 'react'

const Setting = () => {
  return (
    <div id='setting' className='flex'>
      <UserSetting />
      <SideBar />
    </div>
  )
}

export default Setting
