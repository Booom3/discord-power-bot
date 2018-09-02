import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface ILayoutProps {
}

export interface ILayoutState {
}

export default class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-md">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <NavLink to="/" className="nav-link">Configure</NavLink>
                        <NavLink to="/status" className="nav-link">Status</NavLink>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
