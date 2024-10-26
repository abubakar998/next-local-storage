"use client"; // This is a client component 👈🏽

import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    const posts = JSON.parse(localStorage.getItem("posts"))
    console.log(posts)

    const editPost = (e, post) => {
        e.preventDefault()
        router.push("/edit-post", {query : post});
    }

    const deletePost = (e, uniqueCode) => {
        e.preventDefault()
        let posts = JSON.parse(localStorage.getItem("posts"));
        let foundIndex = posts.findIndex(x => x.uniqueCode === uniqueCode)

        for (let i = foundIndex; i < posts.length; i++) {
            posts[i] = {...posts[i+1], uniqueCode: `post${i}`}
        }

        posts.pop()
        localStorage.setItem("posts", JSON.stringify(posts))
        router.refresh()
    }

    return (
        <> 
            <h1> This is Home</h1>
            {
                posts && posts.map(post => 
                    <div className="my-2">
                        <h2> {post?.title} </h2>
                        <h4> {post?.uniqueCode} </h4>
                        <p> {post?.content} </p>
                        <button className="mt-2" onClick={(e) => editPost(e, post)}> Edit Post </button>
                        <button className="mt-2" onClick={(e) => deletePost(e, post.uniqueCode)}> Delete Post </button>
                    </div>
                )
            }
        </>
    )
}