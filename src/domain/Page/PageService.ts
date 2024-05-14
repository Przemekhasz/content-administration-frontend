import PageRepository from "./PageRepository";
import IPage from "../../types/IPage";
import IProject from "../../types/IProject";
import IGallery from "../../types/IGallery";
import IStyles from "../../types/IStyles";
import IBodyText from "../../types/IBodyText";

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

    public async getPageProjects(id: string | null | undefined): Promise<IProject[]> {
        return await this.pageQueryRepository.getPageProjects(id);
    }

    public async getPageGalleries(id: string | null | undefined): Promise<IGallery[]> {
        return await this.pageQueryRepository.getPageGalleries(id);
    }

    public async getPageBodyTexts(id: string | null | undefined): Promise<IBodyText[]> {
        return await this.pageQueryRepository.getPageBodyTexts(id);
    }

    public async getPageStyles(id: string | null | undefined): Promise<IStyles> {
        return await this.pageQueryRepository.getPageStyles(id);
    }
}
