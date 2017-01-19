import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Your tasks, delivered.</h2>
      <p>TaskWire emails your daily task list to you automatically.</p>
      <p style={ { fontSize: '16px', color: '#aaa' } }>We're in super-Alpha.</p>
    </Jumbotron>
  </div>
);

export default Index;
