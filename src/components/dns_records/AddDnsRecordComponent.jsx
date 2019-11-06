import React from 'react'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from "@material-ui/core/InputLabel"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ProtectedComponent from '../ProtectedComponent'

import EasyDnsApiService from '../../services/EasyDnsApiService'

class AddDnsRecordComponent extends ProtectedComponent {
    constructor(props) {
        super(props);
        this.state = {
            zone: '',
            name: '',
            type: 'A',
            ttl: '',
            answer: '',
            message: null,
            zones: [{ 'zone': 'test.example.com' }]
        }

        this.saveRecord = this.saveRecord.bind(this);
        this.loadZone = this.loadZone.bind(this);
    }

    componentDidMount() {
        this.loadZone()
    }

    loadZone() {
        let zones = localStorage.getItem('zones');
        zones = JSON.parse(zones);
        this.setState({ zone: zones[0].zone, zones })
    }

    async saveRecord() {

        if (!this.state.name || !this.state.answer) {
            alert('Preencha todos os campos obrigatórios')
            return
        }

        try {

            let record = {
                recordName: this.state.name,
                recordType: this.state.type,
                ttl: this.state.ttl ? parseInt(this.state.ttl) : 0,
                answer: this.state.answer
            }

            record.recordName = this.removeDomain(this.state.zone, record.recordName)

            let response = await EasyDnsApiService.saveRecord(this.state.zone, record)

            if (response.statusCode !== 201) {
                alert('Não foi possível gravar o registro no servidor');
                return
            }

            this.props.history.push('/records')
        }
        catch (e) {
            alert('Erro ao gravar registro')
        }

    }

    removeDomain(zoneName, recordName){
        return recordName.replace(`.${zoneName}`,"")
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
                        {
                            this.state.zones.map(domain => (
                                <MenuItem key={domain.zone} value={domain.zone}>{domain.zone}</MenuItem>
                            ))
                        }

                    </Select>
                    <TextField type="text" placeholder="*record name without domain. Ex former host1" fullWidth margin="normal"
                        name="name" value={this.state.name} onChange={this.onChange} />
                    <InputLabel id="type">Type</InputLabel>
                    <Select name="type" labelId="type" id="type-select" value={this.state.type}
                        onChange={this.onChange} fullWidth>
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="CNAME">CNAME</MenuItem>
                        <MenuItem value="MX">TX</MenuItem>
                        <MenuItem value="NS">NS</MenuItem>
                        <MenuItem value="AAAA">AAAA</MenuItem>
                    </Select>
                    <TextField type="number" onChange={this.onChange} placeholder="record ttl" fullWidth margin="normal"
                        name="ttl" value={this.state.ttl} />
                    <TextField type="text" onChange={this.onChange} placeholder="*answer - If you are a CNAME you should not have the domain. Ex host2" fullWidth margin="normal"
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