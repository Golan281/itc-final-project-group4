import "./Home.css";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContents from "../elements/TabContents/TabContents";
import { nanoid } from "nanoid";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center" },
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Work" {...a11yProps(0)} />
          <Tab label="Home" {...a11yProps(1)} />
          <Tab label="Leisure" {...a11yProps(2)} />
          <Tab label="Hobbies" {...a11yProps(3)} />
          <Tab label="Education" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TabContents workSpaceId="work" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContents workSpaceId="home" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContents workSpaceId="leisure" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabContents workSpaceId="hobbies" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TabContents workSpaceId="education" />
      </TabPanel>
    </Box>
  );
}
