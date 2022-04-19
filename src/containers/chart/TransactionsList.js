import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  Typography,
  Tootip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import capitalize from "../../textHelpers/capitalize";



const types = {
  pay_day:'deposit', emergency:'withdrawal', purchase:'withdrawal', utilities:'withdrawal', taxes:'withdrawal', retirement_contribution: 'withdrawal', investment_total:'investment_total',investment_intrest:'deposit', car_payment: 'withdrawal', payment:'withdrawal', investment:'withdrawal', mortgage_payment: 'withdrawal'
}

export default function TransactionsList({
  data =[],
  listItemAmount,
  setListItemAmount,
}) {
  console.log(data);
  const handleChange = (e) => {
    setListItemAmount(e.target.value);
  };
  return (
    <Paper sx={{ marginTop: "15px" }}>
      <TableContainer>
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Last {data.length} Transactions
          </Typography>
          <FormControl fullWidth sx={{ margin: "10px" }}>
            <InputLabel id="demo-simple-select-label">
              Num of Transactions
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={listItemAmount}
              label="Num of Transactions"
              onChange={handleChange}
            >
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={1000}>1000</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
        <Table sx={{ width: "100%" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0, listItemAmount).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">${row[types[row.description]]}</TableCell>
                <TableCell align="right">
                  {capitalize(row.description)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
