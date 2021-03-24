import React from 'react';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';

import { messages } from '../../locales';
import Card from '../Card';

const item = {
  __typename: 'Country',
  _id: '60450fb4d4f7b1666c3bf94b',
  ISOCode: 'DEU',
  imagesUrl: [
    'https://images.unsplash.com/photo-1554072675-66db59dba46f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80'
  ],
  videoUrl: 'https://www.youtube.com/watch?v=IPbzWJNmndY',
  currency: 'EUR',
  timeZone: 'CET',
  coordinates: [52.31, 13.23],
  data: {
    __typename: 'LocaleCountry',
    en: {
      __typename: 'DataLocaleCountry',
      name: 'Germany',
      description:
        "'Germany is a land of diverse landscapes and interesting cities. Its economy is the largest in Europe and the fifth largest in the world. It was in Germany that many revolutionary scientific discoveries were made: science and research have a long tradition here.'",
      capital: 'Berlin',
    },
    ru: {
      __typename: 'DataLocaleCountry',
      name: 'Германия',
      description:
        'Германия - страна разнообразных пейзажей и интересных городов. Ее экономика является крупнейшей в Европе и пятой по величине в мире. Именно в Германии были сделаны многие революционные научные открытия: наука и исследования имеют здесь давние традиции.',
      capital: 'Берлин',
    },
    uk: {
      __typename: 'DataLocaleCountry',
      name: 'Німеччина',
      description:
        "Німеччина - країна різноманітних пейзажів і цікавих міст. Її економіка є найбільшою в Європі і п'ятою за величиною в світі. Саме в Німеччині були зроблені багато революційні наукові відкриття: наука і дослідження мають тут давні традиції.",
      capital: 'Берлін',
    },
  },
};


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

it('Card renders correctly', () => {
  const tree = renderer
    .create(
      <IntlProvider locale="ru" messages={messages['ru']}>
        <Card item={item} />)
      </IntlProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
