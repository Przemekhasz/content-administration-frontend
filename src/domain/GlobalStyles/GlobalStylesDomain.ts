import IGlobalStylesDomain from "./IGlobalStylesDomain";
import GlobalStylesService from "./GlobalStylesService";
import {IGlobalStyles} from "../../types/IGlobalStyles";

export default class GlobalStylesDomain implements IGlobalStylesDomain {
    private readonly globalStylesQueryService: GlobalStylesService;

    constructor() {
        this.globalStylesQueryService = new GlobalStylesService();
    }

    public async getGlobalStyles(): Promise<IGlobalStyles> {
        return await this.globalStylesQueryService.getGlobalStyles();
    }
}
