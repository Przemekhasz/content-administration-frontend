import IProject from "../../Models/IProject";

export default interface IProjectDomain {
    getProjectById(id: string | null | undefined): Promise<IProject>;
}
