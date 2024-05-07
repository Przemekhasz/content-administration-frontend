import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import IPage from "../../../Models/IPage";
import IProject from "../../../Models/IProject";
import IGallery from "../../../Models/IGallery";
import IStyles from "../../../Models/IStyles";
import IBodyText from "../../../Models/IBodyText";

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

    public async getPageProjects(id: string | null | undefined): Promise<IProject[]> {
        return await this.get<IProject[]>(`/api/page/${id}/projects`).then(res  => {
            return res.data
        });
    }

    public async getPageStyles(id: string | null | undefined): Promise<IStyles> {
        return await this.get<IStyles>(`/api/page/${id}/styles`).then(res  => {
            return res.data
        });
    }
}
