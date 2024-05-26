import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, useMediaQuery, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LoadingScreen from "../common/LoadingScreen";
import IMenuItem from "../../types/IMenuItem";
import MenuItemsDomain from "../../domain/MenuItems/MenuItemsDomain";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import theme from '../../theme';

const MenuItemsComponent = () => {
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect((): void => {
        const fetchMenuItems = async (): Promise<void> => {
            const menuItemsDomain: MenuItemsDomain = new MenuItemsDomain();
            try {
                const response: IMenuItem[] = await menuItemsDomain.getMenuItems();
                response.sort((a: IMenuItem, b: IMenuItem) => (a.position || 0) - (b.position || 0));
                setMenuItems(response);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
            setIsLoading(false);
        };

        fetchMenuItems();
    }, []);

    const toggleDrawer = (open: boolean) => (): void => {
        setDrawerOpen(open);
    };

    if (isLoading) return <LoadingScreen />;

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#011226', boxShadow: 'none', color: '#fff', transition: 'background-color 0.3s ease', mt: -35 }} >
            <Container>
                <Toolbar disableGutters>
                    <RouterLink to={'/'}>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Przemysław Tarapacki
                        </Typography>
                    </RouterLink>
                    <Box sx={{ flexGrow: 1 }} />
                    {isMobile ? (
                        <>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor='left'
                                open={drawerOpen}
                                onClose={toggleDrawer(false)}
                            >
                                <Box
                                    sx={{ width: 250 }}
                                    role="presentation"
                                    onClick={toggleDrawer(false)}
                                    onKeyDown={toggleDrawer(false)}
                                >
                                    {menuItems.map((item) => (
                                        <Button key={item.id} color="inherit" component={RouterLink} to={item.url || '#'} sx={{ width: '100%' }}>
                                            {item.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Drawer>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {menuItems.map((item) => (
                                <Button key={item.id} color="inherit" component={RouterLink} to={item.url || '#'} sx={{ margin: theme.spacing(1) }}>
                                    {item.name}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default MenuItemsComponent;
