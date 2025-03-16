import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Switch, FormControlLabel, Checkbox, FormGroup, Paper } from "@mui/material";
import ContestTable from "./components/ContestTable";

function App() {
  const [contests, setContests] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    CodeForces: true,
    LeetCode: true,
    CodeChef: true,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/contests")
      .then((response) => {
        console.log("Contests fetched:", response.data);
        setContests(response.data.groupedContests);
      })
      .catch((error) => {
        console.error("Error fetching contests:", error);
      });
  }, []);

  const filteredContests = {
    CodeForces: filters.CodeForces ? contests.CodeForces || [] : [],
    LeetCode: filters.LeetCode ? contests.LeetCode || [] : [],
    CodeChef: filters.CodeChef ? contests.CodeChef || []:[],
  };

  return (
    <Container style={{ backgroundColor: darkMode ? "#121212" : "#fff", color: darkMode ? "#fff" : "#000", padding: "20px" }}>
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        label="Dark Mode"
      />
      <Typography variant="h3" align="center" gutterBottom>Contest Tracker</Typography>

      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>Filters</Typography>
        <FormGroup>
          {Object.keys(filters).map((platform) => (
            <FormControlLabel
              key={platform}
              control={
                <Checkbox
                  checked={filters[platform]}
                  onChange={(e) => {
                    setFilters({ ...filters, [platform]: e.target.checked });
                  }}
                />
              }
              label={platform}
            />
          ))}
        </FormGroup>
      </Paper>

      {Object.keys(filteredContests).map((platform) => (
        <div key={platform}>
          <Typography variant="h4" gutterBottom>{platform}</Typography>
          <ContestTable contests={filteredContests[platform]} />
        </div>
      ))}
    </Container>
  );
}

export default App;