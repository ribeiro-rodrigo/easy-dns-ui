import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import ListDnsRecordsComponent from './dns_records/ListDnsRecordsComponent'

const AppRouter = () => (
    <div style={style}>
        <Router>
            <Switch>
                <Route path="/" exact component={ListDnsRecordsComponent} />
            </Switch>
        </Router>
    </div>
)

const style = {
    marginTop: '20px'
}

export default AppRouter