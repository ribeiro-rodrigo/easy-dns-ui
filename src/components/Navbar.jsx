import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DnsIcon from '@material-ui/icons/Dns'

const style = {
    flexGrow: 1
}

class NavBar extends Component{
    constructor(props){
        super(props); 
        
        this.logout = this.logout.bind(this); 
    }

    logout(){
        localStorage.removeItem('token'); 
        window.location = '/'
    }

    render(){

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="Github Page">
                            <DnsIcon />
                        </IconButton>
                        <Typography variant="h6" style={style}>
                            Easy DNS
                        </Typography>
                        <Button color="inherit" onClick={() => this.logout()}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }
}

export default NavBar;