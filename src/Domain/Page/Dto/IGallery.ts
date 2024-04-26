import IImage from "./IImage";

export default interface IGallery {
    id?: string | null;
    name?: string | null;
    images?: IImage[] | null;
}
