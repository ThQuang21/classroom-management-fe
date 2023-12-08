import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ErrorMessage, Field, Form, Formik} from "formik";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";

const initialValues = {
  name: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Class name is required'),
});

export default function CreateClass({open, setOpen}) {
  const [loading, setLoading] = React.useState(false);
  const [nameError, setNameError] = React.useState('');
  const [formData, setFormData] = React.useState({
    name: '',
    section: '',
    subject: '',
    room: '',
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'name') {
      setNameError(value.trim() ? '' : 'Name is required');
    }
  };

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    if (formData.name.trim()) {
      console.log('Form data:', formData);
    } else {
      setNameError('Name is required');
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create class</DialogTitle>
        <DialogContent >
          <Formik initialValues={initialValues} validationSchema={validationSchema}>
            <Form>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <Field sx={{mt: 2}}
                    as={TextField}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Class name"
                    name="name"
                    required
                    error={Boolean(nameError)}
                    helperText={nameError}
                    value={formData.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    id="section"
                    label="Section"
                    name="section"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    id="room"
                    label="Room"
                    name="room"
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={loading} onClick={handleSubmit}>
            <span>Create</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
