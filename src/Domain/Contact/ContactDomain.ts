import IContactDomain from "./IContactDomain";
import ContactService from "./Services/ContactService";
import IContact from "../../Models/IContact";

export default class ContactDomain implements IContactDomain {
    private readonly contactQueryService: ContactService;

    constructor() {
        this.contactQueryService = new ContactService();
    }

    public async postContact(data: IContact): Promise<IContact> {
        return await this.contactQueryService.postContact(data);
    }
}
