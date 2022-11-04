import React from 'react';
import ReactDOM from 'react-dom';
import PaperManager from './PaperManager';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PaperManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});