import React, { Component } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import IBodyText from "../../types/IBodyText";
import IPage from "../../types/IPage";
import PageDomain from "../../domain/Page/PageDomain";
import DOMPurify from "dompurify";
import { motion } from 'framer-motion';

type BodyTextProps = {
    page: IPage;
};

interface BodyTextComponentState {
    bodyTexts: IBodyText[];
    isLoading: boolean;
}

export class BodyTextComponent extends Component<BodyTextProps, BodyTextComponentState> {
    private pageDomain: PageDomain;

    constructor(props: BodyTextProps) {
        super(props);
        this.state = {
            bodyTexts: [],
            isLoading: false
        };
        this.pageDomain = new PageDomain();
    }

    componentDidMount(): void {
        this.fetchBodyTexts();
    }

    private async fetchBodyTexts(): Promise<void> {
        this.setState({ isLoading: true });

        const res: IBodyText[] = await this.pageDomain.getPageBodyTexts(this.props.page.id);

        this.setState({ bodyTexts: res, isLoading: false })
    }

    render() {
        return (
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Grid container spacing={4}>
                    {this.state.bodyTexts.map((bt, index) => (
                        <Grid item xs={12} key={bt.id}>
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2 }}>
                                <Paper elevation={3}>
                                    <Box p={4}>
                                        <Typography variant="h4" color="primary" gutterBottom>
                                            {bt.heading}
                                        </Typography>
                                        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(bt.body || '') }} />
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
