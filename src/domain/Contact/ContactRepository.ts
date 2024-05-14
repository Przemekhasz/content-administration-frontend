import IContact from "../../types/IContact";
import RepositoryManager from "../../utils/RepositoryManager";

export default class ContactRepository extends RepositoryManager {
    public async postContact(data: IContact): Promise<IContact> {
        return await this.post<IContact, IContact>('/api/contact', data).then(res => {
            return res.data
        });
    }
}
