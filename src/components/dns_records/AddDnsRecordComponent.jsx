import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddDnsRecordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zone: '',
            name: '',
            type: '',
            ttl: '',
            answer: '',
            message: null
        }

        this.saveRecord = this.saveRecord.bind(this);
    }

    saveRecord() {

    }

    render() {
        return (

            <div>
                <Typography variant="h4" style={style}>Add Record</Typography>
                <form style={formContainer}>
                    <TextField type="text" placeholder="record name" fullWidth margin="normal"
                        name="name" value={this.state.name} />
                    <TextField type="text" placeholder="record type" fullWidth margin="normal"
                        name="type" value={this.state.type} />
                    <TextField type="text" placeholder="record ttl" fullWidth margin="normal"
                        name="ttl" value={this.state.ttl} />
                    <TextField type="text" placeholder="answer" fullWidth margin="normal"
                        name="answer" value={this.state.answer} />
                    <Button variant="contained" color="primary" onClick={this.saveRecord}>Save</Button>
                </form>
            </div>

        )
    }
}

const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default AddDnsRecordComponent; 