import React from 'react';
import {DataModel, FilterConfig} from "../types/types";
import {FilterManager} from "../components/common/FilterManager";


interface WithDataFetchingProps {
    filters: FilterConfig[];
    dataEndpoint: string;
}

interface WithDataFetchingState {
    data: DataModel[];
    filteredData: DataModel[];
}

export function withDataFetching<P extends object>(Component: React.ComponentType<P>) {
    return class WithDataFetching extends React.Component<P & WithDataFetchingProps, WithDataFetchingState> {
        constructor(props: P & WithDataFetchingProps) {
            super(props);
            this.state = {
                data: [],
                filteredData: []
            };
        }

        componentDidMount(): void {
            fetch(this.props.dataEndpoint)
                .then((response: Response) => response.json())
                .then((data) => this.setState({ data, filteredData: data }))
                .catch((error) => console.error('Error fetching data:', error));
        }

        private handleFilterChange(filters: Partial<DataModel>): void {
            const filtered: DataModel[] = this.state.data.filter((item) =>
                Object.keys(filters).every((key) =>
                    filters[key] ? item[key]?.toString().includes(filters[key].toString()) : true
                )
            );
            this.setState({ filteredData: filtered });
        };

        render() {
            return (
                <div>
                    <FilterManager filters={this.props.filters} onFilterChange={this.handleFilterChange} />
                    <Component {...(this.props as P)} data={this.state.filteredData} />
                </div>
            );
        }
    };
}
