import React, { Component } from 'react';
import { Typography, Container } from '@mui/material';

type Props = {};

type State = {};

export default class PrivatePageNotification extends Component<Props, State> {
    render() {
        return (
            <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
                <Typography variant="h5" component="h2">
                    This Page is Private
                </Typography>
                <Typography variant="subtitle1">
                    You do not have access to view this page.
                </Typography>
            </Container>
        );
    }
}
