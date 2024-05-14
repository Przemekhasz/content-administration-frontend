import IContactDomain from "./IContactDomain";
import ContactService from "./ContactService";
import IContact from "../../types/IContact";

export default class ContactDomain implements IContactDomain {
    private readonly contactQueryService: ContactService;

    constructor() {
        this.contactQueryService = new ContactService();
    }

    public async postContact(data: IContact): Promise<IContact> {
        return await this.contactQueryService.postContact(data);
    }
}
