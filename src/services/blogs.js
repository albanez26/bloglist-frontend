import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const { data: updatedBlog } = await axios.put(
    `${baseUrl}/${id}`,blog,config
  )

  return updatedBlog
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, setToken, create, update, deleteBlog }