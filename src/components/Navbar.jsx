import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DnsIcon from '@material-ui/icons/Dns'

const style = {
    flexGrow: 1
}

const NavBar = () => {
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
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;