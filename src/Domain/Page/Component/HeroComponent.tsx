import React, { Component } from 'react';
import {Box, IconButton, Theme} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import LoadingScreen from "../../../Infrastructure/Shared/components/LoadingScreen";
import PageDto from "../Dto/PageDto";
import PageRepository from "../Repository/PageRepository";

interface HeroSectionState {
    loading: boolean;
    data: PageDto | null;
}

export default class HeroComponent extends Component<{}, HeroSectionState> {
    private pageRepository: PageRepository;

    constructor(props: {}) {
        super(props);
        this.state = {
            loading: true,
            data: null
        };
        this.pageRepository = new PageRepository();
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            // TODO add to props
            const pageId = "0c57446c-1ad3-499b-9c88-8ea2983f01b7";
            const pageResponse = await this.pageRepository.getPageById(pageId);
            this.setState({ data: pageResponse.data, loading: false });
        } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { loading, data } = this.state;

        if (loading) {
            return <LoadingScreen />;
        }
        console.log(data)
        return (
            <Box sx={{
                    position: 'relative',
                    color: 'white',
                    p: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundImage: `url(${data && data.banner && data.banner.image ? `https://localhost:8080/${data.banner.image}` : ''})`,
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'cover',
                        zIndex: -1,
                    }
                }}
            >
                <IconButton
                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                    sx={{
                        position: 'absolute',
                        bottom: 4,
                        color: 'white',
                        fontSize: '2rem',
                        mb: 6,
                    }}
                >

                    <KeyboardArrowDown />
                </IconButton>
            </Box>
        );
    }
}
