import IPage from "../Dto/IPage";
import IMenuItem from "../Dto/IMenuItem";
import IProject from "../Dto/IProject";
import IGallery from "../Dto/IGallery";
import IStyles from "../Dto/IStyles";
import {IGlobalStyles} from "../Dto/IGlobalStyles";

export default interface IPageQueryDomain {
    findPages(): Promise<IPage[]>;
    findPageById(id: string | null | undefined): Promise<IPage>;
    getPageMenuItems(): Promise<IMenuItem[]>;
    getPageProjects(id: string | null | undefined ): Promise<IMenuItem[]>
    getProjectById(id: string | null | undefined): Promise<IProject>;
    getPageGalleries(id: string | null | undefined): Promise<IGallery[]>;
    getGalleryById(id: string | null | undefined): Promise<IGallery>;
    getPageStyles(id: string | null | undefined): Promise<IStyles>;
    getGlobalStyles(): Promise<IGlobalStyles>;
}
