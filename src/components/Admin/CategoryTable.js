import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table, TableBody, TableContainer, TableHead, TableRow, Paper, IconButton, Box, Button, Grid,
  Stack, TextField, Modal
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { createTheme } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalUnstyled from '@mui/core/ModalUnstyled';

import { makeStyles } from "@mui/styles"

import { getAllCategory, deleteCategory, editCategory } from '../../service/CategoryService';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#009688",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, name) {
  return { id, name };
}

function CategoryTable() {
  const [name, setName] = useState("")
  const [deleteCatId, setDeleteCatId] = useState(null)
  const [editCatData, setEditCatData] = useState({})
  const [openDelete, setDeleteOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const classes = useStyles();

  const deleteHandleOpen = (id) => {
    setDeleteOpen(true);
    setDeleteCatId(id);
  }

  const editHandleOpen = (data) => {
    setEditOpen(true);
    setEditCatData(data);
    setName(data.name)
  }

  const deleteHandleClose = () => setDeleteOpen(false);
  const editHandleClose = () => setEditOpen(false);
  const [allCategory, setAllCategory] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setAllCategory(await getAllCategory())
    }
    fetchData()
  }, []);

  const onDelete = (id) => {
    deleteCategory(id);
    window.location.reload(true);
  }

  const onEdit = (data) => {

    const newValues = { "id": data.id, "name": name }

    editCategory(newValues)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    window.location.reload(true)
  }

  const rows = allCategory

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Category Id</StyledTableCell>
              <StyledTableCell align="center">Category Name</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">{row.id}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton aria-label="edit" color="primary" onClick={() => editHandleOpen(row)}>
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton aria-label="edit" color="error" onClick={() => deleteHandleOpen(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            <p id="unstyled-modal-description">If you Confirm, this Category will be permanently deleted. Are you sure to Delete?</p>
            <Stack direction="row" spacing={10}  >
              <Button variant="outlined" onClick={deleteHandleClose} startIcon={<CancelIcon />}>
                Cancel
              </Button>
              <Button variant="outlined" onClick={() => onDelete(deleteCatId)} startIcon={<DeleteIcon />} color="error">
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
            <h1>Edit Category</h1>
            <form onSubmit={() => onEdit(editCatData)}>
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
                    Edit Category
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default CategoryTable
