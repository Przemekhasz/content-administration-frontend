import RepositoryManager from "../../../Infrastructure/RepositoryManager";
import IContact from "../../../Models/IContact";

export default class ContactRepository extends RepositoryManager {
    public async postContact(data: IContact): Promise<IContact> {
        return await this.post<IContact, IContact>('/api/contact', data).then(res => {
            return res.data
        });
    }
}
