import PageRepository from "../Repository/PageRepository";
import IPage from "../Dto/IPage";
import IMenuItem from "../Dto/IMenuItem";

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
}
