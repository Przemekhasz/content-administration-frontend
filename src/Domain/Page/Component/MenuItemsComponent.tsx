import React, { Component } from 'react';
import { AxiosResponse } from 'axios';
import MenuItemDto from "../Dto/MenuItemDto";
import PageRepository from "../Repository/PageRepository";
import {
    AppBar,
    Box,
    Button,
    Container, createTheme,
    styled,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import LoadingScreen from "../../../Infrastructure/Shared/components/LoadingScreen";


const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    '&:hover': {
        textDecoration: 'underline',
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
    menuItems: MenuItemDto[];
    isLoading: boolean;
    error?: Error;
}

export default class MenuItemsComponent extends Component<{}, MenuItemsComponentState> {
    private pageRepository: PageRepository;

    constructor(props: {}) {
        super(props);
        this.state = {
            menuItems: [],
            isLoading: false,
            error: undefined
        };
        this.pageRepository = new PageRepository();
    }

    componentDidMount() {
        this.fetchMenuItems();
    }

    componentWillUnmount() {
    }

    // todo impl this
    // public handleScroll(): void {
    //     const scrollTop: number = window.scrollY;
    //     this.setState({ scrolled: scrollTop > 100 });
    // }

    fetchMenuItems = async () => {
        this.setState({ isLoading: true });
        try {
            const response: AxiosResponse<MenuItemDto[]> = await this.pageRepository.getPageMenuItems();
            this.setState({ menuItems: response.data, isLoading: false });
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.setState({ menuItems: [], error: error, isLoading: false });
            } else {
                this.setState({ menuItems: [], error: new Error('An unexpected error occurred'), isLoading: false });
            }
        }
    };



    render() {
        const { menuItems, isLoading, error } = this.state;

        if (isLoading) {
            return <LoadingScreen />;
        }

        if (error) {
            return <Typography color="error">Error: {error.message}</Typography>;
        }

        return (
            <>
            {/*{this.state.scrolled ? (*/}

                <AppBar position="sticky" sx={{ bgcolor: 'transparent', boxShadow: 'none', color: '#fff', mt: -35 }}>
                    <Container>
                        <Toolbar disableGutters>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                <ThemeProvider theme={theme}>
                                </ThemeProvider>
                                <Box sx={{ display: 'flex' }}>
                                    {menuItems.map((item) => (
                                        <StyledButton key={item.id} color="inherit">{item.name}</StyledButton>
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
