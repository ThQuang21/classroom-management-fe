import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import { EditingState } from '@devexpress/dx-react-grid';
import {useEffect, useState} from "react";
import HandleImportExportStudent from "./ImportFile/HandleImportExportStudent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import GradeService from "../../../services/grade.service";
import Container from "@mui/material/Container";
import {IconButton, LinearProgress} from "@mui/material";
import ClassService from "../../../services/class.service";
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import MuiGrid from '@mui/material/Grid';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";

const getRowId = row => row.id;

export default function GradeManagementTeacherView() {
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL
  const [rows, setRows] = React.useState([]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [loading, setLoading] = React.useState(true);

  const [alertProps, setAlertProps] = useState({
    open: false,
    message: '',
    severity: 'success', // Default to success
  });
  const handleAlertClose = () => {
    setAlertProps((prev) => ({ ...prev, open: false }));
  };

  const showAlert = (message, severity = 'success') => {
    setAlertProps({
      open: true,
      message,
      severity,
    });

    // Hide the Alert after 4 seconds (4000 milliseconds)
    setTimeout(() => {
      handleAlertClose();
    }, 6000);
  };

  const changeAddedRows = (value) => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { studentId: '' }));
    console.log(initialized)
    setAddedRows(initialized);
  };
  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      // console.log('********', editingRowIds)
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));

    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    if (handleSaveRow(changedRows)) {
      setRows(changedRows);
    }
  };

  const [columns, setColumns] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState([]);

  const fetchData = async () => {

    if (classCode) {
      await GradeService.getGradesByClassCode({ classCode: classCode})
        .then((data) => {
          console.log(data.data.data);
          var rowData = []
          data.data.data.forEach((row, index) => {
            rowData.push({
              ...row,
              id : index + 1
            })
          })
          setRows(rowData)

        }, (error) => {
          console.log(error)
          showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
        })
      ;

      await ClassService.getGradeCompositionByClassCode({ classCode: classCode})
        .then((data) => {
          setLoading(false);

          const newGrades = data.data.data.gradeCompositions.map((grade, index) => ({
            name: grade.name
          }));

          var column = [
            { name: 'fullName', title: 'Fulll Name' },
            { name: 'studentId', title: 'Student ID' },
          ];
          var tableColumnExtension = [
            { columnName: 'fullName', width: 180 }, //fullName
            { columnName: 'studentId', width: 100 }, //studentId

            // { columnName: 'amount', align: 'right', width: 140 }, //total
          ];
          newGrades.forEach((gradeComposition) => {
            column.push({
              name: gradeComposition.name,
              studentId: gradeComposition.studentId,
            })
            tableColumnExtension.push({
              columnName: gradeComposition.name,
              align: 'center'
            })
          })
          setColumns(column)
          setTableColumnExtensions(tableColumnExtension)

          setLoading(false);
        }, (error) => {
          showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
        })
      ;
    }
  };

  useEffect(() => {

    const msgDialog = localStorage.getItem('msgDialog');
    const msgDialogSuccess = localStorage.getItem('msgDialogSuccess');

    if (msgDialog) {
      showAlert(msgDialog, 'error');
      localStorage.removeItem('msgDialog')
    }
    if (msgDialogSuccess) {
      showAlert(msgDialogSuccess, 'success');
      localStorage.removeItem('msgDialogSuccess')
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleReloadTable = async () => {
    setLoading(true);
    await GradeService.getGradesByClassCode({ classCode: classCode})
      .then((data) => {
        console.log(data.data.data);
        setRows(data.data.data)
        setLoading(false)
      }, (error) => {
        console.log(error)
        showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
      })
    ;
  };

  const handleSaveRow = async (changedRows) => {
    // setLoading(true);
    await GradeService.updateGradesByClassCodeAndStudentId({
      classCode: classCode, gradesToUpdate: changedRows
    })
      .then((data) => {
        console.log(data);
        showAlert('Updated successful', 'success');
        // setLoading(false)
      }, (error) => {
        console.log(error)
        showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
        return false;
      });
    fetchData();
  };


  if (loading) {
    return (
      <>
        <Container sx={{ py: 8 }} maxWidth="md">
          <LinearProgress  />
        </Container>
        <Snackbar
          open={alertProps.open}
          autoHideDuration={4000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleAlertClose} severity={alertProps.severity} sx={{ width: '100%' }}>
            {alertProps.message}
          </Alert>
        </Snackbar>
      </>

    )
  }

  return (
    <>
      <Paper elevation={2} style={{width:'100%', borderTop: '10px solid teal', borderRadius: 10}}>
        <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
          <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
            Grade Management
          </Typography>
          <HandleImportExportStudent onReloadTable={handleReloadTable} heading={columns} data={rows}/>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '15px'}}>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            addedRows={addedRows}
            onAddedRowsChange={changeAddedRows}
            onCommitChanges={commitChanges}
          />
          <VirtualTable
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand={!addedRows.length}
            showEditCommand
          />
        </Grid>

        <Snackbar
          open={alertProps.open}
          autoHideDuration={4000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleAlertClose} severity={alertProps.severity} sx={{ width: '100%' }}>
            {alertProps.message}
          </Alert>
        </Snackbar>
      </Paper>

    </>
  );
}
