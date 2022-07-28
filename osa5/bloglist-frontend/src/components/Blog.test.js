import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author', () => {
  const blog = {
    title: 'Test title',
    author: 'Testi Testinen',
    url: 'TestingIsFun.net',
    likes: 100
  }

  const { container } = render(
    <Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Test title: Testi Testinen'
  )
})

test('at first does not render url and likes', () => {
  const blog = {
    title: 'Test title',
    author: 'Testi Testinen',
    url: 'TestingIsFun.net',
    likes: 100
  }

  const { container } = render(
    <Blog blog={blog} />)

  const div = container.querySelector('.blogView')
  expect(div).toHaveStyle('display: none')

})

test('renders url and likes once the view button is pressed', async () => {
  const blog = {
    title: 'Test title',
    author: 'Testi Testinen',
    url: 'TestingIsFun.net',
    likes: 100
  }

  const user = userEvent.setup()

  const { container } = render(
    <Blog blog={blog} />)

  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blogView')
  expect(div).toHaveTextContent(
    'TestingIsFun.net'
  )
  expect(div).toHaveTextContent(
    '100'
  )
})

test('clicking like twice calls event handler twice', async () => {
  const blog = {
    title: 'Test title',
    author: 'Testi Testinen',
    url: 'TestingIsFun.net',
    likes: 100,
    user: 123456789
  }

  const mockLikeBlog = jest.fn()

  render(
    <Blog blog={blog} likeBlog={mockLikeBlog} />
  )

  const user = userEvent.setup()

  const button = screen.getByText('like')
  expect(button).toBeDefined()
  await user.click(button)
  await user.click(button)

  expect(mockLikeBlog.mock.calls).toHaveLength(2)
})