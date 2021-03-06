# Overview

Megadraft is a Rich Text Editor built on top of Facebook's
[draft.js](https://facebook.github.io/draft-js/) framework

# Installation

Megadraft can be installed via npm:

```sh
npm install --save megadraft react react-dom
```

## Usage

To use it in your application you'll just need to import the Megadraft
component and use it in your application.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Megadraft from "megadraft";

class App extends React.Component {
  this.state = {editorState: null};
  render() {
    return (
      <Megadraft
        editorState={this.state.editorState}
        onChange={::this.onChange}/>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);
```
