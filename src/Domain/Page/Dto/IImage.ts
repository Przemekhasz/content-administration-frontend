import IGallery from "./IGallery";
import ICategory from "./ICategory";
import ITag from "./ITag";

export default interface IImage {
    id?: string | null;
    title?: string | null;
    description?: string | null;
    imagePath?: string | null;
    gallery?: IGallery | null;
    categories?: ICategory[] | null;
    tags?: ITag[] | null;
}
