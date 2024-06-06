import { TextField } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& label.Mui-focused": {
              color: "#DFC9C8",
              fontFamily: "Montserrat, sans-serif",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#DFC9C8",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#DFC9C8",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "#DFC9C8",
            },
          },
        },
      },
    },
  });
const Searchbar = ({ setSearch }) => {
  const outerTheme = useTheme();
  //Component to search users by their names
  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <TextField
        id="outlined-basic"
        label="Search for User"
        variant="outlined"
        onChange={(e) => handleSearch(e.target.value)}
        color="secondary"
        sx={{
          marginBottom: "20px",
          width: "60%",
          outline: "none",
          color: "#fdf5f5",
        }}
      />
    </ThemeProvider>
  );
};

export default Searchbar;
