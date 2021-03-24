import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '../../locales/index';

import LoginForm from '../LoginForm';

jest.mock('next-translate/setLanguage', () => jest.fn());

jest.mock('../../lib/useAuth', () => ({
  useAuth: jest.fn(() => ({ signIn: jest.fn(), user: '', error: '' })),
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    locale: 'en',
    locales: ['en', 'ru', 'uk'],
  }),
}));

describe('LoginForm', () => {
  test('should show error messages in english', () => {
    render(
      <IntlProvider locale="en" messages={messages.en}>
        <LoginForm />
      </IntlProvider>,
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Enter'));
    expect(screen.getByText('Invalid email field!')).toBeInTheDocument();
    expect(screen.getByText('Invalid password field!')).toBeInTheDocument();
  });

  test('should show error messages in ukrainian', () => {
    render(
      <IntlProvider locale="uk" messages={messages.uk}>
        <LoginForm />
      </IntlProvider>,
    );

    fireEvent.click(screen.getByText('Ввести'));
    expect(screen.getByText('Невалідне поле пароля!')).toBeInTheDocument();
    expect(screen.getByText('Невалідне поле електронної пошти!')).toBeInTheDocument();
  });
});
