import React, { Component } from 'react';
import { Grid, Paper, Typography, Chip, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PageDomain from "../PageDomain";
import IProject from "../Dto/IProject";
import IPage from "../Dto/IPage";
import { apiUrl } from "../../../env";
import {StylesContext, StylesProvider} from "../../../Infrastructure/Shared/Providers/StylesProvider";
import {IGlobalStyles} from "../Dto/IGlobalStyles";
import IStyles from "../Dto/IStyles";
import {getDefaultStyles} from "../../../Infrastructure/Shared/DefaultStyles";

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

interface ProjectProps {
    page: IPage;
}

export default class ProjectList extends Component<ProjectProps> {
    private pageDomain: PageDomain;
    private projects: IProject[] | null;

    constructor(props: ProjectProps) {
        super(props);
        this.state = {
            isLoading: false,
            error: undefined
        };
        this.pageDomain = new PageDomain();
        this.projects = null;
    }

    componentDidMount(): void {
        this.fetchProjects();
    }

    private async fetchProjects(): Promise<void> {
        this.setState({ isLoading: true });

        try {
            this.projects = await this.pageDomain.getPageProjects(this.props.page.id);
            this.setState({ isLoading: false });
        } catch (error) {
            this.setState({ isLoading: false });
        }
    };
    render() {
        const { projects } = this;

        return (
            <>
                <StylesProvider>
                    <StylesContext.Consumer>
                        {styles => {
                            const stylesObj = styles as IStyles | IGlobalStyles;
                            const defaultStyles = getDefaultStyles(stylesObj);

                            return (
                                <ThemeProvider theme={theme}>
                                    <Container>
                                        {projects && projects.length > 0 && (
                                            <>
                                                <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '50px' }}>Projekty</Typography>
                                                <Grid container spacing={3}>
                                                    {projects.map((project, index) => (
                                                        <Grid item xs={12} key={index}>
                                                            <Link to={`/project/${project.id}`} style={{ textDecoration: 'none' }}> {/* Dodany Link */}
                                                                <Paper sx={{
                                                                    padding: '20px',
                                                                    borderRadius: '10px',
                                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                                    '&:hover': {
                                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                                                    },
                                                                    backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                    flexDirection: index % 2 === 0 ? 'row-reverse' : 'row',
                                                                    fontFamily: stylesObj?.headingFont
                                                                }}>
                                                                    <div style={{ flex: 1, paddingRight: '20px' }}>
                                                                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                                                                            {project.title}
                                                                        </Typography>
                                                                        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                                                                            {project.mainDescription && (
                                                                                <>
                                                                                    <div dangerouslySetInnerHTML={{ __html: project.mainDescription }} />
                                                                                    {project.mainDescription}
                                                                                </>
                                                                            )}
                                                                        </Typography>
                                                                        <div>
                                                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>Kategorie:</Typography>
                                                                            <div style={{ marginBottom: '10px' }}>
                                                                                {project.categories?.map((category, catIndex) => (
                                                                                    <Chip key={catIndex} label={category.name}
                                                                                          style={{
                                                                                              marginRight: '5px',
                                                                                              marginBottom: '5px',
                                                                                              backgroundColor: stylesObj?.categoriesColor,
                                                                                              color: '#ffffff'
                                                                                          }} />
                                                                                ))}
                                                                            </div>
                                                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>Tagi:</Typography>
                                                                            <div>
                                                                                {project.tags?.map((tag, tagIndex) => (
                                                                                    <Chip key={tagIndex} label={tag.name} style={{
                                                                                        marginRight: '5px',
                                                                                        marginBottom: '5px',
                                                                                        backgroundColor: stylesObj?.tagsColor,
                                                                                        color: '#ffffff'
                                                                                    }} />
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ flex: 1 }}>
                                                                        <img src={apiUrl + '/uploads/img/' + project?.details?.[0]?.imagePath ?? ''}
                                                                             alt={project?.title ?? ''}
                                                                             style={{ width: '100%', maxWidth: '500px' }} />
                                                                    </div>
                                                                </Paper>
                                                            </Link>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </>
                                        )}
                                    </Container>
                                </ThemeProvider>
                            );
                        }}
                    </StylesContext.Consumer>
                </StylesProvider>
            </>
        );
    }
}
