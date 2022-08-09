import React, { useState } from 'react'
import { Link, BrowserRouter as Router, useLocation } from 'react-router-dom'
import './Navbar.css'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

function NavbarUser() {

    const history = useHistory()
    const location = useLocation()

    return (
        <div className="navbar-container">
            <Router>
                <ul>
                    <li className={(location.pathname === "/user/advertisement") ? 'nav-link active-link' : 'nav-link'}>
                        <Link onClick={() => { window.location.href = "/user/advertisement" }}>Home</Link>
                        <div className="underline"></div>
                    </li>
                </ul>
                <div style={{ float: "right" }}>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/")}
                        sx={{ marginRight: 8, marginLeft: 8 }}
                    >
                        Login as Admin
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/seller/create-ad")}
                        sx={{ marginRight: 8, marginLeft: 8 }}
                    >
                        Login as Seller
                    </Button>
                </div>
            </Router>
        </div>
    )
}

export default NavbarUser
