import React from 'react';
import ReactDOM from 'react-dom';
import TaskManager from './TaskManager';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});