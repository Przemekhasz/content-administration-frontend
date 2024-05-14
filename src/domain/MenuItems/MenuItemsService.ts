import MenuItemsRepository from "./MenuItemsRepository";
import IMenuItem from "../../types/IMenuItem";

export default class MenuItemsService {
    private readonly menuItemsQueryRepository: MenuItemsRepository;

    constructor() {
        this.menuItemsQueryRepository = new MenuItemsRepository();
    }

    public async getMenuItems(): Promise<IMenuItem[]> {
        return await this.menuItemsQueryRepository.getMenuItems();
    }
}
