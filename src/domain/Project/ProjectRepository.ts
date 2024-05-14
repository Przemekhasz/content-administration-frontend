import RepositoryManager from "../../utils/RepositoryManager";
import IProject from "../../types/IProject";

export default class ProjectRepository extends RepositoryManager {
    public async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.get<IProject>(`/api/project/${id}`).then(res  => {
            return res.data
        });
    }
}
