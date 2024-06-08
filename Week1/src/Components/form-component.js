import React, { Component } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      emailAddress: '',
      password: '',
      passwordConfirmation: '',
      countryCode: '',
      phoneNumber: '',
      country: '',
      city: '',
      panNumber: '',
      aadharNumber: '',
      showPassword: false,
      showPasswordConfirmation: false,
      formSubmitted: false,
      firstNameError: '',
      lastNameError: '',
      usernameError: '',
      emailAddressError: '',
      passwordError: '',
      passwordConfirmationError: '',
      countryCodeError: '',
      phoneNumberError: '',
      countryError: '',
      cityError: '',
      panNumberError: '',
      aadharNumberError: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = (e) => {
    this.validateField(e.target.name, e.target.value);
  };

  validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'firstName':
        error = value ? '' : 'First name is required';
        break;
      case 'lastName':
        error = value ? '' : 'Last name is required';
        break;
      case 'username':
        error = value ? '' : 'Username is required';
        break;
      case 'emailAddress':
        error = /\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid';
        break;
      case 'password':
        error =
          value.length >= 6
            ? ''
            : 'Password must be at least 6 characters long';
        break;
      case 'passwordConfirmation':
        error = value === this.state.password ? '' : 'Passwords do not match';
        break;
      case 'countryCode':
        error = value ? '' : 'Country code is required';
        break;
      case 'phoneNumber':
        error = value ? '' : 'Phone number is required';
        break;
      case 'country':
        error = value ? '' : 'Country is required';
        break;
      case 'city':
        error = value ? '' : 'City is required';
        break;
      case 'panNumber':
        error = value ? '' : 'PAN number is required';
        break;
      case 'aadharNumber':
        error = value ? '' : 'Aadhar number is required';
        break;
      default:
        break;
    }

    this.setState({ [`${fieldName}Error`]: error });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  togglePasswordConfirmationVisibility = () => {
    this.setState((prevState) => ({
      showPasswordConfirmation: !prevState.showPasswordConfirmation,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      password,
      passwordConfirmation,
      countryCode,
      phoneNumber,
      country,
      city,
      panNumber,
      aadharNumber,
    } = this.state;

    const errors = {
      firstNameError: firstName ? '' : 'First name is required',
      lastNameError: lastName ? '' : 'Last name is required',
      usernameError: username ? '' : 'Username is required',
      emailAddressError: /\S+@\S+\.\S+/.test(emailAddress)
        ? ''
        : 'Email is invalid',
      passwordError:
        password.length >= 6
          ? ''
          : 'Password must be at least 6 characters long',
      passwordConfirmationError:
        password === passwordConfirmation ? '' : 'Passwords do not match',
      countryCodeError: countryCode ? '' : 'Country code is required',
      phoneNumberError: phoneNumber ? '' : 'Phone number is required',
      countryError: country ? '' : 'Country is required',
      cityError: city ? '' : 'City is required',
      panNumberError: panNumber ? '' : 'PAN number is required',
      aadharNumberError: aadharNumber ? '' : 'Aadhar number is required',
    };

    this.setState(errors);

    const noErrors = Object.values(errors).every((error) => error === '');
    if (noErrors) {
      this.setState({ formSubmitted: true });
    }
  };

  render() {
    return (
      <div className='main'>
        {this.state.formSubmitted ? (
          <div className='details'>
            <h3>Submitted Details</h3>
            <div>First Name: {this.state.firstName}</div>
            <div>Last Name: {this.state.lastName}</div>
            <div>Username: {this.state.username}</div>
            <div>Email: {this.state.emailAddress}</div>
            <div>Country Code: {this.state.countryCode}</div>
            <div>Phone Number: {this.state.phoneNumber}</div>
            <div>Country: {this.state.country}</div>
            <div>City: {this.state.city}</div>
            <div>PAN Number: {this.state.panNumber}</div>
            <div>Aadhar Number: {this.state.aadharNumber}</div>
          </div>
        ) : (
          <div>
            <h3>Signup Form</h3>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.firstNameError && (
                  <div className='errorMsg'>{this.state.firstNameError}</div>
                )}
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.lastNameError && (
                  <div className='errorMsg'>{this.state.lastNameError}</div>
                )}
              </div>
              <div>
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.usernameError && (
                  <div className='errorMsg'>{this.state.usernameError}</div>
                )}
              </div>
              <div>
                <label>Email Address</label>
                <input
                  type='email'
                  name='emailAddress'
                  value={this.state.emailAddress}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.emailAddressError && (
                  <div className='errorMsg'>{this.state.emailAddressError}</div>
                )}
              </div>
              <div>
                <label>Password</label>
                <div className='passwordInput'>
                  <input
                    type={this.state.showPassword ? 'text' : 'password'}
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span onClick={this.togglePasswordVisibility}>
                    {this.state.showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {this.state.passwordError && (
                  <div className='errorMsg'>{this.state.passwordError}</div>
                )}
              </div>
              <div>
                <label>Confirm Password</label>
                <div className='passwordInput'>
                  <input
                    type={
                      this.state.showPasswordConfirmation ? 'text' : 'password'
                    }
                    name='passwordConfirmation'
                    value={this.state.passwordConfirmation}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span onClick={this.togglePasswordConfirmationVisibility}>
                    {this.state.showPasswordConfirmation ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </span>
                </div>
                {this.state.passwordConfirmationError && (
                  <div className='errorMsg'>
                    {this.state.passwordConfirmationError}
                  </div>
                )}
              </div>
              <div>
                <label>Country Code</label>
                <input
                  type='tel'
                  name='countryCode'
                  value={this.state.countryCode}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.countryCodeError && (
                  <div className='errorMsg'>{this.state.countryCodeError}</div>
                )}
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type='tel'
                  name='phoneNumber'
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.phoneNumberError && (
                  <div className='errorMsg'>{this.state.phoneNumberError}</div>
                )}
              </div>
              <div>
                <label>Country</label>
                <input
                  type='text'
                  name='country'
                  value={this.state.country}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.countryError && (
                  <div className='errorMsg'>{this.state.countryError}</div>
                )}
              </div>
              <div>
                <label>City</label>
                <input
                  type='text'
                  name='city'
                  value={this.state.city}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.cityError && (
                  <div className='errorMsg'>{this.state.cityError}</div>
                )}
              </div>
              <div>
                <label>PAN Number</label>
                <input
                  type='text'
                  name='panNumber'
                  value={this.state.panNumber}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.panNumberError && (
                  <div className='errorMsg'>{this.state.panNumberError}</div>
                )}
              </div>
              <div>
                <label>Aadhar Number</label>
                <input
                  type='text'
                  name='aadharNumber'
                  value={this.state.aadharNumber}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                {this.state.aadharNumberError && (
                  <div className='errorMsg'>{this.state.aadharNumberError}</div>
                )}
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;
