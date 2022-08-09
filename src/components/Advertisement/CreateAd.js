import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import {
    Button, TextField, Grid, MenuItem, FormControl, IconButton, Box,
    Container, Paper, CssBaseline, Typography
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { v4 as uuidv4 } from 'uuid';

import { useFormik } from "formik";

import * as Yup from "yup";
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getAllCategory } from '../../service/CategoryService';
import { getAllItem, getItemById } from '../../service/ItemService';
import { postAdvertisement } from '../../service/AdvertisementService';
import { getAllSeller } from '../../service/SellerService';
import NavbarSeller from "../Navbar/NavbarSeller"

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        paddingTop: '5%'
    },
    button: {
        background: 'linear-gradient(45deg, #185B58 30%, #41B8B0 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
        color: 'white',
        height: 36,
        padding: '0 30px',
    },
});


const validationSchema = Yup.object({
});

function CreateAd() {
    const classes = useStyles();
    const [allCategory, setAllCategory] = useState([])
    const [allItem, setAllItem] = useState([])
    const [allSeller, setAllSeller] = useState([])
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), catId: '', itemId: '', quantity: 0, price: 0 },
    ]);
    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            setAllCategory(await getAllCategory())
            setAllItem(await getAllItem())
            setAllSeller(await getAllSeller())
        }
        fetchData()
    }, []);

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), catName: '', itemName: '', quantity: 0, price: 0 }])
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            file: null

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            if (allSeller.length === 0) {
                alert("Please Complete your profile")
                history.push("/seller/my-profile")
            }

            else {
                const categoryId = inputFields.map((field) => field.catId)
                const itemId = inputFields.map((field) => field.itemId)
                const quantity = inputFields.map((field) => parseInt(field.quantity))
                const price = inputFields.map((field) => parseFloat(field.price))

                try {

                    const formData = new FormData();
                    formData.append("sellerId", 1)
                    formData.append("title", values.title)
                    formData.append("description", values.description)
                    formData.append("itemId", itemId)
                    formData.append("quantity", quantity)
                    formData.append("price", price)
                    formData.append("file", values.file)

                    postAdvertisement(formData)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    window.location.reload(true)

                } catch {

                }
            }
        },
    });

    return (
        <div>
            <NavbarSeller />
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="lg">
                        <Paper
                            elevation={3}
                            sx={{ minWidth: 350, borderRadius: 3 }}
                            style={{
                                padding: 25,
                            }}
                        >
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography component="h1" variant="h5">
                                    CREATE ADVERTISEMENT
                                </Typography>
                                <br />
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Title"
                                                margin="normal"
                                                fullWidth
                                                name="title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                autoComplete="title"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Description"
                                                margin="normal"
                                                multiline
                                                rows={4}
                                                fullWidth
                                                name="description"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                autoComplete="description"
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={12}>
                                        Upload an Image
                                        <input
                                            style={{ margin: "15px" }}
                                            type='file'
                                            name='file'
                                            id='file'
                                            onChange={(event) => {
                                                formik.setFieldValue('file', event.currentTarget.files[0])
                                            }}
                                        />
                                    </Grid>
                                    {inputFields.map(inputField => (
                                        <Box sx={{ flexGrow: 1 }} key={inputField.id}>
                                            <Grid container spacing={2}>
                                                <Grid item lg={2}>
                                                    <FormControl>
                                                        <TextField
                                                            sx={{ margin: theme.spacing(2), minWidth: 160, }}
                                                            variant="outlined"
                                                            name="catId"
                                                            id="catId"
                                                            select
                                                            label="Category"
                                                            value={inputField.catId}
                                                            onChange={event => handleChangeInput(inputField.id, event)}
                                                        >
                                                            {allCategory.map((cat, idx) =>
                                                                <MenuItem value={cat.id} key={idx}>{cat.name}</MenuItem>
                                                            )}
                                                        </TextField>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={2}>
                                                    <FormControl>
                                                        <TextField
                                                            sx={{ margin: theme.spacing(2), minWidth: 160, }}
                                                            variant="outlined"
                                                            name="itemId"
                                                            id="itemId"
                                                            select
                                                            label="Item"
                                                            value={inputField.itemId}
                                                            onChange={event => handleChangeInput(inputField.id, event)}
                                                            disabled={inputField.catId === ""}
                                                        >
                                                            {allItem.filter(e => e.category.id === inputField.catId).map((item, idx) =>
                                                                <MenuItem value={item.id} key={idx}>{`${item.name} (${item.unit})`}</MenuItem>
                                                            )}
                                                        </TextField>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={2}>
                                                    <FormControl>
                                                        <TextField
                                                            sx={{ margin: theme.spacing(2), minWidth: 160, }}
                                                            type='number'
                                                            name="quantity"
                                                            label="Quantity"
                                                            value={inputField.quantity}
                                                            onChange={event => handleChangeInput(inputField.id, event)}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={2}>
                                                    <FormControl>
                                                        <TextField
                                                            sx={{ margin: theme.spacing(2), minWidth: 160, }}
                                                            type='number'
                                                            name="price"
                                                            label="Price"
                                                            value={inputField.price}
                                                            onChange={event => handleChangeInput(inputField.id, event)}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item lg={2}>
                                                    <IconButton disabled={inputFields.length === 1}
                                                        onClick={() => handleRemoveFields(inputField.id)}
                                                        sx={{ margin: theme.spacing(3), marginLeft: "50px" }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item lg={2}>
                                                    <IconButton
                                                        onClick={handleAddFields}
                                                        sx={{ margin: theme.spacing(3), marginLeft: "50px" }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    ))}
                                    <Grid item xs={12}>
                                        <Button
                                            className={classes.button}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 1, mb: 2 }}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </form>
                            </Box>
                        </Paper>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default CreateAd
