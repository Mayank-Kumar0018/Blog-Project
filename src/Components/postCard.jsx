import React from 'react'
// import appwriteService from "../appwrite/config"
import storage from '../appwrite/storage'
import {Link} from 'react-router-dom'

function PostCard({$id = "44", Title = "hello", FeatureImage}) {
    const [imgUrl, setImgUrl] = React.useState(null);

    React.useEffect(() => {
        const fetchImagePreview = async () => {
          try {
            const result = await storage.getFilePreview(FeatureImage);
            setImgUrl(result.previewUrl);
          } catch (error) {
            console.error('Error fetching image preview:', error);
          }
        };
    
        fetchImagePreview();
      }, [FeatureImage]);
    // const imgurl = storage.getFilePreview(FeatureImage)
    // console.log(imgurl)
    // console.log(FeatureImage)
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-64 h-72 shadow-lg border-2 border-neutral-900 bg-neutral-900 bg-opacity-70 px-4 py-6 text-center text-white rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* {storage.getFilePreview(FeatureImage).then((res) => console.log(res))} */}
                <img src= {imgUrl} alt={Title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{Title}</h2>
        </div>
    </Link>
  )
}


export default PostCard