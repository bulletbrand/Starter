import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Header from "../header/header"
import {HomePage, LoginPage} from "../../pages"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <>
                <Switch>
                    <Header/>
                    <Route path="/" component={HomePage} exact></Route>
                </Switch>
            </>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <LoginPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}