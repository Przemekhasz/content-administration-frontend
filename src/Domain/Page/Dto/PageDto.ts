import BannerDto from "./BannerDto";
import LogoDto from "./LogoDto";
import MenuItemDto from "./MenuItemDto";
import Collection from "../../../Infrastructure/Shared/Interface/Collection";

export default interface PageDto {
    id?: string | null;
    pageName?: string | null;
    pageNumber?: number | null;
    isPublic: boolean;
    banner?: BannerDto | null;
    logo?: LogoDto | null;
    menuItem?: MenuItemDto | null;
    pageHeaders?: Collection<any> | null;
    socialMediaLinkIcons?: Collection<any> | null;
    galleries?: Collection<any> | null;
    projects?: Collection<any> | null;
}
