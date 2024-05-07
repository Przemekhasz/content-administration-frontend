import IFooterDomain from "./IFooterDomain";
import IFooter from "../../Models/IFooter";
import FooterService from "./Services/FooterService";

export default class FooterDomain implements IFooterDomain {
    private readonly footerQueryService: FooterService;

    constructor() {
        this.footerQueryService = new FooterService();
    }

    public async getFooter(): Promise<IFooter> {
        return await this.footerQueryService.getFooter();
    }
}
