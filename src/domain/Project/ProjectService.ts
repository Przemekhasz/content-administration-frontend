import ProjectRepository from "./ProjectRepository";
import IProject from "../../types/IProject";

export default class ProjectService {
    private readonly projectQueryRepository: ProjectRepository;

    constructor() {
        this.projectQueryRepository = new ProjectRepository();
    }

    public async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.projectQueryRepository.getProjectById(id);
    }
}
