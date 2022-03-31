import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

function Projects() {
  const [alignment, setAlignment] = React.useState("new");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <h1>Projects</h1>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                size="small"
              >
                <Link to="/project">
                  <ToggleButton value="new">My Projects</ToggleButton>
                </Link>
                <Link to="/newproject">
                  <ToggleButton value="new">New Project</ToggleButton>
                </Link>
                <Link to="/existingproject">
                  <ToggleButton value="existing">Existing Project</ToggleButton>
                </Link>
              </ToggleButtonGroup>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <h3>My Projects</h3>
            </Item>
          </Grid>

          {/* Project Name */}
          <Grid item xs={12}>
            <Item>
              <p>**Display Projects**</p>
            </Item>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default Projects;
