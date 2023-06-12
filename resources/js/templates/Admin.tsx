import React, {FC, lazy, Suspense, useContext} from "react";
import {Route, Routes} from "react-router-dom";
import NavTop from "../components/admin/navigation/NavTop";
import { ToastContainer } from 'react-toastify';
import NavSecond from "../components/admin/navigation/NavSecond";
import Progress from "../components/utils/Progress"
import {RequestProvider} from "../context/RequestContext";
import {ProviderProvider} from "../context/ProviderContext";
import {ServiceProvider} from "../context/ServiceContext";

interface IProps {
    children?: React.ReactNode
}

const Admin: FC<IProps> = (props: IProps) => {

    const Request = lazy(() => import("../components/admin/Request")),
        RequestAcceptation = lazy(() => import("../components/admin/RequestAcceptation")),
        Provider = lazy(() => import("../components/admin/Provider")),
        Profile = lazy(() => import("../components/admin/account/Profile")),
        Service = lazy(() => import("../components/admin/service/Service")),
        Dashboard = lazy(() => import("../components/admin/Dashboard"))

    return <>
        <RequestProvider>
            <div className="page">
                <div className="flex-fill">
                    <NavTop/>
                    <NavSecond/>
                    <div className="my-3 my-md-5">
                        <div className="container">
                            <Suspense fallback={<Progress/>}>
                                <Routes>
                                    <Route path="dashboard">
                                        <Route path="" element={<Dashboard/>}/>
                                        <Route path="requests" element={<Request/>}/>
                                        <Route path="profile" element={<Profile/>}/>
                                        <Route path="services">
                                            <Route path="" element={
                                                <ServiceProvider>
                                                    <Service/>
                                                </ServiceProvider> }
                                            />
                                        </Route>
                                        <Route path="providers" element={<ProviderProvider>
                                            <Provider/>
                                        </ProviderProvider>}/>
                                        <Route path="request/accept/:uuid" element={<RequestAcceptation/>}/>
                                    </Route>
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </RequestProvider>
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </>
}

export default Admin
