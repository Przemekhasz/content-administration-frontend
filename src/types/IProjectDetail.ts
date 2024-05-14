import IProject from "./IProject";

export default interface IProjectDetail {
    id?: string | null;
    project?: IProject | null;
    description?: string | null;
    imagePath?: string | null;
}
