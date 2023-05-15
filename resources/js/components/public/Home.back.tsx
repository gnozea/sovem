import React, {FC, useEffect} from "react";

interface IProps {

}
const HomeB:FC<IProps> = (props: IProps) => {
    useEffect(() => {
        f()
    }, [])
    return <div className="container">
        <div className="content">
            <div className="first">
                <div className="image-container">
                    <div className="dots">
                        <span className="isActive"></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="haptic">
                        <span>H</span>
                        <span>e</span>
                        <span>l</span>
                        <span>p</span>
                        <span>&nbsp;</span>
                        <span>m</span>
                        <span>e</span>
                    </div>
                    <span className="b_shadow"></span>
                </div>
                <div className="text-section">
                    <h1>
                        Ou se yon viktim?
                    </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid animi, deleniti dolores eveniet
                        facere maxime perferendis rem. Animi, aut, consequatur eaque hic illo itaque iusto libero, quae
                        quia repellendus reprehenderit!</p>
                    <a href="#" className="read-more">Rapòte sa kounye a</a>
                </div>
            </div>
            <div className="second">
                <div className="second-text-section"><h2>
                    Ou te asiste a yon zak?
                </h2>
                    <p><b>All the lorem ipsum generators on the internet.</b></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br/>Atque debitis eveniet ex exercitationem
                        laudantium minus <br/>nesciunt odio quos saepe veniam.</p>
                </div>

                <div className="socials">
                    <i className="mdi mdi-facebook" aria-hidden="true"></i>
                    <i className="mdi mdi-twitter"></i>
                    <i className="mdi mdi-instagram"></i>
                    <div className="bar"></div>
                </div>
            </div>
        </div>
    </div>
}

function f() {
    let dots = document.querySelectorAll(".dots span");
    let nav = document.querySelector(".nav-links");
    let navlink = document.querySelectorAll(".nav-link");
    let toggle = document.querySelector("#checkbox");
    let humberger = document.querySelector(".humberger");

//FUNCTION FOR ACTIVE ELEMENT
    const currentActive = (elements: any, activeClass: any) => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].onclick = function () {
                for (let j = 0; j < elements.length; j++) {
                    if (elements[j] != this) {
                        elements[j].classList.remove(activeClass);
                    }
                }
                elements[i].classList.add(activeClass);
            };
        }
    };
    currentActive(dots, "isActive");
    currentActive(navlink, "active-link");
//

///EVENT FOR TOGGLE RESPONSIVE NAV REVEAL
    humberger.addEventListener("click", () => {
        nav.classList.toggle("open");
        humberger.classList.toggle("isClick");
    });
///EVENT FOR CLOSE RESPONSIVE NAV WHEN CLICK OTHER IN DOC
    document.onclick = function (e: any) {
        if (e.target.id !== "nav-links" && e.target.id !== "humberger") {
            nav.classList.remove("open");
            humberger.classList.remove("isClick");
        }
    };
}

export default HomeB
