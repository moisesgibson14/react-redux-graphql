import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'
import { connect } from 'react-redux'

function PrivateRoute({ path, component, ...rest }) {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if (storage && storage.user) {
        console.log('entrooooo');
        return (<Route path={path} component={component} {...rest} />)
    } else {
        return (<Redirect to="/login" {...rest} />)
    }
}

 function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}

function mapStateToProps({user: {fetching, loggedIn}}){
    return {
        fetching,
        loggedIn
    }
}

export default connect(mapStateToProps, {})(Routes)