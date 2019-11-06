import React from 'react'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from "@material-ui/core/InputLabel"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ProtectedComponent from '../ProtectedComponent'

class EditDnsRecordComponent extends ProtectedComponent {
    constructor(props) {
        super(props);
        this.state = {
            domain: '',
            name: '',
            type: '',
            ttl: '',
            answer: '',
            message: null,
            zones: []
        }

        this.saveRecord = this.saveRecord.bind(this);
        this.loadRecord = this.loadRecord.bind(this);
        this.loadZones = this.loadZones.bind(this);
    }

    componentDidMount() {
        this.loadZones()
    }

    loadZones() {
        let zones = localStorage.getItem('zones');
        zones = JSON.parse(zones);
        this.setState({ domain: zones[0].zone, zones })
        this.loadRecord()
    }

    loadRecord() {

        let record = JSON.parse(localStorage.getItem('record'));
        this.setState({ ...record });
    }

    saveRecord() {
        // enviar para api
        localStorage.removeItem('record');
        this.props.history.push('/records')
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return (

            <div>
                <Typography variant="h4" style={style}>Edit Record</Typography>
                <form>
                    <InputLabel id="zone">Zone</InputLabel>
                    <Select name="domain" labelId="zone" id="zone-select" value={this.state.domain}
                        onChange={this.onChange} fullWidth>
                        {
                            this.state.zones.map(domain => (
                                <MenuItem key={domain.zone} value={domain.zone}>{domain.zone}</MenuItem>
                            ))
                        }
                    </Select>
                    <TextField type="text" placeholder="record name without domain. Ex former host1" fullWidth margin="normal"
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
                    <TextField type="text" placeholder="answer - If you are a CNAME you should not have the domain. Ex host2" fullWidth margin="normal"
                        name="answer" value={this.state.answer} />
                    <Button variant="contained" color="primary" onClick={this.saveRecord}>Save</Button>
                </form>
            </div>
        )
    }
}


const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default EditDnsRecordComponent; 