import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import IMenuItem from "../../../Models/IMenuItem";

export default class MenuItemsRepository extends RepositoryManager {
    public async getMenuItems(): Promise<IMenuItem[]> {
        return await this.get<IMenuItem[]>('/api/menu-items').then(res  => {
            return res.data
        });
    }
}
