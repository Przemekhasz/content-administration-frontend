import IProjectDetail from "./IProjectDetail";
import IUser from "./IUser";
import ICategory from "./ICategory";
import ITag from "./ITag";

export default interface IProject {
    id?: string | null;
    title?: string | null;
    mainDescription?: string | null;
    pinned: boolean;
    details?: IProjectDetail[] | null;
    author?: IUser | null;
    categories?: ICategory[] | null;
    tags?: ITag[] | null;
    status: string;
    [key: string]: any;
}
