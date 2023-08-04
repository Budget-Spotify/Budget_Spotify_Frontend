import * as React from 'react';
import {styled} from '@mui/system';
import TablePagination, {
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import {Link, useOutletContext} from "react-router-dom";
import MenuAppBar from "./NavBar";
import {useEffect, useState} from "react";
import UserService from "../services/user.service";
import Footer from "./Footer";

export default function SongUploaded() {
    const [search] = useOutletContext();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [songs, setSongs] = useState([]);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - songs.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        UserService.getSongs()
            .then(res => {
                setSongs(res.data.songs);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

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
            <MenuAppBar/>
            <h2 className="text-2xl font-semibold">Songs Uploaded</h2>
            <br/>
            <table aria-label="custom pagination table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Name of the song</th>
                    <th>Singer</th>
                    <th>Listens</th>
                </tr>
                </thead>
                <tbody>
                {(rowsPerPage > 0
                        ? songs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : songs
                ).map((song, index) => (
                    <tr key={song._id}>
                        <td>{index + 1}</td>
                        <td>{song.avatar}</td>
                        <td>
                            <Link to={`/song/detail/${song._id}`}>
                                {song.songName}
                            </Link>
                        </td>
                        <td>
                            {song.singers.map(singer => (
                                {singer}
                            ))}
                        </td>
                        <td>
                            {new Date(song.uploadTime).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
                {emptyRows > 0 && (
                    <tr style={{height: 41 * emptyRows}}>
                        <td colSpan={5}/>
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <CustomTablePagination
                        rowsPerPageOptions={[10, 15, 20, {label: 'All', value: -1}]}
                        colSpan={5}
                        count={songs.length}
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
            <Footer/>
        </Root>
    );
}

const grey = {
    200: '#d0d7de',
    800: '#32383f',
    900: '#24292f',
};

const Root = styled('div')(
    ({theme}) => `
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