import GalleryRepository from "./GalleryRepository";
import IGallery from "../../types/IGallery";

export default class GalleryService {
    private readonly galleryQueryRepository: GalleryRepository;

    constructor() {
        this.galleryQueryRepository = new GalleryRepository();
    }

    public async getGalleryById(id: string | null | undefined): Promise<IGallery> {
        return await this.galleryQueryRepository.getGalleryById(id);
    }
}
