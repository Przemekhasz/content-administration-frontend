import IFooter from "../../Models/IFooter";

export default interface IFooterDomain {
    getFooter(): Promise<IFooter>;
}
