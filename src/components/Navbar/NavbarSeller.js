import React from 'react'
import { Link, BrowserRouter as Router, useLocation } from 'react-router-dom'
import './Navbar.css'
import { Button } from '@mui/material'
import { useHistory } from 'react-router-dom'

function NavbarSeller() {

    const history = useHistory()
    const location = useLocation()

    return (
        <div className="navbar-container">
            <Router>
                <ul>
                    <li className={(location.pathname === "/seller/create-ad") ? 'nav-link active-link' : 'nav-link'}>
                        <Link onClick={() => { window.location.href = "/seller/create-ad" }}>Create Advertisement</Link>
                        <div className="underline"></div>
                    </li>
                    <li className={(location.pathname === "/seller/past-ad") ? 'nav-link active-link' : 'nav-link'}>
                        <Link onClick={() => { window.location.href = "/seller/past-ad" }}>Past Advertisement</Link>
                        <div className="underline"></div>
                    </li>
                    <li className={(location.pathname === "/seller/my-profile") ? 'nav-link active-link' : 'nav-link'}>
                        <Link onClick={() => { window.location.href = "/seller/my-profile" }}>Profile</Link>
                        <div className="underline"></div>
                    </li>
                </ul>
                <div style={{ float: "right" }}>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/")}
                        sx={{ marginRight: 5, marginLeft: 5 }}
                    >
                        Login as Admin
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => history.push("/user/advertisement")}
                        sx={{ marginRight: 5, marginLeft: 5 }}
                    >
                        Login as User
                    </Button>
                </div>
            </Router>
        </div>
    )
}

export default NavbarSeller
