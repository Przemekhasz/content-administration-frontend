import IContact from "../../Models/IContact";

export default interface IContactDomain {
    postContact(data: IContact): Promise<IContact>;
}
