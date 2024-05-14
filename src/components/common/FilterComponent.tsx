import React, { ChangeEvent } from 'react';
import {TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent} from '@mui/material';
import {FilterConfig} from "../../types/types";

interface FilterProps {
    config: FilterConfig;
    value: any;
    onChange: (field: string, value: any) => void;
}

export class FilterComponent extends React.Component<FilterProps> {
    constructor(props: FilterProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(event: SelectChangeEvent<string | { value: unknown }> | ChangeEvent<HTMLInputElement | { value: unknown }>): void {
        this.props.onChange(this.props.config.field, event.target.value);
    };

    render() {
        const { config, value } = this.props;

        switch (config.type) {
            case 'string':
                return (
                    <TextField
                        label={config.label}
                        variant="outlined"
                        fullWidth
                        value={value || ''}
                        onChange={this.handleChange}
                        sx={{ mb: 2 }}
                    />
                );
            case 'boolean':
                return (
                    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                        <InputLabel>{config.label}</InputLabel>
                        <Select value={value || ''} onChange={this.handleChange} label={config.label}>
                            <MenuItem value="">{config.label}</MenuItem>
                            <MenuItem value="true">Tak</MenuItem>
                            <MenuItem value="false">Nie</MenuItem>
                        </Select>
                    </FormControl>
                );
            case 'number':
                return (
                    <TextField
                        label={config.label}
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={value || ''}
                        onChange={this.handleChange}
                        sx={{ mb: 2 }}
                    />
                );
            default:
                return null;
        }
    }
}
