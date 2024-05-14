import IGallery from "../../types/IGallery";

export default interface IGalleryDomain {
    getGalleryById(id: string | null | undefined): Promise<IGallery>;
}
