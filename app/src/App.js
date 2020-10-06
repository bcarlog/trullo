import React from 'react';
import { useHistory } from "react-router-dom"
import Routes from './global/routes'
import axios from 'axios'

import './global/variables.scss'

function App() {
    const history = useHistory()

    axios.defaults.baseURL = "https://qrwz2cx67k.execute-api.eu-west-1.amazonaws.com/dev/"
    axios.interceptors.request.use((request) => {
        request.headers.Authorization = "Bearer " + localStorage.getItem('token')
        return request
    })
    axios.interceptors.response.use(response => {
        return response
    }, error => {
        if (error.response.status === 401) {
            history.push("/");
        }
        return Promise.reject(error)
    })
   
    return (
        <Routes />
    );
}

export default App;
