import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {donePost: false};
    this.postToServer = this.postToServer.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderPageContents = this.renderPageContents.bind(this);

    this.apiURL = 'https://sgx2yfm8xf.execute-api.us-east-1.amazonaws.com/prod/feelings';
    this.countries = [ "United States", "Afghanistan", "Aland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Saint Eustatius and Saba ", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos Islands", "Colombia", "Comoros", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Republic of the Congo", "Reunion", "Romania", "Russia", "Rwanda", "Saint Barthelemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "U.S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
    this.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  }

  postToServer(event) {
    event.preventDefault();
    this.setState({posting: true})
    let _this = this;
    const params = {
      Item: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        story: this.state.story,
        email: this.state.email,
        state: this.state.state,
        country: this.state.country,
        zip: this.state.zip,
        date_plus: Date.now() * 1000 + Math.floor(Math.random() * 1000)
      },
      TableName: 'shareYourRealStory'
    };
    axios.post(this.apiURL, params).then(function (response) {
      _this.setState({donePost: true, posting: false});
    });
  }

  renderStateOptions() { return this.states.map((state) => (<option key={state}>{state}</option>)); }
  renderCountryOptions() { return this.countries.map((country) => (<option key={country}>{country}</option>)); }

  renderSuccess() {
    if (this.state.donePost) {
      return (<div className="alert alert-success" role="alert">
        Thank you! Your story has been recorded. Please consider sharing on social media using the buttons below.
      </div>);
    }
  }

  renderForm() {
    return (<form>
      <div className="form-group">
        <p>
          <label>
            SHARE YOUR STORY:<br />
            <textarea className="form-control" onChange={(event) => this.setState({story: event.target.value})} rows="15" cols="60"/>
          </label>
        </p>
        <p>
          <label>
            FIRST NAME:<br />
            <input type="text" className="form-control" onChange={(event) => this.setState({firstName: event.target.value})} />
          </label>
        </p>
        <p>
          <label>
            LAST NAME:<br />
            <input type="text" className="form-control" onChange={(event) => this.setState({lastName: event.target.value})} />
          </label>
        </p>
        <p>
          <label>
            EMAIL:<br />
            <input type="text" className="form-control" onChange={(event) => this.setState({email: event.target.value})} />
          </label>
        </p>

        <p>
          <label>
            STATE:<br />
            <select  className="form-control" onChange={(event) => this.setState({us_state: event.target.value})}>
              {this.renderStateOptions()}
            </select>
          </label>
        </p>
        <p>
          <label>
            COUNTRY:<br />
            <select className="form-control" onChange={(event) => this.setState({country: event.target.value})}>
              {this.renderCountryOptions()}
            </select>
          </label>
        </p>
        <p>
          <label>
            ZIP:<br />
            <input type="text" className="form-control" onChange={(event) => this.setState({zip: event.target.value})} />
          </label>
        </p>
        <p>
          <button disabled={this.state.posting} className="btn btn-default btn-primary" onClick={this.postToServer}>SHARE MY STORY</button>
        </p>
      </div>
    </form>);
  }

  renderPageContents() {
    if (this.state.donePost) {
      return this.renderSuccess();
    } else {
      return this.renderForm();
    }
  }

  render() {
    return (
      <div>
      <div className="well">
        <p>We'd like you to share your positive experiences with the Affordable Care Act, also known as Obamacare.
        We will compile the responses to provide an alternative story to the one being told by the White House. You can fill out as
        few or as many fields as you want. However, be aware that it will be easier to verify
        that your story is true if we know how to get in touch with you. We will not share any
        information other than your story and the state in which you live.</p>
      </div>
      {this.renderPageContents()}
    </div>);
  }

}

export default Home;
