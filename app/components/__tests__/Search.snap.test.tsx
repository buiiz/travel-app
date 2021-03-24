import React from 'react';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';

import { AppWrapper } from '../../contexts/state';
import { messages } from '../../locales';
import Search from '../Search';

it('Search render correctly', () => {
  const tree = renderer
    .create(
      <AppWrapper>
        <IntlProvider locale="ru" messages={messages['ru']}>
          <Search />
        </IntlProvider>
      </AppWrapper>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
