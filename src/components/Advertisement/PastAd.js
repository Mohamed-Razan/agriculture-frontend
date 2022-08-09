import React, { useState, useEffect } from 'react'
import { Paper, Grid, styled, Box, Container, } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import PastAdCard from './PastAdCard';
import { getAllAdvertisement } from '../../service/AdvertisementService'
import NavbarSeller from "../Navbar/NavbarSeller"

const card = 5;
function PastAd() {

    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            setAds(await getAllAdvertisement())
        }
        getAds();
    }, [])

    return (
        <div>
            <NavbarSeller />
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', flexGrow: 1 }}>
                    <Grid container spacing={4} sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                                <h1>Past Advertisement </h1>
                                <div>
                                    {
                                        ads.map((ad, i) => <span key={i}> <PastAdCard ad={ad} />
                                            <br /> </span>)
                                    }
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default PastAd

