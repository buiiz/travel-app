import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '../Loader';

describe('Loader render correctly', () => {
  test('Loader show - true', () => {
    const tree = renderer.create(<Loader show={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Loader show - false', () => {
    const tree = renderer.create(<Loader show={false} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
