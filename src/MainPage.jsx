import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import axios from 'axios';

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(type, event) {
    let obj = {};
    obj[type] = parseInt(event.target.value);
    this.setState({variableProperties: _.merge(this.state.variableProperties, obj)});
  }

  handleSelectChange(event) {
    this.setState({
      variableProperties: _.find(this.state.items, (item) => item.date == event.target.value).values,
      selectedItem: parseInt(event.target.value)});
  }

  postToServer() {
    let _this = this;
    const date = Date.now();
    const values = _.fromPairs(variableProperties.map((variableProperty) => [variableProperty, _this.state.variableProperties[variableProperty]]));
    const params = {

    };
    axios.post(apiURL, params).then(function (response) {
      _this.setState({donePost: true}});
    });
  }

  render() {
    return (<div>
      <div className="block">
        <h1>{heading}</h1>
      </div>
    </div>);
  }
}

const componentElement = document.getElementById('container');
if (componentElement) {
  ReactDOM.render(
    <MainPage />,
    componentElement
  );
}
