import IPage from "../../Models/IPage";
import IMenuItem from "../../Models/IMenuItem";
import IProject from "../../Models/IProject";
import IGallery from "../../Models/IGallery";
import IStyles from "../../Models/IStyles";
import {IGlobalStyles} from "../../Models/IGlobalStyles";
import IBodyText from "../../Models/IBodyText";
import IFooter from "../../Models/IFooter";
import IContact from "../../Models/IContact";

export default interface IPageQueryDomain {
    findPages(): Promise<IPage[]>;
    findPageById(id: string | null | undefined): Promise<IPage>;
    getPageProjects(id: string | null | undefined ): Promise<IMenuItem[]>
    getPageGalleries(id: string | null | undefined): Promise<IGallery[]>;
    getPageStyles(id: string | null | undefined): Promise<IStyles>;
    getPageBodyTexts(id: string | null | undefined): Promise<IBodyText[]>;
}
