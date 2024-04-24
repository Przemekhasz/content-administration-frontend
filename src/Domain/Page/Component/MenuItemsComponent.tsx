import React, { Component } from 'react';
import IMenuItem from "../Dto/IMenuItem";
import {
    AppBar,
    Box,
    Button,
    Container,
    createTheme,
    styled,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import PageDomain from "../PageDomain";

const StyledLink = styled(RouterLink)(({ theme }) => ({
    margin: theme.spacing(1),
    textDecoration: 'none',
    color: 'inherit',
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily,
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

interface MenuItemsComponentState {
    menuItems: IMenuItem[];
    isLoading: boolean;
}

export default class MenuItemsComponent extends Component<{}, MenuItemsComponentState> {
    private pageDomain: PageDomain;

    constructor(props: {}) {
        super(props);
        this.state = {
            menuItems: [],
            isLoading: false,
        };
        this.pageDomain = new PageDomain();
    }

    componentDidMount(): void {
        this.fetchMenuItems();
    }

    private async fetchMenuItems(): Promise<void> {
        this.setState({ isLoading: true });

        const response: IMenuItem[] = await this.pageDomain.getPageMenuItems();

        this.setState({ menuItems: response, isLoading: false });
    };

    render() {
        const { menuItems, isLoading } = this.state;

        return (
            <AppBar position="sticky" sx={{ bgcolor: 'transparent', boxShadow: 'none', color: '#fff', mt: -35 }}>
                <Container>
                    <Toolbar disableGutters>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <ThemeProvider theme={theme}>
                                <Box sx={{ display: 'flex' }}>
                                    {menuItems.map((item) => (
                                        <StyledLink to={item.url || '#'} key={item.id}>
                                            {item.name}
                                        </StyledLink>
                                    ))}
                                </Box>
                            </ThemeProvider>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}
