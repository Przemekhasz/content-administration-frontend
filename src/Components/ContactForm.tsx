import React, { Component, ChangeEvent, FormEvent } from 'react';
import {TextField, Button, Grid, Typography, Container} from '@mui/material';
import IContact from "../Models/IContact";
import ContactDomain from "../Domain/Contact/ContactDomain";

interface ContactFormState {
    formData: IContact;
    errors: {
        email: string;
        topic: string;
        content: string;
    };
}

export class ContactForm extends Component<{}, ContactFormState> {
    private readonly contactDomain: ContactDomain;

    constructor(props: {}) {
        super(props);
        this.state = {
            formData: {
                email: '',
                topic: '',
                content: '',
            },
            errors: {
                email: '',
                topic: '',
                content: '',
            }
        };
        this.contactDomain = new ContactDomain();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const { name, value } = event.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: ''
            }
        }));
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const { formData } = this.state;
        const errors = this.validateForm(formData);

        if (Object.values(errors).some(error => error !== '')) {
            this.setState({ errors });
            return;
        }

        try {
            this.contactDomain.postContact(formData);
            this.clearForm();
        } catch (error) {
            console.error('Error occurred while submitting form:', error);
        }
    }

    private validateForm(formData: IContact) {
        const errors = {
            email: '',
            topic: '',
            content: ''
        };

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.topic) {
            errors.topic = 'Topic is required';
        }

        if (!formData.content) {
            errors.content = 'Content is required';
        }

        return errors;
    }

    private clearForm(): void {
        this.setState({
            formData: {
                email: '',
                topic: '',
                content: '',
            },
            errors: {
                email: '',
                topic: '',
                content: '',
            }
        });
    }

    render() {
        const { formData, errors } = this.state;

        return (
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                            Kontakt
                        </Typography>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                variant="outlined"
                                value={formData.email}
                                onChange={this.handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="topic"
                                label="Topic"
                                variant="outlined"
                                value={formData.topic}
                                onChange={this.handleChange}
                                error={!!errors.topic}
                                helperText={errors.topic}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="content"
                                label="Content"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={formData.content}
                                onChange={this.handleChange}
                                error={!!errors.content}
                                helperText={errors.content}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}
