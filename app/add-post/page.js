"use client"; // This is a client component 👈🏽
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function AddPost() {
    const [formData, setFormData] = useState({})
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    } 

    const addPost = (e) => {
        e.preventDefault()
        console.log("Baal")
        let posts = JSON.parse(localStorage.getItem("posts"));

        if(posts) {
            posts.forEach((post, index) => {
                posts[index].uniqueCode = `post${index+1}`;
            })
            posts.unshift({...formData, uniqueCode : 'post0'})
        } else {
            posts = [{...formData, uniqueCode : 'post0'}]
        }

        if(posts.length > 10){
            posts.pop()
        }

        localStorage.setItem("posts", JSON.stringify(posts));
        router.push("/");
    }

    return (
        <> 
            <div className="px-10 py-5 m-2">
                <h2>Content</h2>
                <input className="px-5 py-2 my-2 border-orange-500" 
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
                    className="px-5 py-2 my-2 border-orange-500" 
                    placeholder="add content" 
                    name = "content" 
                    value={formData?.content? formData.content : ""} 
                    onChange={handleChange}
                />
            </div>

            <button className="px-10 py-5 m-2" onClick={(e) => addPost(e)}> Submit </button>
        </>
    )
}