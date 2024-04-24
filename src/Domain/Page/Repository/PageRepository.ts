import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import IPage from "../Dto/IPage";
import IMenuItem from "../Dto/IMenuItem";
import Collection from "../../../Infrastructure/Shared/Interface/Collection";

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

    public async getPageMenuItems(): Promise<IMenuItem[]> {
        return await this.get<IMenuItem[]>('/api/page/menu-items').then(res  => {
            return res.data
        });
    }

    public async getPageGalleries(id: string | number): Promise<Collection<any>> {
        return await this.get<Collection<any>>(`/api/page/${id}/galleries`).then(res  => {
            return res.data
        });
    }

    public async getPageProjects(id: string | number): Promise<Collection<any>> {
        return await this.get<Collection<any>>(`/api/page/${id}/projects`).then(res  => {
            return res.data
        });
    }

    public postContact<U>(data: U): Promise<any> {
        return this.post<any, U>('/api/page/contact', data).then(res  => {
            return res.data
        });
    }
}
