import React from 'react'
import PostCard from '../postCard'
import DB from '../../appwrite/database'

function AllPost() {
    const [posts, setPosts] = React.useState([])
    React.useEffect(() => {
        DB.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    
  return (
    <>
    <div className='flex h-fit gap-4 flex-wrap justify-center' >
    {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
    
 
    </div>
    </>
  )
}

export default AllPost