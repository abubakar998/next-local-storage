"use client"; // This is a client component 👈🏽
import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function EditPost({ params }) {
    const [formData, setFormData] = useState({})
    const router = useRouter()
    // console.log('r', router)
    // const { query } = router;
    // console.log('q', query)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    console.log('params', params)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    } 

    useEffect(() => {
        const url = `${pathname}?${searchParams}`
        console.log(url)
        console.log(searchParams.get("query")
        )
        // searchParams.get("query")

        // setFormData(location.state.post)
      }, [pathname, searchParams]);

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
            <div className="px-10 py-5 m-2">
                <h2>Title</h2>
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

            <button className="px-10 py-5 m-2 button" onClick={(e) => editPost(e)}> Submit </button>
        </>
    )
}