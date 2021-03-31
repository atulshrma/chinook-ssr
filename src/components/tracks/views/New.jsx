import React, { Component } from 'react';
import axios from 'axios';

export default class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            genres: [],
            trackName: '',
        };

        this.fetchData = this.fetchData.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
        this.formChangeHandler = this.formChangeHandler.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({ loading: true });
        axios.get(`${process.env.BASE_URL}/tracks/new`).then(res => {
            const { genres = [] } = res.data;
            const state = Object.assign({}, this.state, { genres, loading: false });
            this.setState(state);
        })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.errormessage) {
            return false;
        }

        const form = event.target;

        const formData = new FormData(form);

        const track = {};
        track.trackName = formData.get('trackName');
        track.genreId = formData.get('genreId');

        axios.post(`${process.env.BASE_URL}/tracks`, { track })
            .then((res) => {
                const state = Object.assign({}, this.state);
                if(res.data && res.data.errMessage) {
                    state.errormessage = res.data.errMessage;
                    this.setState(state);
                    return;
                }
                window.location = '/app/tracks';
            })
            .catch((err) => {
                const state = Object.assign({}, this.state);
                state.errormessage = err.message;
                this.setState(state);
            });
    }

    formChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === 'trackName') {
            if (!/[\w!,'"\. ]{1,50}/.test(val)) {
                err = <strong>The track name should be alphanumeric with max length 50.</strong>;
            }
        }
        this.setState({errormessage: err});
        this.setState({[nam]: val});
    }

    render() {
        const { success, genres, loading } = this.state;

        return (
            <div id="row" className="row h-100 justify-content-center align-items-center">
                <div id="col" className="col-md-10">
                    <h3 className="text-center text-info">New Track</h3>
                    {
                        loading
                            ? <div className="text-center">Loading...</div>
                            : (
                                <form onSubmit={this.formSubmitHandler}>
                                    <div className="form-group" method="post" action="/tracks">
                                        <label htmlFor="inputTrackName">Track Name</label>
                                        <input type="text" className="form-control" id="inputTrackName" name="trackName" onChange={this.formChangeHandler} />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4">
                                            <label htmlFor="inputGenre">Genre</label>
                                            <select id="inputGenre" className="form-control" name="genreId" >
                                                {genres.map((genre, index) => (<option value={genre.id}>{genre.name}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <p className="text-danger text-small">{this.state.errormessage}</p>
                                    <button type="submit" className="btn btn-primary">Create</button>
                            </form>)
                    }
                </div>
            </div>
        );
    }
}
