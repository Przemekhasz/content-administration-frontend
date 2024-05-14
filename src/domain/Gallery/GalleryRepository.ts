import RepositoryManager from "../../utils/RepositoryManager";
import IGallery from "../../types/IGallery";

export default class GalleryRepository extends RepositoryManager {
    public async getGalleryById(id: string | null | undefined): Promise<IGallery> {
        return await this.get<IGallery>(`/api/gallery/${id}`).then(res  => {
            return res.data
        });
    }
}
