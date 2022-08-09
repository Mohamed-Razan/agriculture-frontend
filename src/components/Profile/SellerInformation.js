import React, { useState, useEffect } from "react";
import { Grid, Box, TextField, Button, MenuItem } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";

import { getSellerById, editSeller } from '../../service/SellerService'
import { districtCityData } from '../../Assets/Data/DisrtictCityData'
import { DistrictData } from '../../Assets/Data/DistrictData'

const phonePattern = `^[0][7][0-9]{8}`;
const validationSchema = Yup.object({
});

function SellerInformation() {

    const [disabled, setDisabled] = useState(true);
    const [seller, setSeller] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSellerById()
            .then(response => {
                setSeller(response);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [])

    const formik = useFormik({
        initialValues: { ...seller },
        enableReinitialize: true,
        validationSchema: validationSchema,

        onSubmit: (values) => {

            console.log(values)

            try {
                editSeller(values)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    window.location.reload(true)

            } catch {

            }
        },
    });

    const handleEdit = () => {
        setDisabled(false);
    };
    const handleCancel = () => {
        setDisabled(true);
    };
    
    return (
        !loading
        ? <Box sx={{marginTop: 4}}>
            <Grid container justify='flex-start' alignItems='center' spacing={2}>
                <Grid item xs={12}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='off'
                                    type='text'
                                    id='fname'
                                    name='fname'
                                    variant='outlined'
                                    size='small'
                                    label='First Name'
                                    fullWidth
                                    color='primary'
                                    autoFocus
                                    disabled={disabled}
                                    value={formik.values.fname}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='lname'
                                    variant='outlined'
                                    type='text'
                                    name='lname'
                                    size='small'
                                    label='Last Name'
                                    fullWidth
                                    color='primary'
                                    disabled={disabled}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lname}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='email'
                                    type="email"
                                    variant='outlined'
                                    name='email'
                                    size='small'
                                    label='E-mail'
                                    fullWidth
                                    color='primary'
                                    disabled={disabled}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='contact'
                                    variant='outlined'
                                    type='text'
                                    name='contact'
                                    size='small'
                                    label='Contact No'
                                    fullWidth
                                    color='primary'
                                    disabled={disabled}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contact}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label='district'
                                    id='district'
                                    variant='outlined'
                                    type='text'
                                    size='small'
                                    name='district'
                                    select
                                    fullWidth
                                    color='primary'
                                    disabled={disabled}
                                    value={formik.values.district}
                                    onChange={formik.handleChange}
                                    sx={{textAlign: "left"}}
                                >
                                {DistrictData.map((dis, idx) => {
                                    return <MenuItem value={dis} key={idx}>{dis}</MenuItem>
                                  })}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='text'
                                    variant='outlined'
                                    type='city'
                                    label='City'
                                    size='small'
                                    name='city'
                                    select
                                    fullWidth
                                    color='primary'
                                    disabled={disabled}
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    sx={{textAlign: "left"}}
                                >
                                {formik.values.district ? districtCityData[formik.values.district].cities.map((city, idx) => {
                                    return <MenuItem value={city} key={idx}>{city}</MenuItem>
                                  })
                                  : null }
                                </TextField>
                            </Grid>
                        </Grid>
                    </form>
                    <Grid item xs={12}>
                    <Grid container direction='row' justify='self-end' spacing={2} sx={{paddingTop: 2}}>
                        {disabled ? null : (
                            <Grid item>
                                <Button
                                    sx={{background: 'linear-gradient(45deg, #CC0909 30%, #F65F5F 90%)', color: 'white'}}
                                    onClick={() => {
                                        handleCancel();
                                        formik.setValues(formik.initialValues);
                                    }}>
                                    cancel
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            {!disabled ? (
                                <Button 
                                    type="submit"
                                    sx={{background: 'linear-gradient(45deg, #185B58 30%, #41B8B0 90%)', color: 'white'}}
                                    disabled={!formik.isValid}
                                    onClick={() => {
                                        formik.handleSubmit()
                                    }}>
                                    Submit
                                </Button>
                            ) : (
                                <Button
                                    sx={{background: 'linear-gradient(45deg, #185B58 30%, #41B8B0 90%)', color: 'white'}}
                                    variant="contained"
                                    onClick={() => {
                                        handleEdit(seller);
                                    }}>
                                    Edit
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </Box>
        : null
    );
}

export default SellerInformation
