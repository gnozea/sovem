import React, {FC, lazy, Suspense, useEffect, useLayoutEffect, useState} from "react";
import Nav from "../components/public/Nav";
import {Route, Routes} from "react-router-dom";
import ComplainForm from "../components/public/ComplainForm";
import Footer from "../components/public/Footer";
import {ServiceFormProvider} from "../context/ServiceFormContext";
import Progress from "../components/utils/Progress";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "../components/public/Home";
import CreateProvider from "../components/public/CreateProvider";
const LoaderWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    height: 100vh;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
`
const bodyClasses = "home page-template-default page page-id-594 wp-custom-logo ua_chrome preloader frontpage body_tag scheme_default blog_mode_front body_style_wide is_stream blog_style_excerpt sidebar_hide expand_content remove_margins trx_addons_present header_type_custom header_style_header-custom-2768 header_position_default menu_style_top elementor-default elementor-kit-2640 elementor-page elementor-page-594 e--ua-blink e--ua-chrome e--ua-mac e--ua-webkit desktop_layout"
interface IProps {
    children?: React.ReactNode
}

const ContentWrap = styled.div<{width: number}>`
    width: ${(props: any) => props.width}px!important;
`

const Public:FC<IProps> = (props: IProps) => {

    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        document.querySelector("body").className += bodyClasses
    }, [])

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    const menuItems = [
        {title: "Akèy", href: "/"},
        {title: "Swiv dosyew", href: "/service/track"},
        {title: "Kiyès nou ye", href: ""},
    ]

    const ServiceTrack = lazy(() => import("../components/public/ServiceTrack"))

    return <div className="body_wrap">
        <ToastContainer
            position="top-center"
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
        <div className="page_wrap">
            <Nav menuItems={menuItems}/>
            <div className="page_content_wrap">
                <ContentWrap className="content_wrap" width={size[0]}>
                    <div className="content">
                        <a id="content_skip_link_anchor" className="impacto_patronus_skip_link_anchor" href="#"></a>
                        <article
                            className="post_item_single post_type_page post-594 page type-page status-publish hentry">
                            <div className="post_content entry-content">
                                <div className="vighor vighor-594">
                                    <div className="vighor-inner">
                                        <div className="vighor-section-wrap">
                                            <Suspense fallback={<LoaderWrapper>
                                                <Progress color="#E89C42" style="skype"/>
                                            </LoaderWrapper>}>
                                                <Routes>
                                                    <Route path="" element={<Home size={size}/>}/>
                                                    <Route path="service/track" element={<ServiceTrack/>}/>
                                                    <Route path="provider/validate/:token" element={<CreateProvider/>}/>
                                                    <Route path="complain" element={<ServiceFormProvider><ComplainForm/></ServiceFormProvider>}/>
                                                </Routes>
                                            </Suspense>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </ContentWrap>
            </div>
            <Footer/>
        </div>
    </div>
}
export default Public
