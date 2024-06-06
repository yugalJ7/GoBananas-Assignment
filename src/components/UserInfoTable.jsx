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
  { id: "geonameId", label: "Geoname ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "Population", label: "Population", minWidth: 170 },
  { id: "country", label: "Country", minWidth: 170 },
  { id: "timezone", label: "Timezone", minWidth: 170 },
];

const UserInfoTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // On every render randomuser.me API fetch different users
  const fetchData = async () => {
    await axios
      .get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22India%22&refine=timezone%3A%22Asia%22&refine=feature_code%3A%22PPLA2%22"
      )
      .then((response) => setUserData(response.data.results))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(userData);

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
                .map((city) => {
                  const {
                    geoname_id,
                    name,
                    population,
                    cou_name_en,
                    timezone,
                  } = city;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={geoname_id}
                    >
                      <TableCell align="left">{geoname_id}</TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">{population}</TableCell>
                      <TableCell align="left">{cou_name_en}</TableCell>
                      <TableCell align="left">{timezone}</TableCell>
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
