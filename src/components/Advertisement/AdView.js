import React, { useState, useEffect } from 'react'
import { Paper, Grid, Box, Container, } from '@mui/material';
import AdViewCard from './AdViewCard';
import { getAllAdvertisement } from '../../service/AdvertisementService'
import NavbarUser from "../Navbar/NavbarUser"

function AdView() {

    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            setAds(await getAllAdvertisement())
        }
        getAds();
    }, [])

    return (
        <div>
            <NavbarUser />
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', flexGrow: 1 }}>
                    <Grid container spacing={4} sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Grid item xs={12}>
                            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                                <h1>Advertisements</h1>
                                <div>
                                    {
                                        ads.map((ad, i) => <span key={i}> <AdViewCard ad={ad} />
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

export default AdView

