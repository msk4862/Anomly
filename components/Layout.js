import Navbar from '../components/Navbar'

const Layout = (props) => (
    <React.Fragment>
        <Navbar />
        <main>{props.children}</main>
    </React.Fragment>
)

export default Layout
