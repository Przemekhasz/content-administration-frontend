import IMenuItemsDomain from "./IMenuItemsDomain";
import IMenuItem from "../../Models/IMenuItem";
import MenuItemsService from "./Services/MenuItemsService";

export default class MenuItemsDomain implements IMenuItemsDomain {
    private readonly menuItemsQueryService: MenuItemsService;

    constructor() {
        this.menuItemsQueryService = new MenuItemsService();
    }

    async getMenuItems(): Promise<IMenuItem[]> {
        return await this.menuItemsQueryService.getMenuItems();
    }
}
