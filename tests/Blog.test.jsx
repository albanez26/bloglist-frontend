import { render, screen } from '@testing-library/react'
import Blog from "../src/components/Blog"
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'
import { expect } from 'vitest'

describe('<Blog/>', () => {
  const blog = {
    title: "Test Blog",
    author: "Edwin Albanez",
    likes: 20,
    url: "www.someblog.com",
  }

  beforeEach(() => {
    render(<Blog blog={blog}/>)
  })

  test("renders content", () => {
    expect(screen.queryByText("Test Blog by Edwin Albanez")).toBeInTheDocument();
    expect(screen.queryByText("www.someblog.com")).toBeNull();
    expect(screen.queryByText("Likes 20")).toBeNull();
  })

  test('showing the blog URL and number of likes', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View')
    await user.click(button)

    screen.getByText('www.someblog.com')
    screen.getByText('Likes 20')
  })
})

describe('<BlogForm/>', () => {
  test('creating a new blog', async () => {
    const blog = {
      title: "Test Blog",
      author: "Edwin Albanez",
      likes: 20,
      url: "www.someblog.com",
    };
    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('write title blog here')
    const authorInput = screen.getByPlaceholderText('write author blog here')
    const urlInput = screen.getByPlaceholderText('write URL blog here')
    const sendButton = screen.getByText('save')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(sendButton)

    expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})