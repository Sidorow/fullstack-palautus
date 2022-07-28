import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')
  const saveButton = screen.getByText('save')

  await user.type(title, 'Test title')
  await user.type(author, 'Test author')
  await user.type(url, 'Test url')
  await user.click(saveButton)

  expect(createBlog.mock.calls[0][0].title).toBe('Test title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test url')
})