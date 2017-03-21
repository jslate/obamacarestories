import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';
import Form from './Form.jsx'
import Stories from './Stories.jsx'

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

class MainPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: 'home'};
    this.getNavClass = this.getNavClass.bind(this);
    this.renderPageContents = this.renderPageContents.bind(this);
    this.renderSharing = this.renderSharing.bind(this);
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
        designed to get responses that serve their agenda. You can take
        the <a href="https://www.whitehouse.gov/obamacare-share-your-story">White House survey</a> if
        you wish, and tell them your story, even if it is one they don't want
        to hear. They will probably ignore you, but it is hard to truly delete information these days,
        and your submission might become an important part of the historical record. However, we highly
        recommend that you also save a copy of your story. Just create your story as a text or word processing
        document, and copy and paste it into the White House form.</p>

        <p>We've created this site to provide another place for people to share their
        stories about Obamacare. So whether or not you choose to complete the White House survey,
        please consider <a href="#" onClick={(event) => this.navTo(event, 'home')}>submitting your story</a> on
        this site. We are compiling the responses to provide an alternative narrative to the one being told by
        The White House. You can read some responses
        on the <a href="#" onClick={(event) => this.navTo(event, 'stories')}>stories page</a>.</p>

        <p>Author: Jonathan Slate (<a href="https://twitter.com/jslate">@jslate</a>)</p>
      </div>);
  }

  renderPageContents() {
    if (this.state.page == 'home') {
      if (this.state.submitted) {
        return this.renderSuccess();
      } else {
        return (<Form onSubmit={() => this.setState({submitted: true})} />);
      }
    } else if (this.state.page == 'about') {
      return this.renderAbout();
    } else {
      return (<Stories />);
    }
  }

  renderSuccess() {
    return (<div className="alert alert-success" role="alert">
      Thank you! Your story has been recorded. Please consider sharing on social media using the buttons below.
    </div>);
  }

  renderSharing() {
    if (this.state.page == 'home' && !this.state.submitted) { return null; }
    return (
      <div className="sharing">
        <div style={{display: 'inline-block', verticalAlign: 'top', marginRight: '15px'}}><strong>Share on:</strong></div>
        <FacebookShareButton url="http://obamacarestories.life">
          <FacebookIcon round={true} size={40}/>
        </FacebookShareButton>
        <TwitterShareButton url="http://obamacarestories.life" title="Share your real Obamacare story" hashtags={['ObamacareStories']}>
          <TwitterIcon round={true} size={40} />
        </TwitterShareButton>
      </div>
    );
  }

  navTo(event, location) {
    event.preventDefault();
    this.setState({navOpen: false, page: location});
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
                <li className={this.state.page == 'stories' ? 'active' : ''}><a href="#" onClick={(event) => this.navTo(event, 'stories')}>Stories</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.renderPageContents()}
          {this.renderSharing()}
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
