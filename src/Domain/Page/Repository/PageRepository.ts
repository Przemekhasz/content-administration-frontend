import { AxiosResponse } from 'axios';
import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import PageDto from "../Dto/PageDto";
import MenuItemDto from "../Dto/MenuItemDto";
import Collection from "../../../Infrastructure/Shared/Interface/Collection";

export default class PageRepository extends RepositoryManager {
    public getPages(): Promise<AxiosResponse<PageDto[]>> {
        return this.get<PageDto[]>('/api/pages');
    }

    public getPageById(id: string | number): Promise<AxiosResponse<PageDto>> {
        return this.get<PageDto>(`/api/page/${id}`);
    }

    public getPageMenuItems(): Promise<AxiosResponse<MenuItemDto[]>> {
        return this.get<MenuItemDto[]>('/api/page/menu-items');
    }

    public getPageGalleries(id: string | number): Promise<AxiosResponse<Collection<any>>> {
        return this.get<Collection<any>>(`/api/page/${id}/galleries`);
    }

    public getPageProjects(id: string | number): Promise<AxiosResponse<Collection<any>>> {
        return this.get<Collection<any>>(`/api/page/${id}/projects`);
    }

    public postContact<U>(data: U): Promise<AxiosResponse<any>> {
        return this.post<any, U>('/api/page/contact', data);
    }
}
