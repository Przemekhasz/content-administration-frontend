import ContactRepository from "./ContactRepository";
import IContact from "../../types/IContact";

export default class ContactService {
    private readonly contactQueryRepository: ContactRepository;

    constructor() {
        this.contactQueryRepository = new ContactRepository();
    }

    public async postContact(data: IContact): Promise<IContact> {
        return await this.contactQueryRepository.postContact(data);
    }
}
