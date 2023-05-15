import React, {FC, useContext, useState} from "react";
import {Link} from "react-router-dom";
import AccountContext from "../../../context/AccountContext";

interface IProps {

}

const NavSecond: FC<IProps> = (props: IProps) => {
    const [active, setActive] = useState(location.pathname.toString()),
        {user} = useContext(AccountContext)

    const setActiveURL = (event: any) => {
        if (event.currentTarget !== event.target) return
        document.querySelectorAll('.nav-item-expanded.nav-item-open').forEach((i) => {
            i.classList.remove('nav-item-expanded', 'nav-item-open')
        })
        const url = new URL(event.target.href)
        setActive(url.pathname)
    }
    return <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg order-lg-first">
                    {user && <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                        <li className="nav-item">
                            <Link to="/dashboard" className={`nav-link ${active === '/dashboard' ? 'active' : ''}`} onClick={setActiveURL}>Tableau de bord</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard/requests" className={`nav-link ${active === '/dashboard/requests' ? 'active' : ''}`} onClick={setActiveURL}>Requetes</Link>
                        </li>
                        {/*<li className="nav-item dropdown">*/}
                        {/*    <Link to="dashboard/requests" className={`nav-link ${active.match('dashboard/requests') ? 'active' : ''}`} onClick={setActiveURL} data-toggle="dropdown">Requettes</Link>*/}
                        {/*    <div className="dropdown-menu dropdown-menu-arrow">*/}
                        {/*        <a href="./cards.html" className="dropdown-item ">Non traitées</a>*/}
                        {/*        <a href="./charts.html" className="dropdown-item ">En cours</a>*/}
                        {/*        <a href="./pricing-cards.html" className="dropdown-item ">Traitées</a>*/}
                        {/*    </div>*/}
                        {/*</li>*/}
                        {!user.provider_id && <li className="nav-item">
                            <Link to="/dashboard/providers" className={`nav-link ${active === '/dashboard/providers' ? 'active' : ''}`} onClick={setActiveURL}>Prestataires</Link>
                        </li>}
                    </ul>}
                </div>
            </div>
        </div>
    </div>
}
export default NavSecond
