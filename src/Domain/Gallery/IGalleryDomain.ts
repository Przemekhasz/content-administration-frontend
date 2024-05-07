import IGallery from "../../Models/IGallery";

export default interface IGalleryDomain {
    getGalleryById(id: string | null | undefined): Promise<IGallery>;
}
