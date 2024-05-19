import React, { Component, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Container, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IContact from "../../types/IContact";
import ContactDomain from "../../domain/Contact/ContactDomain";

const theme = createTheme({
    palette: {
        primary: {
            main: '#011226',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: '10px 20px',
                    fontSize: '1rem',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#011226',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#011226',
                    },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#011226',
                        },
                    },
                }
            }
        }
    }
});

interface ContactFormState {
    formData: IContact;
    errors: {
        email: string;
        topic: string;
        content: string;
    };
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarSeverity: 'success' | 'error';
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
            },
            snackbarOpen: false,
            snackbarMessage: '',
            snackbarSeverity: 'success'
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

    private async handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const { formData } = this.state;
        const errors = this.validateForm(formData);

        if (Object.values(errors).some(error => error !== '')) {
            this.setState({ errors });
            return;
        }

        try {
            await this.contactDomain.postContact(formData);
            this.clearForm();
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Form submission successful!',
                snackbarSeverity: 'success'
            });
        } catch (error) {
            console.error('Error occurred while submitting form:', error);
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Failed to submit form.',
                snackbarSeverity: 'error'
            });
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
        } else if (formData.topic.length > 255) {
            errors.topic = 'Topic cannot exceed 255 characters';
        }

        if (!formData.content) {
            errors.content = 'Content is required';
        } else if (formData.content.length > 255) {
            errors.content = 'Content cannot exceed 255 characters';
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

    private handleCloseSnackbar = () => {
        this.setState({
            snackbarOpen: false
        });
    };

    render() {
        const { formData, errors, snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#ff5252'}>
                                    Contact
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
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
                                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontSize: '1.1rem' }}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
                        <Alert onClose={this.handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </ThemeProvider>
        );
    }
}
