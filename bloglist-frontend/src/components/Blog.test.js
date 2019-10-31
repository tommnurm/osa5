import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
const blog = {
  title: 'testblog',
  author: 'testmaster',
  url: 'test.com',
  user: { username: 'tester' },
  likes: 0
}
const mockFunction = jest.fn()
const mockObject = {}

beforeEach(() => {
  component = render(
    <Blog blog={blog} blogService={mockObject} setBlogs={mockFunction} username={blog.user.username}/>
  )
})

test('only title and author are shown initially', () => {

  expect(component.container).toHaveTextContent(
    'testblog'
  )
  expect(component.container).toHaveTextContent(
    'testmaster'
  )
  expect(component.container).not.toHaveTextContent(
    '0'
  )
  expect(component.container).not.toHaveTextContent(
    'test.com'
  )
  expect(component.container).not.toHaveTextContent(
    'tester'
  )
})

test('clicking button shows title, author, user, likes and adder', async () => {

  const clickable = component.container.querySelector('.clickableText')
  fireEvent.click(clickable)

  expect(component.container).toHaveTextContent(
    'testblog'
  )
  expect(component.container).toHaveTextContent(
    'testmaster'
  )
  expect(component.container).toHaveTextContent(
    '0'
  )
  expect(component.container).toHaveTextContent(
    'test.com'
  )
  expect(component.container).toHaveTextContent(
    'tester'
  )
})
