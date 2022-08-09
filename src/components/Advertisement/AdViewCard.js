import React from 'react'
import {
    Box, Card, Typography, CardContent, CardMedia, Button
} from '@mui/material';
import * as Yup from "yup";
import { makeStyles } from "@mui/styles"
import { useHistory } from 'react-router-dom';
import AdViewCardItemTable from './AdViewCardItemTable';

const useStyles = makeStyles({
    button: {
        background: 'linear-gradient(45deg, #185B58 30%, #41B8B0 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        height: 60,
        width: 100,
    },
});
const validationSchema = Yup.object({

});

function ViewAdCard({ ad }) {
    const classes = useStyles();
    const history = useHistory();

    console.log(ad.adItem);

    return (
        <div>
            <Card elevation={5} sx={{ display: 'flex', padding: 3, borderRadius: 3 }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'self-end', pl: 0, pb: 1 }} >
                        <Button
                            className={classes.button}
                            variant="contained"
                            onClick={() => history.push(`/view-profile/${ad.seller.id}`)}
                        >
                            View Profile
                        </Button>
                    </Box>
                </Box>
            </Card>
        </div>
    )
}

export default ViewAdCard
