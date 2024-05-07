import React, { createContext, ReactNode, Component } from 'react';
import IStyles from "../../Models/IStyles";
import PageDomain from "../../Domain/Page/PageDomain";
import LoadingScreen from "../../Components/LoadingScreen";
import { IGlobalStyles } from "../../Models/IGlobalStyles";
import GlobalStylesDomain from "../../Domain/GlobalStyles/GlobalStylesDomain";

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
    private readonly globalStylesDomain: GlobalStylesDomain;
    private readonly pageId: string | null = localStorage.getItem("pageId");
    constructor(props: StylesProviderProps) {
        super(props);
        this.state = {
            styles: {},
            globalStyles: {},
            isLoading: true,
        };
        this.pageDomain = new PageDomain();
        this.globalStylesDomain = new GlobalStylesDomain();
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
                this.globalStylesDomain.getGlobalStyles()
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
