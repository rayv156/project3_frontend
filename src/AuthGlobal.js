import React from 'react'
import './App.css'
import Header from './Header.js'
import {Route, Link, Switch} from 'react-router-dom'

export const GlobalCtx = React.createContext(null)


const Global = () => {
    const [gState, gStateSet] = React.useState({url: "http://localhost:3000"})

    return(
        <GlobalCtx.Provider value={(gState, setGState)}>
            <div>
            <Header />
            <main>
                <switch>
                    <Route exact path="/" render={(rp => <h1>Home</h1>)}/>
                    <Route path="/signup" render={(rp => <h1>Signup</h1>)}/>
                    <Route path="/login" render={(rp => <h1>Login</h1>)}/>
                    <Route path="/dashboard" render={(rp => <h1>Dashboard</h1>)}/>

            </div>
        </GlobalCtx.Provider>
    )
}

export default Global