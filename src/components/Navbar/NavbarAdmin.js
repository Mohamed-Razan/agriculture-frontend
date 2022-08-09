import React from 'react'
import { Link, BrowserRouter as Router, useLocation } from 'react-router-dom'
import './Navbar.css'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

function NavbarAdmin() {

    const history = useHistory()
    const location = useLocation()

    return (
        <div className="navbar-container">
            <Router>
                <ul>
                    <li className={(location.pathname === "/") ? 'nav-link active-link' : 'nav-link'}>
                        <Link onClick={() => { window.location.href = "/" }}>Home</Link>
                        <div className="underline"></div>
                    </li>
                    <li className={(location.pathname === "/sellers") ? 'nav-link active-link' : 'nav-link'}>
                        <Link onClick={() => { window.location.href = "/sellers" }}>Seller Details</Link>
                        <div className="underline"></div>
                    </li>
                </ul>
                <div style={{ float: "right" }}>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/seller/create-ad")}
                        sx={{ marginRight: 8, marginLeft: 8 }}
                    >
                        Login as Seller
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/user/advertisement")}
                        sx={{ marginRight: 8, marginLeft: 8 }}
                    >
                        Login as User
                    </Button>
                </div>
            </Router>
        </div>
    )
}

export default NavbarAdmin
