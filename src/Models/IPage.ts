import IBanner from "./IBanner";
import ILogo from "./ILogo";
import IMenuItem from "./IMenuItem";
import Collection from "../Infrastructure/Shared/Interfaces/Collection";
import IPageHeader from "./IPageHeader";

export default interface IPage {
    id?: string | null;
    pageName?: string | null;
    pageNumber?: number | null;
    public: boolean;
    banner?: IBanner | null;
    logo?: ILogo | null;
    menuItem?: IMenuItem | null;
    pageHeaders: Array<IPageHeader> | null;
    socialMediaLinkIcons?: Collection<any> | null;
    galleries?: Collection<any> | null;
    projects?: Collection<any> | null;
}
