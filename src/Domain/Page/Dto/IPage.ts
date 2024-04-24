import IBanner from "./IBanner";
import ILogo from "./ILogo";
import IMenuItem from "./IMenuItem";
import Collection from "../../../Infrastructure/Shared/Interface/Collection";

export default interface IPage {
    id?: string | null;
    pageName?: string | null;
    pageNumber?: number | null;
    isPublic: boolean;
    banner?: IBanner | null;
    logo?: ILogo | null;
    menuItem?: IMenuItem | null;
    pageHeaders?: Collection<any> | null;
    socialMediaLinkIcons?: Collection<any> | null;
    galleries?: Collection<any> | null;
    projects?: Collection<any> | null;
}
