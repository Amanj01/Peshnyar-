// @ts-ignore
import Post from "./Post";


const Posts = ({post}) => {
  return (
    <div className="flex-3"> 
      {post.map((p) => (
        <Post post={p} key={p._id} />
      ))}
    </div>
  )
}

export default Posts
