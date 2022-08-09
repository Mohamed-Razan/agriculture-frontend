import React, { useState, useEffect } from 'react'
import { Paper, Grid, styled, Box, Container, } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Category from './Category';
import Items from './Items';
import NavbarAdmin from '../Navbar/NavbarAdmin';

const card = 5;
function AdminHome() {

    return (
        <div>
            <NavbarAdmin />
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', flexGrow: 1 }}>
                    <Grid container spacing={4} sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Grid item xs={12} lg={6}>
                            <Paper elevation={3} sx={{padding: 3, borderRadius: 3}}>
                                <h1>Categories</h1>
                                <Category />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Paper elevation={3} sx={{padding: 3, borderRadius: 3}}>
                                <h1>Items</h1>
                                <Items />
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default AdminHome

