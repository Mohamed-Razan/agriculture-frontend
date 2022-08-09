import React, { useState, useEffect } from 'react'
import {
    Stack, IconButton, Button, Grid, styled, Box, Card, TextField, Typography, CardContent,
    CardMedia, Modal, MenuItem, FormControl
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles"
import { v4 as uuidv4 } from 'uuid';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { getAllCategory } from '../../service/CategoryService';
import { getAllItem } from '../../service/ItemService';
import { deleteAdvertisement, editAdvertisement } from '../../service/AdvertisementService';

import AdViewCardItemTable from './AdViewCardItemTable';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const deleteStyle = {
    width: 300,
    bgcolor: 'white',
    border: '2px solid #ff0000',
    p: 2,
    px: 3,
    pb: 3,
};
const editStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

function PastAdCard({ ad }) {
    const [openDelete, setDeleteOpen] = React.useState(false);
    const [openEdit, setEditOpen] = React.useState(false);
    const deleteHandleOpen = () => setDeleteOpen(true);
    const editHandleOpen = () => setEditOpen(true);
    const deleteHandleClose = () => setDeleteOpen(false);
    const editHandleClose = () => setEditOpen(false);
    const classes = useStyles();

    const history = useHistory();
    const [allCategory, setAllCategory] = useState([])
    const [allItem, setAllItem] = useState([])
    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), catId: '', itemId: '', quantity: 0, price: 0 },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setAllCategory(await getAllCategory())
            setAllItem(await getAllItem())
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

    const onDelete = () => {
        deleteAdvertisement(ad.id);
        window.location.reload(true);
    }

    const formik = useFormik({
        initialValues: {
            title: ad.title,
            description: ad.description,
            file: `data:image/jpeg;base64,${ad.file}`

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const categoryId = inputFields.map((field) => field.catId)
            const itemId = inputFields.map((field) => field.itemId)
            const quantity = inputFields.map((field) => parseInt(field.quantity))
            const price = inputFields.map((field) => parseFloat(field.price))

            try {

                const formData = new FormData();
                formData.append("adId", ad.id)
                formData.append("sellerId", 1)
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("itemId", itemId)
                formData.append("quantity", quantity)
                formData.append("price", price)
                formData.append("file", values.file)

                editAdvertisement(formData)
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

    return (
        <div>
            <Card elevation={5} sx={{ display: 'flex', padding: 3, borderRadius: 3  }}>
                <CardMedia
                    component="img"
                    sx={{ width: "40%" }}
                    height="350"
                    src={`data:image/jpeg;base64,${ad.file}`}
                    alt='Advertisement'
                    object-fit='contain'

                />
                <Box sx={{ display: 'flex', flexDirection: 'row', width: "60%" }}  >
                    <CardContent sx={{ flex: '1 1 auto', }}>
                        <Typography component="div" variant="h5">
                            {ad.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {ad.description}
                        </Typography>
                        <AdViewCardItemTable adItems={ad.adItem} />
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'self-end', pl: 0, pb: 0 }} >
                        <IconButton aria-label="edit" color="primary" onClick={editHandleOpen}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" type="button" onClick={deleteHandleOpen} >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

            </Card>
            <div>
                <StyledModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={openDelete}
                    onClose={deleteHandleClose}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={deleteStyle}>
                        <h2 id="unstyled-modal-title">Confirm Delete</h2>
                        <p id="unstyled-modal-description">If you Confirm, this advertisement will be permanently deleted. Are you sure to Delete?</p>
                        <Stack direction="row" spacing={10}  >
                            <Button variant="outlined" onClick={deleteHandleClose} startIcon={<CancelIcon />}>
                                Cancel
                            </Button>
                            <Button variant="outlined" onClick={onDelete} startIcon={<DeleteIcon />} color="error">
                                Delete
                            </Button>
                        </Stack>
                    </Box>
                </StyledModal>
                <Modal
                    open={openEdit}
                    onClose={editHandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={editStyle}>
                        <h1>Edit Advertisement </h1>
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
                                            <FormControl fullWidth>
                                                <TextField
                                                    className={classes.text}
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
                                            <FormControl fullWidth>
                                                <TextField
                                                    className={classes.text}
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
                                                    className={classes.text}
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
                                                    className={classes.text}
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
                                                className={classes.icon}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item lg={2}>
                                            <IconButton
                                                onClick={handleAddFields}
                                                className={classes.icon}
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
                </Modal>
            </div>
        </div>
    )
}

export default PastAdCard
