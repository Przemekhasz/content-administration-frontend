import MenuItemsRepository from "../Repositories/MenuItemsRepository";
import IMenuItem from "../../../Models/IMenuItem";

export default class MenuItemsService {
    private readonly menuItemsQueryRepository: MenuItemsRepository;

    constructor() {
        this.menuItemsQueryRepository = new MenuItemsRepository();
    }

    public async getMenuItems(): Promise<IMenuItem[]> {
        return await this.menuItemsQueryRepository.getMenuItems();
    }
}
