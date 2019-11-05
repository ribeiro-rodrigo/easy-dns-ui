import React, { Component } from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ListDnsRecordsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            message: null
        }
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Easy DNS</Typography>
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

                    </TableBody>
                </Table>

            </div>
        )
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default ListDnsRecordsComponent