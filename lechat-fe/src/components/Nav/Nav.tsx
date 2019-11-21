import * as React from "react";
import './Nav.sass'

export interface NavProps {
  title: string;
  subtitle: string;
}

const Nav = (props: NavProps) => <nav>
  <div className="brand">
    <span className={'title'}>{props.title}</span>
    <span className={'subtitle'}>{props.subtitle}</span>
  </div>
</nav>

export default Nav;
