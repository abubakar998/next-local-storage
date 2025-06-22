"use client"; // This is a client component 👈🏽
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'

export default function EditPost({ params }) {
    const [formData, setFormData] = useState({})
    const router = useRouter()
    console.log('params', params)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    } 

    useEffect(() => {
        let posts = JSON.parse(localStorage.getItem("posts"));
        if (posts) {
            let foundPost = posts.find(x => x.uniqueCode == params.uniqueCode);
            if (foundPost) {
                setFormData(foundPost);
            } else {
                console.error("Post not found");
            }
        } else {
            console.error("No posts available");
        }
      }, []);

    const editPost = (e) => {
        e.preventDefault()
        let posts = JSON.parse(localStorage.getItem("posts"));

        let foundIndex = posts.findIndex(x => x.id == formData.id);
        posts[foundIndex] = formData;
        
        localStorage.setItem("posts", JSON.stringify(posts));
        router.push("/");
    }

    return (
        <> 
            <div className="text-3xl text-center my-5 h2"> Edit Post </div>
            <div className="text-center my-2 h4"> Unique Code: {formData?.uniqueCode} </div>
            <div className="px-10 py-5 m-2">
                <h2>Title</h2>
                <input className="px-5 py-2 my-2 border-orange-500 input" 
                    placeholder="add title" 
                    type="text" 
                    name = "title" 
                    value={formData?.title? formData.title : ""} 
                    onChange={handleChange}
                />
            </div>
            <div className="px-10 py-5 m-2">  
                <h2>Content</h2>
                <textarea 
                    className="px-5 py-2 my-2 border-orange-500 input" 
                    placeholder="add content" 
                    name = "content" 
                    value={formData?.content? formData.content : ""} 
                    onChange={handleChange}
                />
            </div>

            <button className="px-10 py-5 m-2 button" onClick={(e) => editPost(e)}> Submit </button>
        </>
    )
}