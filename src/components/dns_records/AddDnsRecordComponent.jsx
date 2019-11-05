import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from "@material-ui/core/InputLabel"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AddDnsRecordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zone: '',
            name: '',
            type: 'A',
            ttl: '',
            answer: '',
            message: null
        }

        this.saveRecord = this.saveRecord.bind(this);
        this.loadZone = this.loadZone.bind(this);
    }

    componentDidMount() {
        this.loadZone()
    }

    loadZone() {
        this.setState({ zone: 'test.example.com' })
    }

    saveRecord() {

    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (

            <div>
                <Typography variant="h4" style={style}>Add Record</Typography>
                <form style={formContainer}>
                    <InputLabel id="zone">Zone</InputLabel>
                    <Select name="zone" labelId="zone" id="zone-select" value={this.state.zone}
                        onChange={this.onChange} fullWidth>
                        <MenuItem value="test.example.com">test.example.com</MenuItem>
                        <MenuItem value="test2.example.com">test2.example.com</MenuItem>
                    </Select>
                    <TextField type="text" placeholder="record name" fullWidth margin="normal"
                        name="name" value={this.state.name} />
                    <InputLabel id="type">Type</InputLabel>
                    <Select name="type" labelId="type" id="type-select" value={this.state.type}
                        onChange={this.onChange} fullWidth>
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="CNAME">CNAME</MenuItem>
                        <MenuItem value="MX">MX</MenuItem>
                        <MenuItem value="NS">NS</MenuItem>
                        <MenuItem value="AAAA">AAAA</MenuItem>
                    </Select>
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