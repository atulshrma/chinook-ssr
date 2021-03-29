import React, { Component } from 'react';

export default class Landing extends Component {
    onFormSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div id="login-row" className="row h-100 justify-content-center align-items-center">
                <div id="login-col" className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center text-info">Welcome!</h3>
                            <p className="text-center">This is my POC for a React SSR dashboard to present tabular data.</p>
                            <p className="text-center">This page is a useless CTA.</p>
                            <div className="text-center">
                                <a type={"button"} href="/tracks" className="btn btn-info btn-md">View Dashboard</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
