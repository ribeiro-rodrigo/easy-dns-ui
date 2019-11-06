import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import EasyDnsApiService from '../../services/EasyDnsApiService'

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.login = this.login.bind(this);
        this.redirectToList = this.redirectToList.bind(this);

        if (localStorage.getItem('token')) {
            this.redirectToList();
        }

    }

    redirectToList() {
        window.location = '/records'
    }

    async login() {

        if (!this.state.username || !this.state.password) {
            alert('Preencha usuário e senha.')
            return
        }

        try {

            const response = await EasyDnsApiService.authUser(this.state.username, this.state.password)
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.content['access_token']);
                this.redirectToList()
            } else {
                if (response.statusCode === 401) {
                    alert('Usuário ou senha inválidos');
                }
            }
        }
        catch (e) {
            alert('Erro ao realizar login')
        }
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>
                <Container>
                    <TextField name="username" type="text" placeholder="username" fullWidth margin="normal" onChange={this.onChange} value={this.state.username} />
                    <TextField name="password" type="password" placeholder="password" fullWidth margin="normal" onChange={this.onChange} value={this.state.password} />
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