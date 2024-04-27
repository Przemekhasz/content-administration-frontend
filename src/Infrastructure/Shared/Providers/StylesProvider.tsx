import React, { createContext, ReactNode, Component } from 'react';
import IStyles from "../../../Domain/Page/Dto/IStyles";
import PageDomain from "../../../Domain/Page/PageDomain";
import LoadingScreen from "../components/LoadingScreen";
import {IGlobalStyles} from "../../../Domain/Page/Dto/IGlobalStyles";

export const StylesContext = createContext<IStyles | IGlobalStyles | undefined>(undefined);

interface StylesProviderProps {
    children: ReactNode,
}

interface StylesProviderState{
    styles: IStyles | IGlobalStyles,
    isLoading: boolean;
}

export class StylesProvider extends Component<StylesProviderProps, StylesProviderState> {
    private readonly pageId: string | null = localStorage.getItem("pageId");
    private readonly pageDomain: PageDomain;

    constructor(props: StylesProviderProps) {
        super(props);
        this.state = {
            styles: {} as IStyles | IGlobalStyles,
            isLoading: false,
        }
        this.pageDomain = new PageDomain();
    }

    componentDidMount() {
        this.fetchStyles(this.pageId);
        this.fetchGlobalStyles();
    }

    private async fetchStyles(pageId: string | null | undefined): Promise<void> {
        try {
            this.setState({ isLoading: true })
            const styles = await this.pageDomain.getPageStyles(pageId);
            this.setState({ styles: styles, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    };

    private async fetchGlobalStyles(): Promise<void> {
        try {
            this.setState({ isLoading: true })

            const globalStyles = await this.pageDomain.getGlobalStyles();

            this.setState({ styles: globalStyles, isLoading: false })
        } catch (error) {
            console.log(error);
        }
    };

    private stylesObj: IStyles | IGlobalStyles = {
        ...this.state.styles,
    };

    render() {
        if (this.state.isLoading) return <LoadingScreen />
        return (
            <>
                <StylesContext.Provider value={this.stylesObj}>
                    {this.props.children}
                </StylesContext.Provider>
            </>
        );
    }
}
