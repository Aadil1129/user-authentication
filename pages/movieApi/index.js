import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { auth } from "../../firebaseconfig";
import { useDispatch } from "react-redux";
import { setuser } from "../../store/slice/userdetail";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { db } from "../../firebaseconfig";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
    border: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Todo() {
  const dispatch = useDispatch();
  const [shows, setShows] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    auth.onAuthStateChanged((value) => {
      dispatch(setuser(value));
    });
    const fetchData = async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=all");
      setShows(result.data);
      console.log(result.data, "result");
    };

    fetchData();
  }, []);
  const addDataHandler = async () => {
    await setDoc(doc(db, "users", user?.uid), {
      shows,
    });
  };

  return (
    <div>
      <Header />
      <div className="database-container">
        <Button variant="contained" onClick={addDataHandler}>
          Add to database
        </Button>
      </div>
      <Box sx={{ width: "90%", margin: "1rem auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Movies Name</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Country</StyledTableCell>
                <StyledTableCell align="right">Language</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shows.slice(0, 6).map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    <div className="image-container">
                      {" "}
                      <img className="table-image" src={row.show?.image?.medium} />
                      <div className="table-name">{row.show.name}</div>{" "}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.show.genres[0]}</StyledTableCell>
                  <StyledTableCell align="right">{row.show.network?.country?.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.show.language}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>{" "}
    </div>
  );
}
