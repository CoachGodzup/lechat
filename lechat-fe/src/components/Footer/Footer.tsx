import * as React from "react";
import './Footer.sass'

export interface FooterProps {
  disclaimer: string;
}

const Footer = (props: FooterProps) => <footer><span>{props.disclaimer}</span></footer>

export default Footer;
