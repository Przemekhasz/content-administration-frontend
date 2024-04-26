import IPage from "./Dto/IPage";
import IPageQueryDomain from "./Interface/IPageQueryDomain";
import PageService from "./Service/PageService";
import IMenuItem from "./Dto/IMenuItem";
import IProject from "./Dto/IProject";
import IGallery from "./Dto/IGallery";
import IStyles from "./Dto/IStyles";

export default class PageDomain implements IPageQueryDomain {
    private readonly pageQueryService: PageService;

    constructor() {
        this.pageQueryService = new PageService();
    }

    async findPages(): Promise<IPage[]> {
        return await this.pageQueryService.getPages();
    }

    async findPageById(id: string | null | undefined): Promise<IPage> {
        return await this.pageQueryService.getPageById(id)
    }

    async getPageMenuItems(): Promise<IMenuItem[]> {
        return await this.pageQueryService.getPageMenuItems();
    }

    async getPageProjects(id: string | null | undefined): Promise<IMenuItem[]> {
        return await this.pageQueryService.getPageProjects(id);
    }

    async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.pageQueryService.getProjectById(id);
    }

    public async getPageGalleries(id: string | null | undefined): Promise<IGallery[]> {
        return await this.pageQueryService.getPageGalleries(id);
    }

    public async getGalleryById(id: string | null | undefined): Promise<IGallery> {
        return await this.pageQueryService.getGalleryById(id);
    }

    public async getPageStyles(id: string | null | undefined): Promise<IStyles> {
        return await this.pageQueryService.getPageStyles(id);
    }
}
