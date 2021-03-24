import React from 'react';
import renderer from 'react-test-renderer';

import Player from '../Player';

it('Player render correctly', () => {
  const tree = renderer.create(<Player videoUrl={'http:'} />).toJSON();

  expect(tree).toMatchSnapshot();
});
