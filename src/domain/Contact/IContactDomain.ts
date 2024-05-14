import IContact from "../../types/IContact";

export default interface IContactDomain {
    postContact(data: IContact): Promise<IContact>;
}
