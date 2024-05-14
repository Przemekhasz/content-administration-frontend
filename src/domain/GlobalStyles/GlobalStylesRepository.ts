import RepositoryManager from "../../utils/RepositoryManager";
import {IGlobalStyles} from "../../types/IGlobalStyles";

export default class GlobalStylesRepository extends RepositoryManager {
    public async getGlobalStyles(): Promise<IGlobalStyles> {
        return await this.get<IGlobalStyles>(`/api/global-styles`).then(res  => {
            return res.data
        });
    }
}
