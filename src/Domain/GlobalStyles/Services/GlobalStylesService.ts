import GlobalStylesRepository from "../Repositories/GlobalStylesRepository";
import {IGlobalStyles} from "../../../Models/IGlobalStyles";

export default class GlobalStylesService {
    private readonly globalStylesQueryRepository: GlobalStylesRepository;

    constructor() {
        this.globalStylesQueryRepository = new GlobalStylesRepository();
    }

    public async getGlobalStyles(): Promise<IGlobalStyles> {
        return await this.globalStylesQueryRepository.getGlobalStyles();
    }
}
