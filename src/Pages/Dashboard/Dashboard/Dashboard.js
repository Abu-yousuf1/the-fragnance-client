import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import { Nav } from 'react-bootstrap';
import MyOrders from './../MyOrders/MyOrders';
import Review from './../Review/Review';
import ManageAllOrders from './../ManageAllOrders/ManageAllOrders';
import AddProduct from './../AddProduct/AddProduct';
import DashboardMain from './../DashboardMain/DashboardMain';
import useAuth from './../../../hooks/useAuth/useAuth';
import Pay from './../Pay/Pay';
import MakeAdmin from './../MakeAdmin/MakeAdmin';
import AdminRoute from './../../Authenticaiton/AdminRoute/AdminRoute';


const drawerWidth = 240;

function Dashboard(props) {
    const { logout, isAdmin } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Nav.Link as={Link} to='/home'>Home</Nav.Link>
                {/* <Nav.Link as={Link} to={`${url}`}>Dashboard</Nav.Link> */}
                <Nav.Link as={Link} to={`${url}`}>My Orders</Nav.Link>
                <Nav.Link as={Link} to={`${url}/review`}>Review</Nav.Link>

                {isAdmin && <Box>
                    <Nav.Link as={Link} to={`${url}/ManageAllOrders`}> Manage All Orders</Nav.Link>
                    <Nav.Link as={Link} to={`${url}/addProduct`}>Add Product</Nav.Link>
                    <Nav.Link as={Link} to={`${url}/makeAdmin`}>Make Admin</Nav.Link>
                </Box>
                }

                <Nav.Link as={Link} to={`${url}/Pay`}>Pay</Nav.Link>
                <Nav.Link onClick={logout}>Log Out</Nav.Link>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}

                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <Route exact path={path}>
                        <MyOrders />
                    </Route>
                    <Route exact path={`${path}/review`}>
                        <Review />
                    </Route>
                    <AdminRoute exact path={`${path}/ManageAllOrders`}>
                        <ManageAllOrders />
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/addProduct`}>
                        <AddProduct />
                    </AdminRoute>
                    <AdminRoute exact path={`${path}/makeAdmin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <Route exact path={`${path}/pay`}>
                        <Pay />
                    </Route>

                </Switch>

            </Box>
        </Box>
    );
}



export default Dashboard;
