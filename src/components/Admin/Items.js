import React, { useState, useEffect } from 'react'

import { MenuItem, Grid, TextField, Button } from '@mui/material';
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ItemTable from './ItemTable';
import { getAllCategory } from '../../service/CategoryService';

import { postItem } from '../../service/ItemService';

const theme = createTheme();
const useStyles = makeStyles({
    button: {
        background: 'linear-gradient(45deg, #185B58 30%, #41B8B0 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
        color: 'white',
        height: 54,
        padding: '0 30px',
    },
});

function Items() {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [unit, setUnit] = useState("")
    const [allCategory, setAllCategory] = useState([])
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            setAllCategory(await getAllCategory())
        }
        fetchData()
    }, []);

    const handleSubmit = () => {

        const formData = new FormData();
        formData.append("name", name)
        formData.append("categoryId", category)
        formData.append("unit", unit)

        postItem(formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        window.location.reload(true)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-basic"
                            label="Item Name"
                            margin="normal"
                            fullWidth
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="title"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            name="catId"
                            id="catId"
                            select
                            label="Category"
                            value={category.id}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth
                            sx={{margin: theme.spacing(2)}}
                        >
                            {allCategory.map((cat, idx) =>
                                <MenuItem value={cat.id} key={idx}>{cat.name}</MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="outlined-basic"
                            label="Unit"
                            margin="normal"
                            fullWidth
                            name="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            autoComplete="title"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className={classes.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2, marginTop: -2 }}
                        >
                            Add Item
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <ItemTable />
        </div>
    )
}

export default Items
