import FooterRepository from "../Repositories/FooterRepository";
import IFooter from "../../../Models/IFooter";

export default class FooterService {
    private readonly footerQueryRepository: FooterRepository;

    constructor() {
        this.footerQueryRepository = new FooterRepository();
    }

    public async getFooter(): Promise<IFooter> {
        return await this.footerQueryRepository.getFooter();
    }
}
