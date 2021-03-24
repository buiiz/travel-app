import React from 'react';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';

import { messages } from '../../locales';
import LoginForm from '../LoginForm';

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

it('LoginForm renders correctly', () => {
  const tree = renderer
    .create(
      <IntlProvider locale="ru" messages={messages['ru']}>
        <LoginForm />)
      </IntlProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
