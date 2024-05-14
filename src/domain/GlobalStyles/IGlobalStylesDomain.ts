import {IGlobalStyles} from "../../types/IGlobalStyles";

export default interface IGlobalStylesDomain {
    getGlobalStyles(): Promise<IGlobalStyles>;
}
