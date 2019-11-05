import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import ListDnsRecordsComponent from './dns_records/ListDnsRecordsComponent'
import AddDnsRecordComponent from './dns_records/AddDnsRecordComponent'

const AppRouter = () => (
    <div style={style}>
        <Router>
            <Switch>
                <Route path="/" exact component={ListDnsRecordsComponent} />
                <Route path="/records" exact component={ListDnsRecordsComponent} />
                <Route path="/add-record" component={AddDnsRecordComponent} />
            </Switch>
        </Router>
    </div>
)

const style = {
    marginTop: '20px'
}

export default AppRouter