import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function AdViewCardItemTable({adItems}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ITEM NAME</StyledTableCell>
            <StyledTableCell align="center">CATEGORY NAME</StyledTableCell>
            <StyledTableCell align="center">ITEM UNIT</StyledTableCell>
            <StyledTableCell align="center">QUANTITY</StyledTableCell>
            <StyledTableCell align="center">PRICE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adItems.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row.item.name}</StyledTableCell>
              <StyledTableCell align="center">{row.item.category.name}</StyledTableCell>
              <StyledTableCell align="center">{row.item.unit}</StyledTableCell>
              <StyledTableCell align="center">{row.quantity}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdViewCardItemTable

