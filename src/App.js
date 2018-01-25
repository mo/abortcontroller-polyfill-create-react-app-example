import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Until "eslint" understands (via "globals" npm package) that "AbortController"
// is a global variable in the "browser" environment, we need this declaration
// as a workaround. See also:
// https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#using-global-variables
const AbortController = window.AbortController;

class App extends Component {
  state = {
    loading: true,
    text: 0,
  }
  componentDidMount() {
    const controller = new AbortController();
    if (Math.random() < 0.67) {
      controller.abort();
    }
    fetch('https://api.github.com/repos/facebook/react', { signal: controller.signal })
      .then(r => r.json())
      .then(json => {
        this.setState({
          loading: false,
          msg: 'Request was not aborted: React has ' + json.stargazers_count + ' stars.',
        });
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          this.setState({
            loading: false,
            msg: 'fetch() request was aborted, hit CTRL-R to try again.',
          });
          return;
        }
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { this.state.loading ? 'Loading...' : this.state.msg }
        </p>
      </div>
    );
  }
}

export default App;
