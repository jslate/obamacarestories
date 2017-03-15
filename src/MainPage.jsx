import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import Home from './Home.jsx'


class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: 'home'};
    this.getNavClass = this.getNavClass.bind(this);
    this.renderPageContents = this.renderPageContents.bind(this);
    this.navTo = this.navTo.bind(this);
  }

  getNavClass() {
    if (this.state.navOpen) {
      return 'navbar-collapse';
    } else {
      return 'navbar-collapse collapse';
    }
  }

  renderAbout() {
    return (<div className="well">
        <p>The White House has asked people to share their stories about Obamacare with a survey clearly
        designed to get responses that serve their agenda. You can respond to it if you wish, but if you
        don't tell the story they want to hear, we expect they will ignore it.</p>

        <p>We decided to provide this site to give people another place to share their stories about Obamacare.
        We will compile the responses to provide an alternative story to the one being told by The White House.</p>

        <p>Author: Jonathan Slate (<a href="https://twitter.com/jslate">@jslate</a>)</p>
      </div>);
  }

  renderPageContents() {
    if (this.state.page == 'home') {
      return (<Home />);
    } else {
      return this.renderAbout();
    }
  }

  navTo(event, location) {
    event.preventDefault();
    this.setState({navOpen: false, page: location});
  }

  fbShare(event) {
    event.preventDefault();
    window.open("https://www.facebook.com/sharer/sharer.php?u=http://yourrealobamacarestory.life", "pop", "width=600, height=400, scrollbars=no");
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
                onClick={() => this.setState({navOpen: !this.state.navOpen})}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#" onClick={(event) => this.navTo(event, 'home')}>Obamacare: Share Your Real Story</a>
            </div>
            <div id="navbar" className={this.getNavClass()}>
              <ul className="nav navbar-nav">
                <li className={this.state.page == 'home' ? 'active' : ''}><a href="#" onClick={(event) => this.navTo(event, 'home')}>Home</a></li>
                <li className={this.state.page == 'about' ? 'active' : ''}><a href="#" onClick={(event) => this.navTo(event, 'about')}>About</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.renderPageContents()}
          <div className="sharing">
            <a href="#" onClick={this.fbShare}><img src="fb-logo.png" style={{width: 25}}/></a>
            <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false">Tweet</a>
            <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
          </div>
        </div>
      </div>);
  }
}

const componentElement = document.getElementById('outer-container');
if (componentElement) {
  ReactDOM.render(
    <MainPage />,
    componentElement
  );
}
