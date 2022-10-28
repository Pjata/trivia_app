import React from 'react';
import ReactDOM from 'react-dom';
import Round from './Round';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Round />, div);
  ReactDOM.unmountComponentAtNode(div);
});