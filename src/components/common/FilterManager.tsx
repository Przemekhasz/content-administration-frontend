import React from 'react';
import {DataModel, FilterConfig} from "../../types/types";
import {FilterComponent} from "./FilterComponent";

interface FilterManagerProps {
    filters: FilterConfig[];
    onFilterChange: (filters: Partial<DataModel>) => void;
}

interface FilterManagerState {
    filterValues: Partial<DataModel>;
}

export class FilterManager extends React.Component<FilterManagerProps, FilterManagerState> {
    constructor(props: FilterManagerProps) {
        super(props);
        this.state = {
            filterValues: {}
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    private handleFilterChange(field: string, value: any): void {
        const newFilterValues: { [p: string]: any } = { ...this.state.filterValues, [field]: value };
        this.setState({ filterValues: newFilterValues });
        this.props.onFilterChange(newFilterValues);
    };

    render() {
        return (
            <div>
                {this.props.filters.map((filter: FilterConfig) => (
                    <FilterComponent
                        key={filter.field}
                        config={filter}
                        value={this.state.filterValues[filter.field]}
                        onChange={this.handleFilterChange}
                    />
                ))}
            </div>
        );
    }
}
