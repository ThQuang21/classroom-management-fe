import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFixedColumns, TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Plugin, Template, TemplateConnector, TemplatePlaceholder,
} from '@devexpress/dx-react-core'
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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiGrid from '@mui/material/Grid';
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import TableGrade from "./TableGrade";

export default function GradeManagementTeacherView() {
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL

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

  const handleReloadTable = async () => {
    // setLoading(true);
    await GradeService.getGradesByClassCode({ classCode: classCode})
      .then((data) => {
        console.log(data.data.data);
        // setRows(data.data.data)
        // setLoading(false)
      }, (error) => {
        console.log(error)
        showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
      })
    ;
  };

  return (
    <>
      <Paper elevation={2} style={{width:'100%', borderTop: '10px solid teal', borderRadius: 10}}>
        <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
          <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
            Grade Management
          </Typography>
          <HandleImportExportStudent onReloadTable={handleReloadTable}/>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '15px'}}>
       <TableGrade/>

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
