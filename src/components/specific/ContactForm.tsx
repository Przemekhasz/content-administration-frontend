import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Snackbar, Alert, Tooltip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import IContact from "../../types/IContact";
import ContactDomain from "../../domain/Contact/ContactDomain";
import theme from '../../theme';
import { motion } from 'framer-motion';

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

const ContactForm: React.FC = () => {
    const [state, setState] = useState<ContactFormState>({
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
    });

    const contactDomain = new ContactDomain();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const { formData } = state;
        const errors = validateForm(formData);

        if (Object.values(errors).some(error => error !== '')) {
            setState(prevState => ({ ...prevState, errors }));
            return;
        }

        try {
            await contactDomain.postContact(formData);
            clearForm();
            setState(prevState => ({
                ...prevState,
                snackbarOpen: true,
                snackbarMessage: 'Form submission successful!',
                snackbarSeverity: 'success'
            }));
        } catch (error) {
            console.error('Error occurred while submitting form:', error);
            setState(prevState => ({
                ...prevState,
                snackbarOpen: true,
                snackbarMessage: 'Failed to submit form.',
                snackbarSeverity: 'error'
            }));
        }
    }

    const validateForm = (formData: IContact) => {
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

    const clearForm = (): void => {
        setState({
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
        });
    }

    const handleCloseSnackbar = () => {
        setState(prevState => ({ ...prevState, snackbarOpen: false }));
    };

    const { formData, errors, snackbarOpen, snackbarMessage, snackbarSeverity } = state;

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 2 }} color={'#ff5252'}>
                                Contact
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Tooltip title="Enter your email" arrow>
                                <TextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Tooltip title="Enter the topic" arrow>
                                <TextField
                                    fullWidth
                                    name="topic"
                                    label="Topic"
                                    variant="outlined"
                                    value={formData.topic}
                                    onChange={handleChange}
                                    error={!!errors.topic}
                                    helperText={errors.topic}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <Tooltip title="Enter your message content" arrow>
                                <TextField
                                    fullWidth
                                    name="content"
                                    label="Content"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={formData.content}
                                    onChange={handleChange}
                                    error={!!errors.content}
                                    helperText={errors.content}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, fontSize: '1.1rem' }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </motion.form>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}

export default ContactForm;
