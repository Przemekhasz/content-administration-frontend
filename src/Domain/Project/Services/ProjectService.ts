import ProjectRepository from "../Repositories/ProjectRepository";
import IProject from "../../../Models/IProject";

export default class ProjectService {
    private readonly projectQueryRepository: ProjectRepository;

    constructor() {
        this.projectQueryRepository = new ProjectRepository();
    }

    public async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.projectQueryRepository.getProjectById(id);
    }
}
