import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import saveAs from 'file-saver';
import {useState} from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const selectFile = (event) => {
    console.log(event.target.files)
    setSelectedFile(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-end"
           style={{ width : '100%' }}

      >
        <Stack spacing={2} direction="row"
               style={{ paddingRight : '25px' }}

        >
          <Button variant="outlined" endIcon={<UploadIcon />}
                  style={{ borderColor: 'teal', color: 'teal' }}
                  onClick={handleClickOpen}
          >
            Import
          </Button>
          <Button variant="contained" endIcon={<DownloadIcon />}
                  sx={{ backgroundColor : 'teal'}}
          >
            Export
          </Button>
        </Stack>

      </Box>
      <BootstrapDialog
        fullWidth={"sm"}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Import Student
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

          <Box elevation={2}
               style={{
                   border: '1px dashed ',
                   borderRadius: 10,
                   backgroundColor: '#eaeaea', // Light grey background color
                   padding: "24px 18px",
                   marginBottom: "20px"
              }}
          >
              <Typography gutterBottom>
                Want to import student list?
              </Typography>
              <Button size="small"
              >
                Download the template
              </Button>
          </Box>

          <Box elevation={2}
               style={{
                 border: '1px dashed ',
                 borderRadius: 10,
                 backgroundColor: '#eaeaea', // Light grey background color
                 padding: "24px 18px",
                 display: 'flex',          // Add display: flex
                 flexDirection: 'column',  // Adjust flexDirection as needed
                 alignItems: 'center',
               }}
          >
            <Typography gutterBottom>
              Once you have filled the template out, upload the file here
            </Typography>

            <label htmlFor="btn-upload">

              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
                      style={{paddingTop : "8px"}}
              >
                <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={selectFile}
                       accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
              </Button>
            </label>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} autoFocus onClick={handleClose}>
            Import
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}