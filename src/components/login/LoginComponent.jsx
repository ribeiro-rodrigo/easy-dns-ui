import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.login = this.login.bind(this);
    }

    login() {

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <Container>
                    <TextField type="text" placeholder="username" fullWidth margin="normal" />
                    <TextField type="password" placeholder="password" fullWidth margin="normal" />
                    <div style={style}>
                        <Button variant="contained" color="primary" onClick={this.login}>Enter</Button>
                    </div>
                </Container>
            </div>
        )
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default LoginComponent; 