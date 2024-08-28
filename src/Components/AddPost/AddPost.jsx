import React, { useCallback, useEffect, useState } from 'react'
import RTE from '../RTE'
import { useForm } from 'react-hook-form'
import Input from '../Input';
import Button from '../Button';
import DB from '../../appwrite/database';
import storage from '../../appwrite/storage';
import { useSelector } from 'react-redux';

function AddPost({post}) {
  const [imgSrc, setImgSrc] = useState("");
  const [display, setDisplay] = useState("hidden");
  const userData = useSelector((state) => state.auth.userData)
  const status = useSelector((state) => state.auth.status);
  console.log(userData)
  console.log(status)
  
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      Title: post?.Title || "",
      slug: post?.slug || "",
      Content: post?.Content || "",
      Status: post?.Status || "Active",
    },
  });

  const submit = async (data) => {
    try {
      console.log("hello world")
      if (post) {
        console.log("hello world 1")
        const file = data.image[0] ? await storage.uploadFile(data.image[0]) : null;
  
        if (file) {
            storage.deleteFile(post.FeatureImage);
        }
  
        const dbPost = await DB.updatePost(post.$id, {
            ...data,
            FeatureImage: file ? file.$id : undefined,
        });
  
        if (dbPost) {
            console.log("post edited")
        }
        
    }else{
      console.log(data)
      console.log("hello world 2")
      console.log(data.image[0]);
      const file  = await storage.uploadFile(data.image[0]);
      console.log('hello underworld')
      console.log(file)
      if (file) {
        console.log("hello world 3")
        
        const fileID = file.$id;
        data.FeatureImage = fileID
        const dbPost = await DB.createPost({...data , UserId : userData.$id});
        if(dbPost){
          console.log("hello world 4")
          console.log("post created successfully")
        }
      }
  
    }
    } catch (error) {
      throw error
    }
    
    
}


  const displayImage = (e) => {
    const file = e.target.files[0];
     if (file) {
        setImgSrc(URL.createObjectURL(file)) // Set the src directly
        setDisplay("block")
      }
  }
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");

    return "";
}, []);

React.useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "Title") {
            setValue("slug", slugTransform(value.Title), { shouldValidate: true });
        }
    });

    return () => subscription.unsubscribe();
}, [watch, slugTransform, setValue]);
  

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className='flex gap-44 px-6 mt-8 mb-4'>
        <div className='w-1/2'>
        <p className='text-white text-center font-bold text-3xl mb-2'>Content</p>
          <RTE name="Content" control={control} defaultValue={getValues("Content")} />
        </div>
        <div className='flex flex-col gap-7'>
          <Input placeholder="Enter Blog's Title" className="w-96 py-2 px-4  focus:bg-neutral-900"{...register("Title" , {required : true})} >Title </Input>
          <Input placeholder="Enter Blog's Slug" className="w-96 py-2  px-4  focus:bg-neutral-900"{...register("slug" , {required : true})} onInput = {(e) => {setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}}>slug</Input>
          <Input type="file" className="text-white p-2 self-center" {...register("image" , {required : true})}>Featured Image</Input>
          {/* <img className={`w-52 h-52 self-center ${display}`} src={imgSrc} /> */}
          {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
          <select className='bg-neutral-700 bg-opacity-15 text-white border-2 border-neutral-800 rounded-md py-1 px-3 appearance-none focus:outline-none'{...register("Status" , {required : true})}>
            <option className='bg-black   border-2 border-b-neutral-800' value="Active">Active</option>
            <option className='bg-black  border-2 border-b-neutral-800' value="InActive">InActive</option>
          </select>
          <Button type = "submit">{post ? "Update" : "Submit"}</Button>
           
        </div>
      </form>
    </>
  )
}
{/* <Input type="file" className="text-white p-2 self-center" onChange={displayImage}{...register("image" , {required : true}).ref}>Featured Image</Input> */}
export default AddPost