import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import MuiGrid from '@mui/material/Grid';
import GradeService from "../../../services/grade.service";
import ClassService from "../../../services/class.service";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {IconButton, LinearProgress} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const HomeComponent = ({
                         row,
                         onChange,
                         onApplyChanges,
                         onCancelChanges,
                         open,
                       }) => (
  <Dialog open={open} onClose={onCancelChanges} aria-labelledby="form-dialog-title">
    <AppBar sx={{position: 'relative'}}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onCancelChanges}
          aria-label="close"
        >
          <CloseIcon/>
        </IconButton>
        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
          Student Details
        </Typography>
        <Button autoFocus color="inherit" onClick={onApplyChanges}>
          save
        </Button>
      </Toolbar>
    </AppBar>
    <DialogContent>
      <MuiGrid container spacing={3}>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="fullName"
              label="Full Name"
              value={row.fullName || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>
        <MuiGrid item xs={6}>
          <FormGroup>
            <TextField
              margin="normal"
              name="studentId"
              label="Student ID"
              value={row.studentId || ''}
              onChange={onChange}
            />
          </FormGroup>
        </MuiGrid>

        <MuiGrid item xs={12}>

          <Typography>Grade Details</Typography>
          <FormGroup>
            {Object.keys(row).map((key, index) => (
              (key !== 'fullName' && key !== 'studentId' && key !== 'id') && (
                <TextField
                  key={index}
                  margin="normal"
                  name={key}
                  label={key}
                  type="number"
                  value={row[key] || ''}
                  onChange={onChange}
                />
              )
            ))}
          </FormGroup>
        </MuiGrid>
      </MuiGrid>
    </DialogContent>
  </Dialog>


);

const PopupEditing = React.memo(({ popupComponent: Popup }) => (
  <Plugin>
    <Template name="popupEditing">
      <TemplateConnector>
        {(
          {
            rows,
            getRowId,
            addedRows,
            editingRowIds,
            createRowChange,
            rowChanges,
          },
          {
            changeRow, changeAddedRow, commitChangedRows, commitAddedRows,
            stopEditRows, cancelAddedRows, cancelChangedRows,
          },
        ) => {
          const isNew = addedRows.length > 0;
          let editedRow;
          let rowId;
          if (isNew) {
            rowId = 0;
            editedRow = addedRows[rowId];
          } else {
            [rowId] = editingRowIds;
            const targetRow = rows.filter(row => getRowId(row) === rowId)[0];
            editedRow = { ...targetRow, ...rowChanges[rowId] };
          }

          const processValueChange = ({ target: { name, value } }) => {
            const changeArgs = {
              rowId,
              change: createRowChange(editedRow, value, name),
            };
            if (isNew) {
              changeAddedRow(changeArgs);
            } else {
              changeRow(changeArgs);
            }
          };
          const rowIds = isNew ? [0] : editingRowIds;
          const applyChanges = () => {
            if (isNew) {
              commitAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              commitChangedRows({ rowIds });
            }
          };
          const cancelChanges = () => {
            if (isNew) {
              cancelAddedRows({ rowIds });
            } else {
              stopEditRows({ rowIds });
              cancelChangedRows({ rowIds });
            }
          };

          const open = editingRowIds.length > 0 || isNew;
          return (
            <Popup
              open={open}
              row={editedRow}
              onChange={processValueChange}
              onApplyChanges={applyChanges}
              onCancelChanges={cancelChanges}
            />
          );
        }}
      </TemplateConnector>
    </Template>
    <Template name="root">
      <TemplatePlaceholder />
      <TemplatePlaceholder name="popupEditing" />
    </Template>
  </Plugin>
));

const getRowId = row => row.id;
export default () => {
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL
  const [rows, setRows] = React.useState([]);
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
  const commitChanges = ({ added, changed }) => {
    console.log(changed)
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
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    setRows(changedRows);
  };

  const [columns, setColumns] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState([]);
  useEffect(() => {
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
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={commitChanges}
        />
        <Table />
        <TableHeaderRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
        />
        <PopupEditing popupComponent={HomeComponent} />
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
  );
};