import React, { useState, useEffect } from 'react'
import {
    Box, Card, Typography, CardContent, CardMedia, Grid, Container
} from '@mui/material';
import * as Yup from "yup";
import { getSellerById } from '../../service/SellerService';
import avatar from "../../Assets/avatar.jpg"
import NavbarUser from '../Navbar/NavbarUser';

function ViewAdCard(props) {
    const [seller, setSeller] = useState({})

    console.log(seller);

    useEffect(() => {
        const getSellerData = async () => {
            const sellerId = props.match.params.rid
            getSellerById()
            .then(response => {
                setSeller(response);
            })
            .catch(error => {
                console.log(error);
            });
        }
        getSellerData()
    }, [])

    return (
        <div>
            <NavbarUser />
            <Container maxWidth="lg" sx={{marginTop: 5}}>
                <Box sx={{ width: '100%', flexGrow: 1 }}>
                    <Card elevation={5} sx={{ display: 'flex', padding: 3, borderRadius: 3 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: "25%" }}
                            height="300"
                            src={avatar}
                            alt='profile pic'
                            object-fit='contain'

                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: "60%" }}  >
                            <CardContent sx={{ flex: '1 1 auto', }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="div" variant="h6" color="text.secondary">
                                            First Name: {seller.fname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="div" variant="h6" color="text.secondary">
                                            Last Name: {seller.lname}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="div" variant="h6" color="text.secondary">
                                            Email: {seller.email}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="div" variant="h6" color="text.secondary">
                                            Contact No: {seller.contact}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="div" variant="h6" color="text.secondary">
                                            District: {seller.district}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography component="div" variant="h6" color="text.secondary">
                                            City: {seller.city}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </div>
    )
}

export default ViewAdCard
