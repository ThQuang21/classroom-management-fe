import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import LoadingButton from "@mui/lab/LoadingButton";
import GradeReviewServices from "../../../../services/grade.review.services";
import {useState} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useUserStore} from "../../../../context/UserStoreProvider";

export default function GradeStructureStudentRequest({grade, currentGrade}) {
  const { user } = useUserStore();
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [expectGrade, setExpectGrade] = React.useState(0);
  const [explanation, setExplanation] = React.useState('');
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendRequest = async () => {
    setLoading(true);

    await GradeReviewServices.createGradeReview({
      classCode: classCode,
      gradeCompositionId: grade.code,
      studentId: user.id,
      currentGrade: currentGrade,
      expectationGrade : expectGrade,
      explanation: explanation,
    })
      .then(
        (data) => {
          console.log(data.data.data)
          showAlert('Request a review successully', 'success');

        },
        (error) => {
          console.log(error)
          showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
        }
      ).finally(() => {
        setLoading(false)
      });
    handleClose();
  };

  return (
    <>
      <Button variant="contained" endIcon={<AddCommentIcon />}
              style={{ backgroundColor: 'teal', color: 'white' }}
              onClick={handleClickOpen}
      >
        Request review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request a review of <strong>{grade.name}</strong></DialogTitle>
        <DialogContent>
          <DialogContentText>
            To request a review to your teachers, please enter your expectation grade and the explanation.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Expectation grade"
            type="number"
            fullWidth
            variant="standard"
            inputProps={{ min: 0, max: 10 }}
            value={expectGrade}
            onChange={(e) => setExpectGrade(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Explanation"
            type="text"
            fullWidth
            variant="standard"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleSendRequest}
            variant={"contained"}
            loading={loading}
          >
            <span>Send</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>

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
  );
}