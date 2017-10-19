import React from 'react';
import { smoothlyMenu } from '../layouts/Helpers';
import { logout } from '../../helpers/auth'

import $ from 'jquery';

class TopHeader extends React.Component {

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    render() {
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " onClick={this.toggleNavigation} href=""><i className="fa fa-bars"></i> </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                          <a className="dropdown-toggle count-info" data-toggle="dropdown" aria-expanded="false">
                              <i className="fa fa-language"/> Lang
                          </a>
                        </li>
                        <li className="dropdown">
                            <a className="dropdown-toggle count-info" data-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-bell"></i>  <span className="label label-primary" ng-show="notifications.length > 0">0</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                              logout()
                            }}>
                                <i className="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default TopHeader
