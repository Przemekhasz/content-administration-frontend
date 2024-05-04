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
    styles: IStyles | {};
    globalStyles: IGlobalStyles | {};
    isLoading: boolean;
}

export class StylesProvider extends Component<StylesProviderProps, StylesProviderState> {
    private readonly pageDomain: PageDomain;
    private readonly pageId: string | null = localStorage.getItem("pageId");
    constructor(props: StylesProviderProps) {
        super(props);
        this.state = {
            styles: {},
            globalStyles: {},
            isLoading: true,
        };
        this.pageDomain = new PageDomain();
    }

    componentDidMount() {
        this.fetchStyles();
    }

    private async fetchStyles(): Promise<void> {
        const { pageId } = this;
        this.setState({ isLoading: true });
        try {
            const [styles, globalStyles] = await Promise.all([
                this.pageDomain.getPageStyles(pageId),
                this.pageDomain.getGlobalStyles()
            ]);
            this.setState({ styles, globalStyles, isLoading: false });
        } catch (error) {
            console.error(error);
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { isLoading, styles, globalStyles } = this.state;
        const combinedStyles = { ...globalStyles, ...styles };

        if (isLoading) return <LoadingScreen />;

        return (
            <StylesContext.Provider value={combinedStyles}>
                {this.props.children}
            </StylesContext.Provider>
        );
    }
}
