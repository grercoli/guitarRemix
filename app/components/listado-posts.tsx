import Post from "./post"

const ListadoPosts = ({ posts }: any) => {
  return (
    <>
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map((post: any) => (
          <Post key={post.id} post={post.attributes} />
        ))}
      </div>
    </>
  )
}

export default ListadoPosts
