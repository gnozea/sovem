import React, {FC, useContext} from "react";
import AccountContext from "../../../context/AccountContext";
import axios from "axios";
import {Link} from "react-router-dom";

interface IProps {
    children?: React.ReactNode
}

const NavTop: FC<IProps> = (props: IProps) => {
    const {user} = useContext(AccountContext)
    const handleLogout = (e: any) => {
        e.preventDefault();
        axios.post("/logout").then((rep) => {
            location.reload();
        })
    }
    return <div className="header pt-2 pb-2">
        <div className="container">
            <div className="d-flex">
                <Link className="header-brand" to="/dashboard">
                    <img src="/images/logo.png" className="header-brand-img" alt="logo"/>
                </Link>
                <div className="d-flex order-lg-2 ml-auto">
                    <div className="dropdown d-none d-md-flex">
                        {/*<a className="nav-link icon" data-toggle="dropdown">*/}
                        {/*    <i className="fe fe-bell"></i>*/}
                        {/*    <span className="nav-unread"></span>*/}
                        {/*</a>*/}
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                            <a href="#" className="dropdown-item d-flex">
                                <span className="avatar mr-3 align-self-center"
                                      style={{ backgroundImage: "url(demo/faces/male/41.jpg)" }}></span>
                                <div>
                                    <strong>Nathan</strong> pushed new commit: Fix page load performance issue.
                                    <div className="small text-muted">10 minutes ago</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-item d-flex">
                                <span className="avatar mr-3 align-self-center"
                                      style={{ backgroundImage: "url(demo/faces/female/1.jpg)" }}></span>
                                <div>
                                    <strong>Alice</strong> started new task: Tabler UI design.
                                    <div className="small text-muted">1 hour ago</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-item d-flex">
                                <span className="avatar mr-3 align-self-center"
                                      style={{ backgroundImage: "url(demo/faces/female/18.jpg)" }} ></span>
                                <div>
                                    <strong>Rose</strong> deployed new version of NodeJS REST Api V3
                                    <div className="small text-muted">2 hours ago</div>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item text-center">Mark all as read</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <a href="#" className="nav-link pr-0 leading-none" data-toggle="dropdown">
                            <span className="avatar" style={{ backgroundImage: `url(/${user?.provider ? user.provider.logo : "images/default-profile.png"})` }}></span>
                            <span className="ml-2 d-none d-lg-block">
                                <span className="text-default">{user?.name}</span>
                                <small className="text-muted d-block mt-1">{!user?.provider ? "Administrateur" : user.provider.name_short}</small>
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                            <Link className="dropdown-item" to="/dashboard/profile">
                                <i className="dropdown-icon fe fe-user"></i> Profile
                            </Link>
                            {/*<a className="dropdown-item" href="#">*/}
                            {/*    <i className="dropdown-icon fe fe-settings"></i> Settings*/}
                            {/*</a>*/}
                            {/*<a className="dropdown-item" href="#">*/}
                            {/*    <span className="float-right"><span className="badge badge-primary">6</span></span>*/}
                            {/*    <i className="dropdown-icon fe fe-mail"></i> Inbox*/}
                            {/*</a>*/}
                            {/*<a className="dropdown-item" href="#">*/}
                            {/*    <i className="dropdown-icon fe fe-send"></i> Message*/}
                            {/*</a>*/}
                            {/*<div className="dropdown-divider"></div>*/}
                            {/*<a className="dropdown-item" href="#">*/}
                            {/*    <i className="dropdown-icon fe fe-help-circle"></i> Need help?*/}
                            {/*</a>*/}
                            <a className="dropdown-item" href="" onClick={handleLogout}>
                                <i className="dropdown-icon fe fe-log-out"></i> Se déconnecter
                            </a>
                        </div>
                    </div>
                </div>
                <a href="#" className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse"
                   data-target="#headerMenuCollapse">
                    <span className="header-toggler-icon"></span>
                </a>
            </div>
        </div>
    </div>
}
export default NavTop
