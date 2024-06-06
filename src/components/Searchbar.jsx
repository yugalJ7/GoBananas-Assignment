import { TextField } from "@mui/material";

const Searchbar = ({ setSearch }) => {
  //Component to search users by their names
  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <TextField
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default Searchbar;
