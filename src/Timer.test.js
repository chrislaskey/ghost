import React from 'react';
import ReactDOM from 'react-dom';
import Subject from './Timer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Subject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
