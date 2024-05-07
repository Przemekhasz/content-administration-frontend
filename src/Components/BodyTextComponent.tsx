import React from 'react';
import {Container, Grid, Paper, Typography} from '@mui/material';
import IBodyText from "../Models/IBodyText";
import IPage from "../Models/IPage";
import PageDomain from "../Domain/Page/PageDomain";
import DOMPurify from "dompurify";

type BodyTextProps = {
    page: IPage;
};

interface BodyTextComponentState {
    bodyTexts: IBodyText[];
    isLoading: boolean;
}

export class BodyTextComponent extends React.Component<BodyTextProps, BodyTextComponentState> {
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
            <Container maxWidth="md">
                <Grid container spacing={2} justifyContent="center" style={{ padding: 20 }}>
                    {this.state.bodyTexts.map((bt) => (
                        <Grid item xs={12} sm={6} md={12} key={bt.id}>
                            <Paper style={{ padding: 20 }}>
                                <Typography variant="h5" component="h2">
                                    {bt.heading}
                                </Typography>

                                <Typography variant="body1" gutterBottom>
                                    <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}
                                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bt.body || '')}}/>
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
