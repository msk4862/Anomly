import { Fragment, PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout = (props: PropsWithChildren) => (
  <Fragment>
    <Navbar />
    <main>{props.children}</main>
  </Fragment>
);

export default Layout;
