import {IGlobalStyles} from "../../Models/IGlobalStyles";

export default interface IGlobalStylesDomain {
    getGlobalStyles(): Promise<IGlobalStyles>;
}
