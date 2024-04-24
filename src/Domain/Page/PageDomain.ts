import IPage from "./Dto/IPage";
import IPageQueryDomain from "./Interface/IPageQueryDomain";
import PageService from "./Service/PageService";
import IMenuItem from "./Dto/IMenuItem";

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
}
