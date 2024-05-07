import {IGlobalStyles} from "../../Models/IGlobalStyles";
import IStyles from "../../Models/IStyles";


export default class DefaultStyles implements IGlobalStyles, IStyles {
    id: string = '';
    name: string  = '';
    primaryColor: string  = '#000000';
    secondaryColor: string  = '#ffffff';
    backgroundColor: string  = '#ad2c2c';
    categoriesBackgroundColor: string  = '#000000';
    tagsBackgroundColor: string  = '#000000';
    categoriesColor: string  = '#bb1212';
    tagsColor: string  = '#c02525';
    textColor: string  = '#000000';
    bannerTextBold: boolean = false;
    bannerTextShadow: boolean = false;
    bannerTextAnimation: boolean = false;
    bannerTextFontFamily: string  = 'Arial, sans-serif';
    bannerTextShadowColor: string  = '#cb3434';
    linkColor: string  = '#0000ff';
    hoverColor: string  = '#ff0000';
    headingFont: string  = 'Arial, sans-serif';
    bodyFont: string  = 'Arial, sans-serif';
}

export function getDefaultStyles(styles?: IGlobalStyles | IStyles): IGlobalStyles | IStyles {
    const defaultStyles: DefaultStyles = new DefaultStyles();
    return { ...defaultStyles, ...styles };
}
