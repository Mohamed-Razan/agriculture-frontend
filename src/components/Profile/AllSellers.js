import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container, Box } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { getAllSeller } from '../../service/SellerService';
import NavbarAdmin from '../Navbar/NavbarAdmin';

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

function AllSellers() {
    const [sellerList, setSellerList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setSellerList(await getAllSeller())
        }
        fetchData()
    }, []);

    const rows = sellerList

    return (
        <div>
            <NavbarAdmin />
            <Container maxWidth="xl">
                <Box sx={{ width: '100%', flexGrow: 1, marginTop: "20px", marginBottom: "20px" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Id</StyledTableCell>
                                    <StyledTableCell align="center">First Name</StyledTableCell>
                                    <StyledTableCell align="center">Lst Name</StyledTableCell>
                                    <StyledTableCell align="center">Email</StyledTableCell>
                                    <StyledTableCell align="center">Contact No</StyledTableCell>
                                    <StyledTableCell align="center">District</StyledTableCell>
                                    <StyledTableCell align="center">City</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="center">{row.id}</StyledTableCell>
                                        <StyledTableCell align="center">{row.fname}</StyledTableCell>
                                        <StyledTableCell align="center">{row.lname}</StyledTableCell>
                                        <StyledTableCell align="center">{row.email}</StyledTableCell>
                                        <StyledTableCell align="center">{row.contact}</StyledTableCell>
                                        <StyledTableCell align="center">{row.district}</StyledTableCell>
                                        <StyledTableCell align="center">{row.city}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </div>
    );
}

export default AllSellers
