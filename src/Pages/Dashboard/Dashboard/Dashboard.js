import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Nav } from 'react-bootstrap';
import MyOrders from './../MyOrders/MyOrders';
import Review from './../Review/Review';
import ManageAllOrders from './../ManageAllOrders/ManageAllOrders';
import AddProduct from './../AddProduct/AddProduct';
import useAuth from './../../../hooks/useAuth/useAuth';
import Pay from './../Pay/Pay';
import MakeAdmin from './../MakeAdmin/MakeAdmin';
import AdminRoute from './../../Authenticaiton/AdminRoute/AdminRoute';
import ManageProducts from '../ManageProducts/ManageProducts';


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

            <List>

                <Box sx={{ mb: 2 }}>
                    {/* <Typography sx={{ pb: 3, color: 'primary.text' }} variant="h6">Update Profile</Typography> */}
                    {/* <img style={{
                        borderRadius: '50%', width: '100px', height: '100px'
                    }} className="footerImage ms-3 mb-3" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVEhgSEhIVEhISEhERERERERERERERGBUZGhgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhISM0NDQ0NDQ0NDQ0NDQ0MTQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NP/AABEIARMAtwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAIEBQYBBwj/xAA7EAACAQIDBgMGBAUEAwEAAAABAgADEQQSIQUGMUFRYSJxkRMyQoGhsSNSwfAHYnLR4RQVQ4IzkqIk/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACgRAAICAgEDBQABBQAAAAAAAAABAhEDIRIEMUETIjJRcaEjM2GBkf/aAAwDAQACEQMRAD8Ay1PDnrD08Kes4hh0Mdk8AtPDHrCjCmJDDIYWLgBbBm0h4jBGW14vZXjsFApKWzmvJdHZzS5oYaTEw8XIOBRps1ryww2BZTcSwSlJCLHYnjYqbsBGV2cyRkjfZwsPTM9jMOxlW2Ea819ajITYWJsagyqo4drcIx8K3SX6UbCJqMdicGZ8YZukHWwpPKaBqUBUSHIXBmabAnpAPgzbhNC4kepDkPgzMVMOekFkNuEv6tO8F/pu0TZSizM1EPSKX1bB9oorHxY6m0mUhM1Sx0nUcf3gWjR01h0WUCbR7w67THWIZeqkKlOUa7UHWETag6wA0dFZMRZmaW1h1ktNrDrAC+CR6pKNdrDrBNvCEPiIywFRpVSOyTO0d5A3BdOp0kqntxDAdMsqiQDJIdXbKDiwHmbQI2uh4EHyuYBRZhYxhIf+5DrGNtEdYBRKZYGokjttEQT7REAo7VSRaiTtTHiRnxogB0pHokjNjBEMaIASHSKRmxoigBgVvCozTR7N2AHt4SZeU9y78vrJbBGDLv1jDXcc5u8RuflHAzN7U2OaZ7QTG0VIxT9Y4Yt+sNRwmYycmx7jjrDkCi2Vy41+sMuPfrJS7Fe/DSSH2WKYzN6d+UFJMfFrY6i7WBZjqL8ZAeoWbQ6nmfhEkvzIIIKkC3kZWqjXNulvsZZIZsUV0Fz36wabTYH4x/2/Sc9g2oA10UfMD+xkathio4fvqe0AJqYsN1ueJOpPzknA7Qc1MgPh+0pE/dgfvLPBgXFgb9zaAFhX2i6wH+7PJOMp5lDEqGOhAtftKv2JkvQ+5K/3Vpw7SbvAphCYZNnudALwsdDG2i0GdoNLSjuzWcaL6ztbdTEKLlRCySoO0DOHaJncTs90PiW0iGlCwoOdomKRjTihYUz3HdnZoFNTbWwmop4UW4SBsBPw18h9peqsUVaFJ+CoxmFBHCed72YYANpyM9SxImE3woWps3n9jM26ZpFWjBbLog2lulLUCUWFqFbESWMecwlONlRkkaunRULwv0HU9JQ7wsEYKSAfePUX0FpNweOFrsbZdZmMdihWrs2pHfko0AihGnY5yTVEnD4Y1mCoCevMzSYfcsmxvl8xLzczZKrSFQqMza/LlNM9pTkxxijFtuki3sekz+1N2XGi6z0pxItRZHJmihFnj2J3drLqUPkJWjDsrWuUbuCPrPbDRB4iUG8O76upemAGGvnBTfkU8K8GJwFYg5als3AMQDcdjDewF+I/vIlJ1zmm+mtgeQMscNRuwB1tbTt2msnoxjHZZbM2aX5adbTS7O2FZwSPpJm79Fcikdgf7zU0cOJzeo2zolhUY7I2FwAA4QuIwAYcJYIloQidCdo45Rpnnm3d3M4Nh9Jiau7Lgn+09uxFEHlKyrs4HlM5Wno0i1Wzxt93nE7PV6uzB0ik8pF+0stgj8NfIfaXaSn2Gv4a+Ql2gm8exzS7kXEiYjffSgfn9jN/VSYvfmheg3YMfoZnJbNIPR5Ejxy1PFI7qRFSBzTVkousM19OotKnC0T7UryBzue17IssMOSPM/QdYfYmHFSvTpj/AJKhqOeZVZN0jRK2j1Pd9CMOgI+ESW41gq7olPKX9moGuU5WItwB5fKY3HvRJLUMRUpvfRhXqOL9wxIMybS7nQot9jYuRAsLyg2Ji8QzZKhWoOTrpcdxyMstpVXRCVFzyEhyNFFokMs7l0PlMh/qMS7fiYkUVv7tNVLW8zNDslXVb+3auvxK4TOO6lQPQxpp+Qaa7o8p3poha7sulmPDznNnYmpbMpDZeKnj5jrLXf6gExGYe7UUNw0vw1HylHsmpZrc+Q6j8t/tNo7icktSN9u/t0KAKl04WPFeN+I09Zv8Fj0ZQVYEHhYzyilwuvA/ux5GTcJtF6TeH3fiTl5gcphLG7uJ0LKqqR60mIB5x/tRMDQ3mA0a485OTeFDwYesIuS7omUYS2ma9qggWcSqw2KzC/WSWItLUmzFxSCO4ilbXe3CKK2FItNhH8NfIS8SZTdvGhqS68hNJTqibRkqMpR2SHEyW+YvQf8Apb7GaWrXAHGYfe/aIyMoPEEesmTvQ4qtnmFWjcztHDaywRLx+TWWCK7aQKUyw5jJ5d5bfw8S+M1/46J+RJtKvbpuqL+Z/wBJbfw9B/1Tv8JDU79/eH2ky0jXGrZ6DtzY6YlMtQFlBvYOyeuXjMbjNz6YN6a1UI/K9/qTeejodNZExNRVFzM/x0bqnpqyk3W2W9P32ZuQzhQR6Sx2zSLU2C6Mb2MstlOHp51FlJIUn4rG1/W/pG16ZZWIGYi+g59oVcQ5Pl+HmD7AqOTnrOjE8VTQjpob/WWuxd3KlOorjEuU+JCigN6ffWaTCVEcBl58iLEHmCORk0IBJ3XfRek7rf6ed/xLo6o3Zh9pgMNUs3l9p6J/EWoCEQ8Tm/T+080Da+RI+U0g7Rz5lUrNvsmqHUjqL+TD9iHq1hYeUoNh4mzr/Np8+UtMepy3HDWaIzb1YapilMhPUF9Dz6ysFUzjVjCiLPZdk29mlvyr9pchARPPd3dug0wpOoFppG22FW+YcJnFFSfkl4lIpl8TvAW5jjFNOJnzIGwttGj4T7v2mnTe1AOMwccrw9NNhzaNnjN6iwsotM1i67ObsYBTCqkqMEiXNs5TpwhpdoVKckJTlcSebMvvH4cnm/2Em7i7URKopOCGqVFKNyzZSCp9YDe1PCh5hz6W/wAzMYauyFXT36bq6+akEfUTKavR1YpUrPoCrWsLzN4vGmrUNMMFRf8AyMxCqB0uZY4bFrWopUTVXQOPmOEyG1NmsrnE+z9rTWplemWIUgHj20vr1AnK7cqPQxJdzaJXphVyYhRk91UqJlbsQdDEmKa4/EysL+G9PW/XmZWYF9mVkGemKBFlK1aa0yLqTcuNOmt+nWBxeC2VTUOaivbIfAz1L5nAsAt+V/WU4sali83/AMOszUapvfLUN78sxMuqeIzCYDCU/a1r4c1UwqMt85NnblZTw1+enebSl4R2Ezdp0OSTMZ/EKuqsDcZvZ2UX1uWOtp51R4285f74Y8VsW5BuqL7JTfS66k/+xI+UoV4+hnVBVE8/NLlL8LPCgixHX0PKaQvnpgjpr2MzmGcHyOh7HkZe7Ie5NNuOvrzlLuQ17SE+FME2GmnbA9pHqYHtNaOZyM6oZTdSQe0JWxtUixc2lo+D7SNUwvaHEORVHEuD705JNbDRQoLLQPDUlnKNGTqOHiKOU0kqnThaVCTKdGOxUBSnDhJJSlC+y0hYcTJ7Xo+0zFvdVQB66/vtMRSNjfiODTcbyPkpuBz1btrwmIJyugI94eIf1Hh6TN7N46Nz/D3a2UthKhuur0T2PvJ+vrPRqGEUo6MLq5N/nz854/uZTJxqKNbCoRfoFtbtPU9l7TFzSqeFvhzaH/PmJhJJSOuDfHXgpcZhMTRJRKa1aVzlUrTdeN75W1U9gbSEmFxFZshoph0J8TLTp0yPJjduXwzcVlUwApKDJbZ1rqE1uKv7oi0dnJTppTpiyobk82bmZl99NuDD0yiH8WoCEt8I5v8A27zSbS2jbwU9W4FuQ/zPLt+EPtEYkliGuTFCpTowyNqDfkygQnXjzPWJH1hXXwhvzaSKNDY9Z1nnFhQqAG3XSW+BYuwVWy1NQp4eNdR6i4+coGH1+4krZtUioCeR+vCKikzfbG2mH/DqDJUUlSOF26W5GW74cHlMlUUm1VWzFVu9/eZBrqeZA1B7eU1+zKuemCTqPCfMS4yM5x8kKrhu0hVcNL2rTkKtTlWZcTP18NFLCtTnYrHQKgksKKSLQEsaIhQ7DU6clIkZTWSkWAHUSFancEXtcWuOIjlWPZlUXYhQOZNohq26Rj95tl1SEVaZampLH2YuS3It1mfbC0yjK4IqAhgSniBHwnpNptbeVEGWnYt+ZuHyHOYPF4xmcte+Y6t1iao9GHR5KUpKl/JZ7mZaeNRnOjhkBPItw9SJ6JjcGGOqg+YBnkyNe7dxltyA4Wmw2LvkLCnir3WwWqBe4/nH6znyQb2d0ulcIqUdlzifaJ7jEAcjqJGTFVmPia/kLS2/1aVVzKyup+JSCJHZlHCc0rTIXbaI2SwvMJvqLlT0Npu8XikRCzsF05meabw4721S49xdF795phi+VmeVco0UAF9L6fYxZdQOk6vGxF/pC1EHTj3vOw8xqiftjAGmV6PTV19LMPUfWRVsgRr3zrduxzEW+ktsTtdK+GSmwy1qJAVvzpaxF/Q27Soane3QG+nIwBGiwNcimSdQadQf/JH6zUbvXaiHU68xyYTL7IqJkanUOXMrIrHgt+F/rLrZeN9hanUGQNoj/wDG9+jcL9okVI0uYMtxzkSssLRf3rcLhh8x/iDrSzFldWE5HVhOwEMoCWNASBQEsaIjsVEumJ3GY1KKe0qXtcAAC5J7CBxGJWmhduXAdT0mL2vtFql7nTkOQ8oJHf0nRSzXKWor+fwvq++QAPs6RvyLkW9BM7tHblaqfE9hyVdBKtjGKY7SPVx4ceL4qn9+Q2bqbxEaW5E38oNYdRF3OlRUlTOKbC0G5hiINhE0XJOqG0q7obo7Kf5WIh22vXIt7V/WRisaVkOKfdHPKFnKtZ295mbzJMjOJIKwbLCjGUNEOpT5iCdWPO9uXOTWWCNOM4cuC+xDubj96SXSqd9fvBvSMEQR++EDjlCUXTLbDVRfxDTr0mjwCh0yKTlbRkPiQ8jYHgfKY2nWI4iX+7+PFNxfVSQdeXeA1FydGl3ersM9GobmmxQMeYXUfOxltWlLsJw5qPzNeo3ca2H0Aly76RoxmqZBrTsbXM7GQKhLCjKyi8me2CqWPBVJ9BApK3SKLePH5qnswfDT0825zP1HnMRiCzMx4sxPqYAtHZ9LCShjUF4HXnQI1Y9RJHHY9YVTBCPBjOiGh5jDO3nDAcmNtGkR84YENDCs5lj4oieKBFIwpDmNIgRKCAFIJqMlkRpERjLFGS2QTQhkv6QjGIGBh6MbNNu7gkqqwzOlVfEHRipI79Zb4Z3RzSqHM1s1N+GdeBv3GnrM5u7isldDyY5D5H/NpqNtLYLUHGnUDf8AQ+Fh6H6RnF1eJQkq7NA64nZys05GcJHotObXrZcO/cBfUzlEyNvC/wCB5usDXAryL9MoxiWNJiBiPZ5bDgwoGkihtR3EmKNIjqxPlZydBjYrxmlj7xGNijKs7OmcvFADkUU5ESKciJnLwJbOxrxyxtTn2BMQpfGwDcY0GInjG3gcbeyTQqEEEcQQR5zf1znpf1oPqJ50pm72dUvQT+gCNHL1u4J/TFUvYX4xRtVp2M8sj0mkLeNvwR/WPtD0mkDeJ/Ao/m/SBtg/uIz15wmK8Yxks9RypD6LeLvwEs+AlPRPjHmJaloI6Ojl7X+iM5eImNvKOlscDO3jLzt4ApDrzt4y8V4h8hxMaTETOEwE2K8V5y8aTAzcggM5U4fIiNBixBshMQ3L2t/RBVo8GR0MKDEebGdoKpm02W//AOdP6ZiUM2Gyn/ATyMpGXVO8a/Q9VooKq0UZ5wCm0r94D4U8z9pNQyDt73FPRv0gbYXU0Ud4xzFeMYyTulLQ/C++PnLLNKvDHxj5/aWBaCOjpJVF/o8mcvB5os0Z0OYS87eCDTt4ApBLxRl4rwK5DyZyNvOFoA5HSZy8becvEZuQRY3FnwHzH3iBjMY3gt1IgKcv6b/CCsKpgFhAYHnRlQZTNXs82oJ5XmSXX56TYomVFXooH0jRHUS9qQOq87B1IoziGI0ibaf8MD+YQytIe2D4F84GmH5IpyYMmOMGxknXKR1GsQehk4vK6WuJp2RGGmdASO/WBeCdWgWeczQRaczQNvUDZp3PAZp3NFYeoHzzuaR80WaFleoSM8aXgc0WaFieQLmizQWaINCxcw6tAY1+A6amEWQ6zXYnvGTnm1CvsSx4g1MesDmiyw2VRzVFHIHMfITUuZTbAo2Vqh5+EfrLN3jMc0rdfQ14oNmijMSOkibWPgHnDo0jbU1TyMReP5Ipi0aTEY2I2kxyLcgcbkCaDbFgKa2tlTX5yDsbCFqgY6Aayw3gqeNR0XWBWJ+9FM6QZhgYiOo9IHTKKe0BihLCcgRQy8V468UQV/kbFHTtowpjQI9UiAjgYFxS8hRYceErmk2ofCZAJgZdTLaQ4GEWCElYOnmdR1P0gZRZpNnpkpKDxIufnCs0YWjGaM55O3YmaKCZooEglMk0qatdWFx0kNWknDta8mXYrH8kDr4CkPhlZiQo90ASzxLylxT6yI2zqk0kWexqwBLNwVbyHi62Z2bqdPKAw9WyMPzWHynDNB4lqxExX6Rt5y8DRyHEznyjbxXgLkPBEV428UB2dv5zt428V4BY686DGR14AmczXBHPWRYc+9CKgbjFdGM7l/ojCWux6epfkBb5wC4Ak+Ej5y4oUgihRy49zGnZlJ8VQYtBs0TNBs0ZiNZooNjFADiSTR5xRSZdiofJEfEynxHGKKTE3n2O0+EUUUs2j8UcM5FFATFFFFAQooooAKKKKAHROxRQKQznD4eciil2ILfCSQ0UUI9jny9wTQbRRSjMG0UUUAP/2Q==" alt="" />

                    <input type="file" /> */}
                </Box>
                <Divider />
                <Nav.Link as={Link} to='/home'>Home</Nav.Link>
                <Nav.Link as={Link} to={`${url}`}>My Orders</Nav.Link>
                <Nav.Link as={Link} to={`${url}/review`}>Review</Nav.Link>

                {isAdmin && <Box>
                    <Nav.Link as={Link} to={`${url}/ManageAllOrders`}> Manage All Orders</Nav.Link>
                    <Nav.Link as={Link} to={`${url}/ManageProducts`}> Manage Products</Nav.Link>
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
                    <AdminRoute exact path={`${path}/ManageProducts`}>
                        <ManageProducts />
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
