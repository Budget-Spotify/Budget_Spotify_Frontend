import * as React from 'react';
import { styled } from '@mui/system';
import TablePagination, {
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { useOutletContext } from "react-router-dom";
import MenuAppBar from "./NavBar";
import { useState, useEffect } from 'react';
import AdminService from '../services/admin.service'

export default function UserList() {
    const [search] = useOutletContext();
    const [data, setData] = useState({ list: [] });
    const [isLoading, setisLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    function getData() {
        setisLoading(true);
        AdminService.getUserList().then(res => {
            console.log(res.data);
            setData(res.data)
            setisLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, []);
    const rows = data.list.sort((a, b) => (a.calories < b.calories ? -1 : 1));

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <Root
            sx={{
                marginLeft: "20.5%",
                marginBottom: "155px",
                marginRight: "1%",
                color: "#fff",
                padding: "75px 20px 20px 20px",
                background: "black",
                borderRadius: "10px",
            }}
        >
            <MenuAppBar />
            {isLoading ? (
                <h2 style={{ textAlign: "center", margin: "150px", color: "#1DB954" }}>
                    Loading...
                </h2>
            ) : (
                <div>
                    <h1>Songs Uploaded</h1>
                    <br />
                    <table aria-label="custom pagination table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>first Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row, index) => (
                                <tr key={row.name}>
                                    <td>{index + 1}</td>
                                    <td>{row.username}</td>
                                    <td>
                                        {row.firstName}
                                    </td>
                                    <td>
                                        {row.lastName}
                                    </td>
                                </tr>
                            ))}
                            {emptyRows > 0 && (
                                <tr style={{ height: 41 * emptyRows }}>
                                    <td colSpan={4} />
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <CustomTablePagination
                                    rowsPerPageOptions={[10, 15, 20, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            'aria-label': 'rows per page',
                                        },
                                        actions: {
                                            showFirstButton: true,
                                            showLastButton: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </Root>
    );
}



const grey = {
    200: '#d0d7de',
    800: '#32383f',
    900: '#24292f',
};

const Root = styled('div')(
    ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : 'grey'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select} {
    background-color: black;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;