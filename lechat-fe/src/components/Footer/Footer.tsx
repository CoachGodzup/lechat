import * as React from "react";
import css from './Footer.module.sass'

export interface FooterProps {
  disclaimer: string;
}

const Footer = (props: FooterProps) => <footer className={css.Footer}><span>{props.disclaimer}</span></footer>

export default Footer;
