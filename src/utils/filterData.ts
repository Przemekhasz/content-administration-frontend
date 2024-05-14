import {DataModel} from "../types/types";

export const filterData = <T extends DataModel>(data: T[], filters: Partial<DataModel>): T[] => {
    return data.filter(item =>
        Object.entries(filters).every(([key, value]) => {
            if (value === '') return true;
            const itemValue = item[key];
            if (typeof itemValue === 'string') {
                return itemValue.toLowerCase().includes((value as string).toLowerCase());
            }
            if (typeof itemValue === 'boolean') {
                return itemValue === (value === 'true');
            }
            return true;
        })
    );
};
