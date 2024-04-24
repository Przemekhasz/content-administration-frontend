import IPage from "../Dto/IPage";
import IMenuItem from "../Dto/IMenuItem";

export default interface IPageQueryDomain {
    findPages(): Promise<IPage[]>;
    findPageById(id: string | null | undefined): Promise<IPage>;
    getPageMenuItems(): Promise<IMenuItem[]>;
}
