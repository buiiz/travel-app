import React from 'react';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';

import { messages } from '../../locales';
import Modal from '../Modal';

const mockFn = jest.fn();

const REMAINDER = 'reminder';

it('Modal renders correctly', () => {
  const tree = renderer
    .create(
      <IntlProvider locale="ru" messages={messages['ru']}>
        <Modal setShowModal={mockFn} propText={REMAINDER} />)
      </IntlProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
