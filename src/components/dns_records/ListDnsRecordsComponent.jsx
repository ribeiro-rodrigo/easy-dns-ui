import React, { Component } from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import EasyDnsApiService from '../../services/EasyDnsApiService'

class ListDnsRecordsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zones: [],
            message: null
        }

        this.reloadRecordsList = this.reloadRecordsList.bind(this);
    }

    async componentDidMount() {
        this.reloadRecordsList();
    }

    async reloadRecordsList() {
        const zones = await EasyDnsApiService.findAllZones();
        this.setState({
            zones: zones
        })
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>DNS Records</Typography>
                <Button variant="contained" color="primary">Add Record</Button>
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
                                    <TableCell align="right">
                                        <CreateIcon />
                                    </TableCell>
                                    <TableCell align="right">
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