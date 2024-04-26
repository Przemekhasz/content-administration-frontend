import React, { createContext, ReactNode, Component } from 'react';
import IStyles from "../../../Domain/Page/Dto/IStyles";
import PageDomain from "../../../Domain/Page/PageDomain";
import LoadingScreen from "../components/LoadingScreen";

export const StylesContext = createContext<IStyles | undefined>(undefined);

interface StylesProviderProps {
    children: ReactNode,
}

interface StylesProviderState{
    styles: IStyles,
    isLoading: boolean;
}

export class StylesProvider extends Component<StylesProviderProps, StylesProviderState> {
    private readonly pageDomain: PageDomain;

    constructor(props: StylesProviderProps) {
        super(props);
        this.state = {
            styles: {} as IStyles,
            isLoading: false,
        }
        this.pageDomain = new PageDomain();
    }

    componentDidMount() {
        this.fetchStyles(localStorage.getItem("pageId"));
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

    render() {
        if (this.state.isLoading) return <LoadingScreen />
        return (
            <>
                <StylesContext.Provider value={this.state.styles}>
                    {this.props.children}
                </StylesContext.Provider>
            </>
        );
    }
}
