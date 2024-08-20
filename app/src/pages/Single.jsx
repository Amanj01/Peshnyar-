import SideBar from '../components/SideBar'
import SinglePost from '../components/SinglePost'

const Single = () => {
  return (
    <div className='flex h-full pb-20 '>  
      <SinglePost />
      <SideBar />
   </div>
  )
}

export default Single
