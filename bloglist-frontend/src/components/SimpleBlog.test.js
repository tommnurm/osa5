import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('blog title, author and likes render correctly', () => {
  const blog = {
    title: 'testblog',
    author: 'testmaster',
    url: 'test.com',
    user: 'tester',
    likes: 0
  }

  const mockHandler = jest.fn()
  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'testblog'
  )
  expect(component.container).toHaveTextContent(
    'testmaster'
  )
  expect(component.container).toHaveTextContent(
    '0'
  )
})

test('clicking button twice calls event handler twice', async () => {
  const blog = {
    title: 'testblog',
    author: 'testmaster',
    url: 'test.com',
    user: 'tester',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})