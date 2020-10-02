import React, { useEffect, useCallback } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch } from 'react-redux'

import GuardedRoute from '../hoc/AuthorizationGuard'
import Home from '../pages/Home/Home'
import Board from '../pages/Board/Board'
import NotFound from '../pages/NotFound/NotFound'
import { changeUserAuth, changeUserData } from '../store/actions/user'

const Routes = (props) => {
    const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0()
    const dispatch = useDispatch()

    const saveUser = useCallback(
        () => {
            getIdTokenClaims().then(token => {
                dispatch(changeUserAuth(token.__raw, token.exp * 1000))
                dispatch(changeUserData(user.name, user.picture))
            })
        },
        [getIdTokenClaims, user, dispatch],
    )

    useEffect(() => {
        if (isAuthenticated) {
            saveUser()
        }
    }, [isAuthenticated, saveUser])

    if (isLoading) {
        //Show a spinner
    }

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <GuardedRoute path="/board/:id" exact component={Board} auth={true} />
            <Route render={() => <NotFound/>} />
        </Switch>
    )
}

export default Routes