import React, { createContext, ReactNode, Component } from 'react';
import IStyles from "../../../Domain/Page/Dto/IStyles";
import PageDomain from "../../../Domain/Page/PageDomain";
import LoadingScreen from "../components/LoadingScreen";
import { IGlobalStyles } from "../../../Domain/Page/Dto/IGlobalStyles";

export const StylesContext = createContext<IGlobalStyles | IStyles | {}>({});

interface StylesProviderProps {
    children: ReactNode;
}

interface StylesProviderState {
    styles: IGlobalStyles | IStyles | {};
    isLoading: boolean;
}

export class StylesProvider extends Component<StylesProviderProps, StylesProviderState> {
    private readonly pageId: string | null = localStorage.getItem("pageId");
    private readonly pageDomain: PageDomain;

    constructor(props: StylesProviderProps) {
        super(props);
        this.state = {
            styles: {},
            isLoading: true,
        };
        this.pageDomain = new PageDomain();
    }

    componentDidMount() {
        this.fetchStyles(this.pageId);
        this.fetchGlobalStyles();
    }

    private async fetchStyles(pageId: string | null | undefined): Promise<void> {
        try {
            const styles = await this.pageDomain.getPageStyles(pageId);
            this.setState({ styles: styles });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    private async fetchGlobalStyles(): Promise<void> {
        try {
            const globalStyles = await this.pageDomain.getGlobalStyles();
            this.setState({ styles: globalStyles });
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        if (this.state.isLoading) return <LoadingScreen />;

        return (
            <StylesContext.Provider value={this.state.styles}>
                {this.props.children}
            </StylesContext.Provider>
        );
    }
}
