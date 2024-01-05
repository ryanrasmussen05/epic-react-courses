// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function TestComponent() {
  const {count, increment, decrement} = useCounter();
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestComponent />);
  const incrementButton = screen.getByText(/increment/i);
  const decrementButton = screen.getByText(/decrement/i);
  const message = screen.getByText(/current count/i);
  expect(message).toHaveTextContent(/current count: 0/i);
  await userEvent.click(incrementButton);
  expect(message).toHaveTextContent(/current count: 1/i);
  await userEvent.click(decrementButton);
  expect(message).toHaveTextContent(/current count: 0/i);
})

/* eslint no-unused-vars:0 */
