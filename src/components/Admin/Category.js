import React, { useState } from 'react'

import { Box, Paper, Grid, TextField, Button } from '@mui/material';
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CategoryTable from './CategoryTable';

import { postCategory } from '../../service/CategoryService';

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
    }
});

function Category() {

    const [name, setName] = useState("")
    const classes = useStyles();

    const handleSubmit = () => {

        const data = { "name": name }

        postCategory(data)
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
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            label="Category Name"
                            margin="normal"
                            fullWidth
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="title"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            className={classes.button}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Add Category
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <CategoryTable />
        </div>
    )
}

export default Category
