import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';
import {
  generateRows,
  globalSalesValues,
} from './generator';
import {useState} from "react";
import FileExcelComponent from "./FileExcelComponent";

export default function GradeManagementTeacherView() {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    { name: 'channel', title: 'Channel' },
    { name: 'customer', title: 'Customer' },
    { name: 'product', title: 'Product' },
    { name: 'saleDate', title: 'Sale date' },
    { name: 'units', title: 'Units' },
    { name: 'amount', title: 'Sale Amount' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 1000 }));
  const [tableColumnExtensions] = useState([
    { columnName: 'region', width: 150 },
    { columnName: 'sector', width: 180 },
    { columnName: 'channel', width: 120 },
    { columnName: 'product', width: 230 },
    { columnName: 'customer', width: 230 },
    { columnName: 'saleDate', width: 130 },
    { columnName: 'units', width: 80 },
    { columnName: 'amount', align: 'right', width: 140 },
  ]);
  const [leftColumns] = useState(['region', 'sector']);
  const [rightColumns] = useState(['amount']);

  return (
    <>
      <Paper elevation={2} style={{width:'100%', borderTop: '10px solid teal', borderRadius: 10}}>
        <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
          <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
            Grade Management
          </Typography>
          <FileExcelComponent/>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '15px'}}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <VirtualTable
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <TableFixedColumns
            leftColumns={leftColumns}
            rightColumns={rightColumns}
          />
        </Grid>
      </Paper>

    </>
  );
}
