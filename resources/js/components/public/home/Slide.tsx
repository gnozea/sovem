import React, {FC} from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    adaptiveHeight: true,
    azyLoad: 'progressive',
    arrows: false,
    dots: true,
    autoplay: true,
    fade: true,
    speed: 900,
    infinite: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    touchThreshold: 100,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1.7,
                slidesToScroll: 1,
                arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1.4,
                slidesToScroll: 1,
                arrows: false
            }
        }
    ]
};
const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

interface IProps {
    children?: React.ReactNode,
    windowSize: any
}

const Slide: FC<IProps> = (props: IProps) => {
    return <section className="vighor-section vighor-top-section vighor-element vighor-element-75e828f vighor-section-full_width vighor-section-stretched vighor-section-height-default vighor-section-height-default" style={{ width: `${props.windowSize[0]}px`}}>
        <div className="vighor-container vighor-column-gap-extended">
            <div className="vighor-row">
                <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-c80cd3f sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                    <div className="vighor-column-wrap vighor-element-populated">
                        <div className="vighor-widget-wrap">
                            <div className="vighor-element vighor-element-884078f sc_fly_static vighor-widget">
                                <div className="vighor-widget-container">
                                    <Slider {...settings}>
                                        <div className="slide-inner">
                                            <img src="https://helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2021/07/slider_slide3-copyright.jpg" alt=""/>
                                            <motion.div variants={container} initial="hidden" animate="visible" className="sl-parallax-wrap scheme_default">
                                                <motion.div className="slide-slogan" variants={item}>
                                                    <h2 className="mb-4" style={{ color: "#fff" }}>Ou se yon viktim <span
                                                        className="d-block font-weight-bold">oswa, ou te asiste?</span>
                                                    </h2>
                                                    <a href="/complain" className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left sc_button_hover_slide_left">
                                                            <span className="sc_button_text">
                                                                <span className="sc_button_title">Repòte sa kounya</span>
                                                            </span>
                                                    </a>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                        <div className="slide-inner">
                                            <img src="https://helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2021/07/slider_slide2-copyright.jpg" alt=""/>
                                            <motion.div variants={container} initial="hidden" animate="visible" className="sl-parallax-wrap scheme_default">
                                                <motion.div className="slide-slogan" variants={item}>
                                                    <h2 className="mb-4" style={{ color: "#fff" }}>Ou vle yon moun <span
                                                        className="d-block font-weight-bold">asistew oswa tande w?</span>
                                                    </h2>
                                                    <a href="/complain" className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left sc_button_hover_slide_left">
                                                            <span className="sc_button_text">
                                                                <span className="sc_button_title">Mande yon asistans</span>
                                                            </span>
                                                    </a>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                        <div className="slide-inner">
                                            <img src="https://helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2021/06/slide1-copyright.jpg" alt=""/>
                                            <motion.div variants={container} initial="hidden" animate="visible" className="sl-parallax-wrap scheme_default">
                                                <motion.div className="slide-slogan" variants={item}>
                                                    <h2 className="mb-4" style={{ color: "#fff" }}>Ou viktim de abi<span
                                                        className="d-block font-weight-bold">nan men yon moun?</span>
                                                    </h2>
                                                    <a href="/complain" className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left sc_button_hover_slide_left">
                                                            <span className="sc_button_text">
                                                                <span className="sc_button_title">Nou ka edew</span>
                                                            </span>
                                                    </a>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
export default Slide
