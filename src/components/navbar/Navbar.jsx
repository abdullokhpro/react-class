import React, { Component } from "react";
import "./navbar.scss";
import logo from "../../assets/header/logo.png";
import { IoBookSharp } from "react-icons/io5";
import { GiPresent } from "react-icons/gi";
import { FaShoppingCart, FaRegSmileBeam } from "react-icons/fa";

export default class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <nav className="header__nav">
            <div className="header__logo">
              <a href="#">
                <img src={logo} alt="" width={150} />
              </a>
            </div>
            <div className="header__right">
              <IoBookSharp className="header__catalog" />
              <form className="header__form" action="">
                <input className="header__search" type="search" />
                <button className="header__form__btn">Search</button>
              </form>
              <GiPresent className="header__order header__catalog" />
              <FaShoppingCart className="header__cart header__catalog" />
              <FaRegSmileBeam className="header__smile header__catalog" />
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
