import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import setLanguage from 'next-translate/setLanguage';

import Header from '../Header';

jest.mock('next-translate/setLanguage', () => jest.fn());

jest.mock('../../lib/useAuth', () => ({
  useAuth: jest.fn(() => ({})),
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

describe('Login', () => {
  test('should render translated button name', () => {
    render(
      <IntlProvider locale="en" messages={{ btnLogin: 'Login', btnSignUp: 'Sign up' }}>
        <Header />
      </IntlProvider>,
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should change language', () => {
    render(
      <IntlProvider locale="en" messages={{ btnLogin: 'Login', btnSignUp: 'Sign up' }}>
        <Header />
      </IntlProvider>,
    );

    fireEvent.change(screen.getByTestId('select-locale'), { target: { value: 'ru' } });
    expect(setLanguage).toHaveBeenCalledWith('ru');
  });
});
