import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GradeStructure from "./GradeStructure";
import Grid from '@mui/material/Grid';
import GradeManagementTeacherView from "./GradeManagement/GradeManagementTeacherView";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function GradePanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Structure" {...a11yProps(0)} />
            <Tab label="Management" {...a11yProps(1)} />
            <Tab label="Review" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Grid>

      <Grid item xs={12} sm={10}>
        <TabPanel value={value} index={0}>
          <GradeStructure />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GradeManagementTeacherView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Grade Review
        </TabPanel>
      </Grid>
    </Grid>
  );
}
