import React from 'react'
import { Container, Box, Paper, Grid } from "@mui/material"
import avatar from "../../Assets/avatar.jpg"
import SellerInformation from "./SellerInformation"
import NavbarSeller from "../Navbar/NavbarSeller"

function MyProfile() {

    return (
        <div>
            <NavbarSeller />
            <Container maxWidth="md" sx={{ padding: 3 }}>
                <Box sx={{ width: '100%', flexGrow: 1 }}>
                    <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                        <h1 align="center">My Profile</h1>
                        <Grid container spacing={4} sx={{ marginBottom: "20px" }}>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <img src={avatar} alt="avatar" width="200px" />
                                <SellerInformation />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}

export default MyProfile
