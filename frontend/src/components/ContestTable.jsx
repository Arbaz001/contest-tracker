import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import TimerIcon from "@mui/icons-material/Timer";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ContestTable = ({ contests }) => {
  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    if (diff <= 0) return "Over";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <TableContainer component={Paper} elevation={3} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#1976d2" }}>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              <IconButton disabled style={{ color: "#fff" }}>
                <EventIcon />
              </IconButton>
              End Time
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              <IconButton disabled style={{ color: "#fff" }}>
                <TimerIcon />
              </IconButton>
              Ends In
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              <IconButton disabled style={{ color: "#fff" }}>
                <AccessTimeIcon />
              </IconButton>
              Duration
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              <IconButton disabled style={{ color: "#fff" }}>
                <DescriptionIcon />
              </IconButton>
              Event
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              <IconButton disabled style={{ color: "#fff" }}>
                <OpenInNewIcon />
              </IconButton>
              URL
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contests.map((contest, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#fff" }}>
              <TableCell>{new Date(contest.end).toLocaleString()}</TableCell>
              <TableCell>{getTimeRemaining(contest.end)}</TableCell>
              <TableCell>{contest.hr_duration}</TableCell>
              <TableCell>{contest.title}</TableCell>
              <TableCell>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Open Link
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContestTable;