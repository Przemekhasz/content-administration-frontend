import IProjectDomain from "./IProjectDomain";
import IProject from "../../Models/IProject";
import ProjectService from "./Services/ProjectService";

export default class ProjectDomain implements IProjectDomain {
    private readonly projectQueryService: ProjectService;

    constructor() {
        this.projectQueryService = new ProjectService();
    }

    async getProjectById(id: string | null | undefined): Promise<IProject> {
        return await this.projectQueryService.getProjectById(id);
    }
}
