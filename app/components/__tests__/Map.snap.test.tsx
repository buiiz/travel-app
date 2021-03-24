import React from 'react';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';

import { messages } from '../../locales';
import Map from '../Map';

const coordinates = [52.31, 13.23];
const ISOCode = 'DEU';

it('Map renders correctly', () => {
  const tree = renderer
    .create(
      <IntlProvider locale="ru" messages={messages['ru']}>
        <Map coordinates={coordinates} ISOCode={ISOCode} locale="ru" />)
      </IntlProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
