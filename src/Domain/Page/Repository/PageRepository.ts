import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import IPage from "../Dto/IPage";
import IMenuItem from "../Dto/IMenuItem";
import Collection from "../../../Infrastructure/Shared/Interface/Collection";
import IProject from "../Dto/IProject";
import IGallery from "../Dto/IGallery";
import IStyles from "../Dto/IStyles";
import {IGlobalStyles} from "../Dto/IGlobalStyles";
import IBodyText from "../Dto/IBodyText";
import IFooter from "../Dto/IFooter";

export default class PageRepository extends RepositoryManager {
    public async getPages(): Promise<IPage[]> {
        return await this.get<IPage[]>('/api/pages').then(res  => {
            return res.data
        });
    }

    public async getPageById(id: string | null | undefined): Promise<IPage> {
        return await this.get<IPage>(`/api/page/${id}`).then(res  => {
            return res.data
        });
    }

    public async getFooter(): Promise<IFooter> {
        return await this.get<IFooter>(`/api/footer`).then(res  => {
            return res.data
        });
    }

    public async getPageMenuItems(): Promise<IMenuItem[]> {
        return await this.get<IMenuItem[]>('/api/menu-items').then(res  => {
            return res.data
        });
    }

    public async getPageGalleries(id: string | null | undefined): Promise<IGallery[]> {
        return await this.get<IGallery[]>(`/api/page/${id}/galleries`).then(res  => {
            return res.data
        });
    }

    public async getPageBodyTexts(id: string | null | undefined): Promise<IBodyText[]> {
        return await this.get<IBodyText[]>(`/api/page/${id}/body-texts`).then(res  => {
            return res.data
        });
    }

    public async getGalleryById(id: string | null | undefined): Promise<IGallery> {
        return await this.get<IGallery>(`/api/gallery/${id}`).then(res  => {
            return res.data
        });
    }

    public async getPageProjects(id: string | null | undefined): Promise<IProject[]> {
        return await this.get<IProject[]>(`/api/page/${id}/projects`).then(res  => {
            return res.data
        });
    }

    public async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.get<IPage>(`/api/project/${id}`).then(res  => {
            return res.data
        });
    }

    public async getPageStyles(id: string | null | undefined): Promise<IStyles> {
        return await this.get<IStyles>(`/api/page/${id}/styles`).then(res  => {
            return res.data
        });
    }

    public async getGlobalStyles(): Promise<IGlobalStyles> {
        return await this.get<IGlobalStyles>(`/api/global-styles`).then(res  => {
            return res.data
        });
    }

    public postContact<U>(data: U): Promise<any> {
        return this.post<any, U>('/api/page/contact', data).then(res  => {
            return res.data
        });
    }
}
