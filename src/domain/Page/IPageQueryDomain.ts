import IPage from "../../types/IPage";
import IMenuItem from "../../types/IMenuItem";
import IProject from "../../types/IProject";
import IGallery from "../../types/IGallery";
import IStyles from "../../types/IStyles";
import {IGlobalStyles} from "../../types/IGlobalStyles";
import IBodyText from "../../types/IBodyText";
import IFooter from "../../types/IFooter";
import IContact from "../../types/IContact";

export default interface IPageQueryDomain {
    findPages(): Promise<IPage[]>;
    findPageById(id: string | null | undefined): Promise<IPage>;
    getPageProjects(id: string | null | undefined ): Promise<IMenuItem[]>
    getPageGalleries(id: string | null | undefined): Promise<IGallery[]>;
    getPageStyles(id: string | null | undefined): Promise<IStyles>;
    getPageBodyTexts(id: string | null | undefined): Promise<IBodyText[]>;
}
