import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useUser } from "../../hooks/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.25),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const axios = require("axios").default;

function MyProject({setContent}) {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const [projects, setProjects] = useState(null);
  const [group, setGroup] = useState("");
  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/user/?user_id=" + user)
      .then(function (response) {
        console.log(response);
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Item>
        <h3>My Projects</h3>
      </Item>
      <Item>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {projects.length > 0 ? (
              <TextField
                id="outlined-select-proj"
                select
                label="Project"
                value={group}
                onChange={handleGroupChange}
                helperText="Please select a project."
              >
                {projects.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <div>
                You are not part of any projects!
                <Button onClick={() => setContent('existing')}>Click Here To Join Existing Projects</Button>
                <Button onClick={() => setContent('new')}>Click Here To Create a Projects</Button>
              </div>
            )}
          </>
        )}
      </Item>
    </div>
  );
}

export default MyProject;
