// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

function buildLoginForm(overrides = {}) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const mockSubmit = jest.fn();

  render(<Login onSubmit={mockSubmit} />);

  const {username, password} = buildLoginForm()

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(usernameInput, username);
  await userEvent.type(passwordInput, password);
  await userEvent.click(screen.getByRole('button', {name: /submit/i}));

  expect(mockSubmit).toHaveBeenCalledWith({ username, password });
})

/*
eslint
  no-unused-vars: "off",
*/
