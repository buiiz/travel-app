import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { messages } from '../../locales/index';

import SignUpForm from '../SignUpForm';

jest.mock('next-translate/setLanguage', () => jest.fn());
jest.mock('../../utils/imageUpload', () => jest.fn());

jest.mock('../../lib/useAuth', () => ({
  useAuth: jest.fn(() => ({ signUp: jest.fn(), user: '', error: '' })),
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
  test('should show error messages in english', async () => {
    render(
      <IntlProvider locale="en" messages={messages.en}>
        <SignUpForm />
      </IntlProvider>,
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Enter'));
    });
    expect(screen.getByText('Invalid password field!')).toBeInTheDocument();
  });

  test('should show error messages in russian', async () => {
    render(
      <IntlProvider locale="ru" messages={messages.ru}>
        <SignUpForm />
      </IntlProvider>,
    );

    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('Ввести'));
    });
    expect(screen.getByText('Невалидное поле пароля!')).toBeInTheDocument();
  });
});
