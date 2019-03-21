import React, { Component, Fragment } from 'react';
import {
  ImageInput,
  Header,
  Footer,
} from 'components';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <ImageInput />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
