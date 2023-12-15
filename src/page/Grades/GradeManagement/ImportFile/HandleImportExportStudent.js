import * as React from 'react';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ImportStudentFile from "./ImportStudentFile";

export default function HandleImportExportStudent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
      <ImportStudentFile open={open} setOpen={setOpen}/>

    </React.Fragment>
  );
}