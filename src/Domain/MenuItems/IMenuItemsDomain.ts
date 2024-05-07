import IMenuItem from "../../Models/IMenuItem";

export default interface IMenuItemsDomain {
    getMenuItems(): Promise<IMenuItem[]>;
}
