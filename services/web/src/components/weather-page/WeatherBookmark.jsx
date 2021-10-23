/*  import React from 'react';

const list = [1, 2, 3];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
    };
  }

  onClearArray = () => {
    this.setState({ list: [] });
  };

  onResetArray = () => {
    this.setState({ list });
  };

  render() {
    const { list: items } = this.state;
    return (
      <div>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button type='button' onClick={this.onClearArray}>
          Clear Array
        </button>

        <button type='button' onClick={this.onResetArray}>
          Reset Array
        </button>
      </div>
    );
  }
}

export default App; 

import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      list: ['a', 'b', 'c'],
    };
  }

  onChangeValue = (event) => {
    this.setState({ value: event.target.value });
  };

  onAddItem = () => {
    const { data } = this.props;
    this.setState((state) => {
      const list = state.list.concat(data);

      return {
        list,
        value: '',
      };
    });
  };

  render() {
    const { list: items } = this.state;
    const { value: val } = this.state;
    return (
      <div>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button type='button' onClick={this.onAddItem} disabled={!val}>
          Add
        </button>
      </div>
    );
  }
}

export default App; */

// Second Component
import React from 'react';

export default function Component2(props) {
  const { props: data } = props;
  return (
    <div className='main-cointainer'>
      <h2>Compnent2</h2>

      <p>{data} </p>
    </div>
  );
}
