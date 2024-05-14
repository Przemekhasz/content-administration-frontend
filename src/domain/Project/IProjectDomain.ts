import IProject from "../../types/IProject";

export default interface IProjectDomain {
    getProjectById(id: string | null | undefined): Promise<IProject>;
}
