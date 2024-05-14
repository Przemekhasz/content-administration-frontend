import IFooter from "../../types/IFooter";

export default interface IFooterDomain {
    getFooter(): Promise<IFooter>;
}
