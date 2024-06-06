import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";

const columns = [
  { id: "profilePicture", label: "Profile Pic", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "gender", label: "Gender", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "country", label: "Country", minWidth: 170 },
];

const UserInfoTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Using Axios to fetch data from api
  // Using randomuser.me API for random user data
  const fetchData = async () => {
    await axios
      .get("https://randomuser.me/api/?results=100")
      .then((response) => setUserData(response.data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Searchbar
        userData={userData}
        setUserData={setUserData}
        fetchData={fetchData}
        search={search}
        setSearch={setSearch}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((data) =>
                  data.name.first.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => {
                  const { name, email, location, cell, picture, gender } = user;
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={cell}>
                      <TableCell align="left">
                        <img src={picture.medium} alt="" />
                      </TableCell>
                      <TableCell align="left">
                        {name.first + " " + name.last}
                      </TableCell>
                      <TableCell align="left">{gender}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{location.country}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default UserInfoTable;
