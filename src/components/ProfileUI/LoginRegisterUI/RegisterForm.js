import React, { Component } from 'react';
import { Col, Form, Label, Input, FormGroup, Row, Button, FormFeedback } from 'reactstrap';
import Lottie from 'lottie-react';
import SuccessTickAnimation from '../../Animation/successTick.json';
import RegisterManager from '../../../control/RegisterManager';

/**

The Register component displays a form for the user to input their username and password to register.

It also includes input validation and submission handling logic, as well as displaying a success message upon successful registration.

@component
*/


class Register extends Component {
    /**

Constructs a new Register component instance with initial state values for the form inputs, input validation, and loading status.

@constructor

@param {Object} props - The props object that is passed to the component.

@param {Function} props.switchTab - A function to switch tabs within the parent component.

@param {Function} props.toggleModal - A function to toggle the modal component within the parent component.
*/
    constructor(props) {
        super(props);

/**

Represents the state of a component for user registration and login, including username, password, re-entered password, validity of the input, error messages, loading status, and login success status.
@typedef {Object} Register
@property {string} username - The username entered by the user.
@property {string} password - The password entered by the user.
@property {string} rePassword - The re-entered password entered by the user.
@property {boolean} invalidUsername - Whether the username entered by the user is invalid.
@property {boolean} invalidPassword - Whether the password entered by the user is invalid.
@property {boolean} invalidRePassword - Whether the re-entered password entered by the user is invalid.
@property {string} errMessUser - The error message displayed to the user when there is an issue with the entered username or password.
@property {boolean} isLoading - Whether the registration or login process is currently loading.
@property {boolean} loginSuccess - Whether the user has successfully logged in.
*/
        this.state = {
            username: '',
            password: '',
            rePassword: '',
            invalidUsername: false,
            invalidPassword: false,
            invalidRePassword: false,
            errMessUser: '',
            isLoading: false,
            loginSuccess: false
        };
    }
/**

Updates the state with the new input value and resets the input validation error messages.
@param {Object} event - The event object for the input change event.
*/
    handleInput = (event) => {
        this.setState({ invalidUsername: false, invalidPassword: false, invalidRePassword: false });
        this.setState({
            [event.target.name]: event.target.value
        });
    };
/**

Submits the form data after validating the input fields, and sets the loading state while waiting for a response from the server.

If the registration is successful, sets the login success state and switches to the login tab after a delay.

Otherwise, sets the username validation error state and displays an error message.

@param {Object} event - The event object for the form submission event.
*/
    handleSubmit = async (event) => {
        event.preventDefault();
        if (!(this.checkUsername() && this.checkPassword() && this.checkRePassword())) {
            return;
        }
        this.setState({ isLoading: true });

        const registerSuccess = await RegisterManager.register(
            this.state.username,
            this.state.password
        );

        if (registerSuccess) {
            this.setState({ loginSuccess: true }, () => {
                window.setTimeout(() => {
                    this.props.switchTab();
                }, 2800);
                window.setTimeout(() => {
                    this.setState({ loginSuccess: false, isLoading: false });
                }, 3000);
            });
        } else {
            this.setState({
                invalidUsername: true,
                errMessUser: 'This username has already been taken',
                isLoading: false
            });
        }
    };
/**

Checks if the username input field is valid and updates the state with an error message if it is invalid.

@returns {boolean} - Returns true if the input is valid, otherwise returns false.
*/
    checkUsername = () => {
        const invalid = this.state.username.length > 13;

        if (invalid) {
            this.setState({
                invalidUsername: true,
                errMessUser: 'Username cannot be more than 13 characters!'
            });
        }
        return !invalid;
    };
/**

Checks if the password input field is valid and updates the state with an error message if it is invalid.

@returns {boolean} - Returns true if the input is valid, otherwise returns false.
*/
    checkPassword = () => {
        const invalid = this.state.password.length < 8;

        this.setState({ invalidPassword: invalid });
        return !invalid;
    };
/**

Checks if the re-entered password input field matches the password input field field is valid and updates the state with an error message if it is invalid.

@returns {boolean} - Returns true if the input is valid, otherwise returns false.
*/
    checkRePassword = () => {
        const invalid = this.state.rePassword !== this.state.password;

        this.setState({ invalidRePassword: invalid });
        return !invalid;
    };

    render() {
        if (this.state.loginSuccess) {
            return (
                <>
                    <Lottie animationData={SuccessTickAnimation} style={{ height: 100 }} />
                    <p className='text-center mt-2 fs-5'>Registered Successfully</p>
                </>
            );
        } else {
            return (
                <Row className='justify-content-sm-center'>
                    <Col sm={11}>
                        <Form onSubmit={this.handleSubmit} className='row'>
                            <FormGroup className='col-12'>
                                <Label className='text-start' htmlFor='username'>
                                    Username:{' '}
                                </Label>
                                <div className='form-control-with-spinner'>
                                    <Input
                                        type='text'
                                        name='username'
                                        value={this.state.username}
                                        onChange={this.handleInput}
                                        invalid={this.state.invalidUsername}
                                        autoComplete='off'
                                        spellCheck='false'
                                    />
                                    <FormFeedback>{this.state.errMessUser}</FormFeedback>
                                </div>
                            </FormGroup>
                            <div className='col-6 pe-1'>
                                <FormGroup>
                                    <Label htmlFor='password'>Password: </Label>
                                    <Input
                                        type='password'
                                        name='password'
                                        value={this.state.password}
                                        onChange={this.handleInput}
                                        invalid={this.state.invalidPassword}
                                    />
                                    <FormFeedback>
                                        Password must be consist of {'>'}=8 alphanumeric characters!
                                    </FormFeedback>
                                </FormGroup>
                            </div>
                            <div className='col-6 ps-1'>
                                <FormGroup>
                                    <Label htmlFor='rePassword'>Confirm Password: </Label>
                                    <Input
                                        type='password'
                                        name='rePassword'
                                        value={this.state.rePassword}
                                        onChange={this.handleInput}
                                        invalid={this.state.invalidRePassword}
                                    />
                                    <FormFeedback>Passwords do no match!</FormFeedback>
                                </FormGroup>
                            </div>
                            <div className='col'>
                                <FormGroup className='mt-2 float-end'>
                                    {/* add invalid password logic*/}
                                    <Button
                                        className='me-2'
                                        type='submit'
                                        color='primary'
                                        disabled={
                                            this.state.isLoading ||
                                            !(
                                                this.state.username &&
                                                this.state.password &&
                                                this.state.rePassword
                                            )
                                        }
                                    >
                                        Register
                                    </Button>
                                    <Button onClick={this.props.toggleModal}>Cancel</Button>
                                </FormGroup>
                            </div>
                        </Form>
                    </Col>
                </Row>
            );
        }
    }
}

export default Register;
