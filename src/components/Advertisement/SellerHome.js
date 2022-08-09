import React, { useState, useEffect } from 'react'
import { Paper, Grid, styled, Box, Container, } from '@mui/material';
import CreateAd from './CreateAd';

const card = 5;
function TutorView() {

    // const [ads, setAds] = useState([])

    // useEffect(() => {
    //     const getAds = async () => {
    //         setAds(await getAdvertisements())
    //     }
    //     getAds();
    // }, [])

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
    }));

    return (
        <div>
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', flexGrow: 1 }}>
                    <Grid container spacing={4} sx={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Grid item xs={12} md={7}>
                            <Item>
                                <h1>Create Advertisement </h1>
                                <div>
                                    <CreateAd />
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    )
}

export default TutorView

