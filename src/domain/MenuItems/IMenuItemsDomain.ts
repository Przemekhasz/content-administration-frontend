import IMenuItem from "../../types/IMenuItem";

export default interface IMenuItemsDomain {
    getMenuItems(): Promise<IMenuItem[]>;
}
