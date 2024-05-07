import ContactRepository from "../Repositories/ContactRepository";
import IContact from "../../../Models/IContact";

export default class ContactService {
    private readonly contactQueryRepository: ContactRepository;

    constructor() {
        this.contactQueryRepository = new ContactRepository();
    }

    public async postContact(data: IContact): Promise<IContact> {
        return await this.contactQueryRepository.postContact(data);
    }
}
