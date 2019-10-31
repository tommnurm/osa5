import React from 'react'
import {
  render, waitForElement,
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).not.toHaveTextContent(
      'test blog 1'
    )
    expect(component.container).not.toHaveTextContent(
      'test blog 2'
    )
    expect(component.container).not.toHaveTextContent(
      'test blog 3'
    )
  })

  /* test('if user is logged, notes are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    const component = await render(
      <App />
    )

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('test blog')
    )
    expect(component.container).toHaveTextContent(
      'test blog 1'
    )
    expect(component.container).toHaveTextContent(
      'test blog 2'
    )
    expect(component.container).toHaveTextContent(
      'test blog 3'
    )
  }) */
})