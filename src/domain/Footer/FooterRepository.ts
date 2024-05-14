import RepositoryManager from "../../utils/RepositoryManager";
import IFooter from "../../types/IFooter";

export default class FooterRepository extends RepositoryManager {
    public async getFooter(): Promise<IFooter> {
        return await this.get<IFooter>(`/api/footer`).then(res  => {
            return res.data
        });
    }
}
