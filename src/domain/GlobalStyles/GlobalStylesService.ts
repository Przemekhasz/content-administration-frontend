import GlobalStylesRepository from "./GlobalStylesRepository";
import {IGlobalStyles} from "../../types/IGlobalStyles";

export default class GlobalStylesService {
    private readonly globalStylesQueryRepository: GlobalStylesRepository;

    constructor() {
        this.globalStylesQueryRepository = new GlobalStylesRepository();
    }

    public async getGlobalStyles(): Promise<IGlobalStyles> {
        return await this.globalStylesQueryRepository.getGlobalStyles();
    }
}
