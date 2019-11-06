import React from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import ProtectedComponent from '../ProtectedComponent'

import EasyDnsApiService from '../../services/EasyDnsApiService'

class ListDnsRecordsComponent extends ProtectedComponent {
    constructor(props) {
        super(props);
        this.state = {
            zones: [],
            message: null
        }

        this.reloadRecordsList = this.reloadRecordsList.bind(this);
        this.addRecord = this.addRecord.bind(this);
        this.editRecord = this.editRecord.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    async componentDidMount() {
        this.reloadRecordsList();
    }

    async reloadRecordsList() {
        const zones = await EasyDnsApiService.findAllZones();
        localStorage.setItem('zones', JSON.stringify(zones));
        this.setState({
            zones: zones
        })
    }

    addRecord() {
        this.props.history.push('/add-record')
    }

    async deleteRecord(zoneName, recordDeleted) {

        try {

            let responseStatus = await EasyDnsApiService.removeRecord(zoneName, recordDeleted.name);

            if (responseStatus !== 204) {
                alert('Não foi possível remover o registro do servidor DNS');
                return
            }

            let zones = this.state.zones
            let zone = zones.filter(z => z.zone === zoneName).reduce((_, current) => current, null);
            zone.records = zone.records.filter(record => record.name !== recordDeleted.name);
            this.setState({ zones: zones });

        }
        catch (e) {
            alert('Erro ao tentar remover registro do servidor DNS.')
        }

    }

    editRecord(zoneName, record) {
        record.zone = zoneName
        localStorage.removeItem('record');
        localStorage.setItem('record', JSON.stringify(record))
        this.props.history.push('/edit-record');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>DNS Records</Typography>
                <Button variant="contained" color="primary" onClick={() => this.addRecord()}>Add Record</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Zone</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">TTL</TableCell>
                            <TableCell align="right">Answer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.zones.map(row => {
                            return row.records.map(record => (
                                <TableRow key={record.name}>
                                    <TableCell component="th" scope="row">{row.zone}</TableCell>
                                    <TableCell align="left">{record.name}</TableCell>
                                    <TableCell align="right">{record.type}</TableCell>
                                    <TableCell align="right">{record.ttl}</TableCell>
                                    <TableCell align="right">{record.answer}</TableCell>
                                    <TableCell align="right" onClick={() => this.editRecord(row.zone, record)}>
                                        <CreateIcon />
                                    </TableCell>
                                    <TableCell align="right" onClick={() => this.deleteRecord(row.zone, record)}>
                                        <DeleteIcon />
                                    </TableCell>
                                </TableRow>
                            ))
                        })}
                    </TableBody>
                </Table>

            </div>
        )
    }
}

const style = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
}

export default ListDnsRecordsComponent