import IPage from "../../Models/IPage";
import IPageQueryDomain from "./IPageQueryDomain";
import PageService from "./Services/PageService";
import IMenuItem from "../../Models/IMenuItem";
import IGallery from "../../Models/IGallery";
import IStyles from "../../Models/IStyles";
import IBodyText from "../../Models/IBodyText";
import IProject from "../../Models/IProject";

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


    async getPageBodyTexts(id: string | null | undefined): Promise<IBodyText[]> {
        return await this.pageQueryService.getPageBodyTexts(id);
    }

    async getPageProjects(id: string | null | undefined): Promise<IProject[]> {
        return await this.pageQueryService.getPageProjects(id);
    }

    public async getPageGalleries(id: string | null | undefined): Promise<IGallery[]> {
        return await this.pageQueryService.getPageGalleries(id);
    }

    public async getPageStyles(id: string | null | undefined): Promise<IStyles> {
        return await this.pageQueryService.getPageStyles(id);
    }
}
