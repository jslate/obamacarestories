import React from 'react';
import ReactDOM from 'react-dom';
import {Truncate} from 'react-read-more';
import moment from 'moment';


class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderFullStory = this.renderFullStory.bind(this);
    this.renderSnippet = this.renderSnippet.bind(this);
    this.readMore = this.readMore.bind(this);
  }

  readMore(event) {
    event.preventDefault();
    this.setState({storyOpen: true});
  }

  renderFullStory() {
    return (<div>{this.props.text}</div>);
  }

  renderSnippet() {
    return (<Truncate lines={2} ellipsis={<span>...
      <br />
      <a href='#' onClick={this.readMore}>Read more</a></span>}>
        {this.props.text}
    </Truncate>);
  }

  render() {
    return (
      <div>
        <div className="byline">
          <em>{moment(this.props.date).format('MMMM Do YYYY, h:mm a')} — {this.props.us_state}</em>
        </div>
        <div>
          {this.state.storyOpen ? this.renderFullStory() : this.renderSnippet()}
        </div>
      </div>
    );
  }
}

class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.stories = [
      {
        date: 1490234031439,
        state: 'California',
        text: "As someone who has Multiple Sclerosis and relies on the ACA to afford medication, I imagine that many battle with similar chronic illnesses. If I didn't have a subsidized program, I would pay $2,900/month for meds-- $6,000/month if I didn't have private insurance. That's more than my rent and groceries. I fight for those who often don't have a chance to vote as a social worker. I'm sure that there are millions of people who haven't had a chance to vote because they were ill or for many other intersectional reasons, yet would if they had a chance. That's a large number that would lose coverage. Please consider those who haven't been able to stand up for themselves."
      },
      {
        date: 1489962921934,
        state: 'Pennsylvania',
        text: "I am currently on Obamacare along with my 2 sons.\nMy situation is unique because I am responsible for an adult daughter 28 with cerebral palsy, an adult son 31 diagnosed with bi-polar and a 21 son in college. Since getting insurance from Obamacare I was able to get treatment for HepC which I contracted from blood transfusion when I delivered my daughter 28. I was able to visit a range of doctors for preventive care including getting colonoscopy, I am in high risk since my mother died at 49 from colon cancer. I am sure I would be in worse health or dead without this insurance \n\nMy son 31 is bi-polar and He is currently being monitored by a doctor and getting adjustments to his medicine. I know without this insurance my son would go back to being hospitalized and the bills will pile up causing more stress"
      },
      {
        date: 1489584885298,
        state: 'Massachusetts',
        text: 'I\'ve been sick with Crohn\'s disease since I was 14. When I tried to go to college, I became too sick to continue after only a few weeks. I dropped out, and my doctor recommended a 3 step surgical procedure. The ACA was brand new at the time, and because I was under 26, I didn\'t have to worry about getting kicked from my parents\' health insurance just when I needed it the most, despite the loss of my status as a full-time student. My dad was even able to leave a job he hated between two of my surgeries without fear that his new insurance would drop me. Those surgeries changed my life, and I do not think I would be alive today if I hadn\'t been able to have them. Afterwards, I was able to go back to college and finish my degree. Nowadays I work and hold my own insurance through my employer, but I am still very expensive, and I live in fear of the return of lifetime and annual caps. And if we go back to a world in which I have to maintain continuous coverage in order to avoid discrimination against my preexisting condition, what will happen to me if I ever have another period in which I\'m too sick to work?'
      },
      {
        date: 1489564367433,
        state: 'Maryland',
        text: 'I live on a very limited fixed income. Even with the ACA I pay over 20% of my monthly income on health care premiums, in addtion to deductables and medicine. And I have a pre existing condition. If the ACA is gutted, I will not be able to afford health insurance and prescription prices will go up, possibly beyond my ability to afford them.  I can\'t believe how cruel the republican party is to want to stop something that works out of spite and selfishness. I think if you want to save money congress should defund its members\' healthcare benefits and other other perks so they will just how much these things cost the average person.'
      },
    ]
  }

  render() {
    const stories = this.stories.map((story, i) => {
      return (
        <div key={i} className="well">
          <Story text={story.text} date={story.date} us_state={story.state} />
        </div>);
    });
    return(<div>
      {stories}
    </div>);
  }
}

export default Stories;
