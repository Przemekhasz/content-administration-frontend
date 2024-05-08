import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, styled, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LoadingScreen from "./LoadingScreen";
import IMenuItem from "../Models/IMenuItem";
import MenuItemsDomain from "../Domain/MenuItems/MenuItemsDomain";
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#011226',
        },
    },
});

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const StyledLink = styled(RouterLink)<RouterLinkProps>(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '1rem',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
    '&:hover': {
        textDecoration: 'underline',
        backgroundColor: theme.palette.action.hover,
    },
}));

const LogoImg = styled('img')({
    width: 60,
    marginLeft: 10,
    marginRight: 'auto',
});

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
        <ThemeProvider theme={theme}>
            <AppBar position="sticky" sx={{ bgColor: '#011226', boxShadow: 'none', color: '#fff', transition: 'background-color 0.3s ease', mt: -35 }}>
                <Container>
                    <Toolbar disableGutters>
                        {isMobile ? (
                            <>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
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
                                            <StyledButton key={item.id} color="inherit">
                                                <StyledLink to={item.url || '#'}>
                                                    {item.name}
                                                </StyledLink>
                                            </StyledButton>
                                        ))}
                                    </Box>
                                </Drawer>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <StyledLink to={'/'}>
                                    <LogoImg src="https://api.propelascend.pl:8080/uploads/img/2027df5ebf34fe722060d3932067ca952273bb32.png" alt="Logo" />
                                </StyledLink>
                                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    {menuItems.map((item) => (
                                        <StyledButton key={item.id} color="inherit">
                                            <StyledLink to={item.url || '#'}>
                                                {item.name}
                                            </StyledLink>
                                        </StyledButton>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default MenuItemsComponent;
