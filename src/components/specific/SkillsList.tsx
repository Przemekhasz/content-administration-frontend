import React, { Component } from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    createTheme,
    ThemeProvider,
    Container
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const theme = createTheme({
    palette: {
        primary: {
            main: '#011226',
        },
        secondary: {
            main: '#ff5252',
        },
        background: {
            default: '#f4f6f8',
        },
    },
});

const categories = {
    "Backend Development": ["PHP", "Symfony", "Laravel", "PostgreSQL/MySQL", "MongoDB", "CQRS", "RabbitMQ", "Redis"],
    "DevOps": ["Bash", "CI/CD", "Kubernetes", "Docker", "Linux", "Elasticsearch", "Google Cloud"],
    "Frontend Development": ["JavaScript/TypeScript", "React"],
    "Tools": ["Git", "Jira", "Slack", "Wireshark", "Nmap", "Java", "Office 365"]
};

interface SkillsCardProps {
    category: string;
    skills: string[];
}

class SkillsList extends Component<SkillsCardProps> {
    render() {
        const { category, skills } = this.props;
        return (
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" color="primary">
                        {category}
                    </Typography>
                    <List>
                        {skills.map((skill, index) => (
                            <ListItem key={index} sx={{ padding: 0 }}>
                                <ListItemIcon>
                                    <StarIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary={skill} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export class SkillsCard extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Box sx={{ padding: 2, backgroundColor: theme.palette.background.default }}>
                        <Typography variant="h4" color="secondary" gutterBottom>
                            My Skills
                        </Typography>
                        {Object.entries(categories).map(([category, skills]) => (
                            <SkillsList key={category} category={category} skills={skills} />
                        ))}
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}

export default SkillsCard;
