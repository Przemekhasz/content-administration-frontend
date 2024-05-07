import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import IFooter from "../../../Models/IFooter";

export default class FooterRepository extends RepositoryManager {
    public async getFooter(): Promise<IFooter> {
        return await this.get<IFooter>(`/api/footer`).then(res  => {
            return res.data
        });
    }
}
