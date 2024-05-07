import React, { Component } from 'react';
import IMenuItem from "../Models/IMenuItem";
import {
    AppBar,
    Box, Button,
    Container,
    createTheme,
    styled,
    ThemeProvider,
    Toolbar,
} from "@mui/material";
import LoadingScreen from "./LoadingScreen";
import { Link as RouterLink } from 'react-router-dom';
import MenuItemsDomain from "../Domain/MenuItems/MenuItemsDomain";

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
    margin: theme.spacing(1),
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '1rem',
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        textDecoration: 'underline',
        backgroundColor: theme.palette.action.hover,
    },
}));

const theme = createTheme({
    typography: {
        h3: {
            color: '#000',
            textShadow: '0 0 26px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 22px rgba(255, 255, 255, 0.3)',
            fontFamily: 'Poppins, sans-serif',
            filter: 'blur(0.2px)',
            fontSize: '96px',
            fontWeight: 400,
        },
    },
});

const LogoImg = styled('img')({
    width: 60,
    marginLeft: 10,
    marginRight: 'auto',
});

interface MenuItemsComponentState {
    menuItems: IMenuItem[];
    isLoading: boolean;
    isScrolled: boolean;
}

export default class MenuItemsComponent extends Component<{}, MenuItemsComponentState> {
    private menuItemsDomain: MenuItemsDomain;

    constructor(props: {}) {
        super(props);
        this.state = {
            menuItems: [],
            isLoading: false,
            isScrolled: false,
        };
        this.menuItemsDomain = new MenuItemsDomain();
    }

    componentDidMount(): void {
        this.fetchMenuItems();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll);
    }

    private handleScroll = (): void => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        this.setState({ isScrolled: scrollTop > 0 });
    };

    private async fetchMenuItems(): Promise<void> {
        this.setState({ isLoading: true });

        const response: IMenuItem[] = await this.menuItemsDomain.getMenuItems();

        this.setState({ menuItems: response, isLoading: false });
    };

    render() {
        const { menuItems, isScrolled } = this.state;

        if (this.state.isLoading) return <LoadingScreen />;

        return (
            <>
                <AppBar position="sticky" sx={{ bgcolor: isScrolled ? '#011226' : 'transparent', boxShadow: 'none', color: '#fff', transition: 'background-color 0.3s ease', mt: -35 }}>
                    <Container>
                        <Toolbar disableGutters>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <ThemeProvider theme={theme}>
                                    <LogoImg src="https://api.propelascend.pl:8080/uploads/img/2027df5ebf34fe722060d3932067ca952273bb32.png" alt="Logo" />
                                </ThemeProvider>
                                <Box sx={{display: 'flex'}}>
                                    {menuItems.map((item) => (
                                        <StyledButton key={item.id} color="inherit">
                                            <StyledLink to={item.url || '#'} key={item.id}>
                                                {item.name}
                                            </StyledLink>
                                        </StyledButton>
                                    ))}
                                </Box>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </>
        );
    }
}
