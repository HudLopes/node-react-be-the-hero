import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import React from 'react';

import Logon from './pages/logon';
import Register from './pages/register'
import Profile from './pages/profile'
import NewIncident from './pages/new-incident'

export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/incidents/new" component={NewIncident}></Route>
        </Switch>
    </BrowserRouter>
    );
    
}