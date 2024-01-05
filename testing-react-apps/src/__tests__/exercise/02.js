// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import { render, fireEvent } from '@testing-library/react';
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter/>);

  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  // 💰 note that you can remove `act` completely!
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0')
})
