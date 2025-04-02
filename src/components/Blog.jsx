import { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog, onLike = ()=>{} }) => {  
  const [blogToShow, setBlogToShow] = useState(blog)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const blogStyle = {
    padding: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 5
  }

  const like = async () => {
    const updatedBlog = await blogService.update(
      blog.id, { ...blogToShow, likes: blogToShow.likes + 1 }
    )
    onLike(updatedBlog)
    setBlogToShow(updatedBlog)
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the blog: ${blogToShow.title}?`);
    if (confirmDelete) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogToShow(null);
      } catch (error) {
        console.error('Failed to delete the blog:', error);
      }
    }
  }

  const blogInfo = () => (
    <div className='blog-info'>
      <p>{ blogToShow.url }</p>
      <p>
        Likes { blogToShow.likes }{' '}
        <button onClick={ like }>like</button>
      </p>
      <p>by { blogToShow.author }</p>
      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  )

  if(blogToShow){
    return (
      <div style={blogStyle} className="blog">
        { blogToShow.title } by { blogToShow.author }{' '}
        <button onClick={() => setVisibleInfo(!visibleInfo)}>
          { visibleInfo ? "Hide" : "View" }
        </button>
        { visibleInfo && blogInfo() }
      </div>
    );
  }
}

export default Blog