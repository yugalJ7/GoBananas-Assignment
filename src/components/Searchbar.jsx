import { TextField } from "@mui/material";
import { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ userData, setUserData, fetchData }) => {
  const requestSearch = (value) => {
    // console.log(value);

    if (value.length === 0) {
      fetchData();
    }

    const filteredRows = userData.filter((row) => {
      return row.name.toLowerCase().includes(value.toLowerCase());
    });
    setUserData(filteredRows);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      onChange={(e) => requestSearch(e.target.value)}
    />
  );
};

export default Searchbar;
