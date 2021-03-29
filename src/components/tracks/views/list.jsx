import React, { Component } from 'react';
import axios from 'axios';

export default class TacksList extends Component {
    constructor() {
        super();
        this.state = {
            tracks: [],
            hasNext: false,
            totalPages: 1
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData(1);
    }

    fetchData(page) {
        axios.get(`${process.env.BASE_URL}/api/tracks?page=${page}`).then(res => {
            const paginationData = res.data;

            this.setState(paginationData)
        })
    }

    render() {
        const { tracks, hasNext, totalPages } = this.state;

        const columns = ['Name', 'Album', 'Composer', 'Genre'];
        return (
            <div id="row" className="row h-100 justify-content-center align-items-center">
                <div id="col" className="col-md-10">
                    <h3 className="text-center text-info">Tracks</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                {columns.map(col => <th key={`header-${col}`}>{col}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            { tracks.length
                                ? tracks.map((track, index) => (
                                    <tr key={`track-${track.TrackId}-row`} >
                                        {columns.map(col => <td key={`track-${col}`}>{track[col]}</td>)}
                                    </tr>
                                ))
                                : <tr key="no-tracks-trow" className="text-center bg-light"><td colSpan={4}>No tracks available</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
