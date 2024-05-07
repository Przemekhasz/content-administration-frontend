import IGalleryDomain from "./IGalleryDomain";
import IGallery from "../../Models/IGallery";
import GalleryService from "./Services/GalleryService";

export default class GalleryDomain implements IGalleryDomain {
    private readonly galleryQueryService: GalleryService;

    constructor() {
        this.galleryQueryService = new GalleryService();
    }

    public async getGalleryById(id: string | null | undefined): Promise<IGallery> {
        return await this.galleryQueryService.getGalleryById(id);
    }
}
