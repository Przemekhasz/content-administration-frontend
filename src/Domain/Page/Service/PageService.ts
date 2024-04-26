import PageRepository from "../Repository/PageRepository";
import IPage from "../Dto/IPage";
import IMenuItem from "../Dto/IMenuItem";
import IProject from "../Dto/IProject";
import IGallery from "../Dto/IGallery";
import IStyles from "../Dto/IStyles";

export default class PageService {
    private readonly pageQueryRepository: PageRepository;

    constructor() {
        this.pageQueryRepository = new PageRepository();
    }

    public async getPages(): Promise<IPage[]> {
        return await this.pageQueryRepository.getPages();
    }

    public async getPageById(id: string | null | undefined): Promise<IPage> {
        return await this.pageQueryRepository.getPageById(id);
    }

    public async getPageMenuItems(): Promise<IMenuItem[]> {
        return await this.pageQueryRepository.getPageMenuItems();
    }

    public async getPageProjects(id: string | null | undefined): Promise<IProject[]> {
        return await this.pageQueryRepository.getPageProjects(id);
    }

    public async getPageGalleries(id: string | null | undefined): Promise<IGallery[]> {
        return await this.pageQueryRepository.getPageGalleries(id);
    }

    public async getGalleryById(id: string | null | undefined): Promise<IGallery> {
        return await this.pageQueryRepository.getGalleryById(id);
    }

    public async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.pageQueryRepository.getProjectById(id);
    }

    public async getPageStyles(id: string | null | undefined): Promise<IStyles> {
        return await this.pageQueryRepository.getPageStyles(id);
    }
}
