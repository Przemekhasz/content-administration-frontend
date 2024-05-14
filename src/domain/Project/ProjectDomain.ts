import IProjectDomain from "./IProjectDomain";
import IProject from "../../types/IProject";
import ProjectService from "./ProjectService";

export default class ProjectDomain implements IProjectDomain {
    private readonly projectQueryService: ProjectService;

    constructor() {
        this.projectQueryService = new ProjectService();
    }

    async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.projectQueryService.getProjectById(id);
    }
}
