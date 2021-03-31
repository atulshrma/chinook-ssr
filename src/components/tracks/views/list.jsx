import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table'

function Table({ columns, data, fetchData, pageCount }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({
            columns,
            data,
            manualPagination: true,
            autoResetPage: false,
            pageCount,
        },
        usePagination
    );

    useEffect(() => {
        fetchData({ pageIndex, pageSize });
    }, [fetchData, pageIndex, pageSize]);

    // Render the UI for your table
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-4 input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="goToPageInput">Go to page:{" "}</label>
                    </div>
                    <input
                        id="goToPageInput"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </div>
                <span className="col-md-4 text-center">
                    <select
                        className="custom-select"
                        value={pageSize}
                        onChange={(e) => { setPageSize(Number(e.target.value)); }}
                        >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                    </select>
                </span>
                <div className="col-md-4 justify-content-end">
                    <a type={"button"} href="/app/tracks/new" className="btn btn-outline-primary float-right">New Track</a>
                </div>
            </div>
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                            return (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            );
                            })}
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="row">
                <div className="col-md-4 input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="goToPageInput">Go to page:{" "}</label>
                    </div>
                    <input
                        id="goToPageInput"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </div>
                <span className="col-md-4 text-center">
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <ul className="pagination col-md-4 justify-content-end">
                    <li className="page-item">
                        <button  className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </button>
                    </li>
                    <li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button></li>
                    <li className="page-item"><button className="page-link" onClick={() => nextPage()}>Next</button></li>
                    <li className="page-item">
                        <button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
export default class TacksList extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            pageCount: 0
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData({ pageIndex: 0, pageSize: 10});
    }

    fetchData({ pageIndex, pageSize }) {
        this.setState({ loading: true });
        axios.get(`${process.env.BASE_URL}/tracks?page=${pageIndex+1}&pageSize=${pageSize}`).then(res => {
            const { tracks: data, totalPages: pageCount } = res.data;
            this.setState({ data, pageCount, loading: true });
        })
    }

    render() {
        const { data, loading, pageCount } = this.state;

        const columns = [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Album', accessor: 'album' },
            { Header: 'Composer', accessor: 'composer' },
            { Header: 'Genre', accessor: 'genre' }
        ];
        return (
            <div id="row" className="row h-100 justify-content-center align-items-center">
                <div id="col" className="col-md-10">
                    <h3 className="text-center text-info">Tracks</h3>
                    <Table
                        columns={columns}
                        data={data}
                        fetchData={this.fetchData}
                        loading={loading}
                        pageCount={pageCount}
                    />
                </div>
            </div>
        );
    }
}
