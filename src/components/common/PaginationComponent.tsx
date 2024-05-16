import React, { Component } from 'react';
import { Button, Typography } from '@mui/material';
import { FirstPage, LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material";

interface PaginationProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onNextPage: () => void;
    onPrevPage: () => void;
    onFirstPage: () => void;
    onLastPage: () => void;
}

export default class PaginationComponent extends Component<PaginationProps> {
    render() {
        const {
            currentPage,
            itemsPerPage,
            totalItems,
            onNextPage,
            onPrevPage,
            onFirstPage,
            onLastPage
        } = this.props;
        const totalPages: number = Math.ceil(totalItems / itemsPerPage);
        const showFirstAndLast: boolean = totalPages > 10;

        return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="body2" style={{ marginBottom: '10px' }}>
                    Page {currentPage} of {totalPages}
                </Typography>
                <div>
                    {currentPage > 1 && (
                        <>
                            {showFirstAndLast && (
                                <Button
                                    onClick={onFirstPage}
                                    sx={{ minWidth: '40px', backgroundColor: '#011226', color: '#ffffff', marginRight: '10px' }}
                                >
                                    <FirstPage />
                                </Button>
                            )}
                            <Button
                                onClick={onPrevPage}
                                sx={{ minWidth: '40px', backgroundColor: '#011226', color: '#ffffff', marginRight: '10px' }}
                            >
                                <NavigateBefore />
                            </Button>
                        </>
                    )}
                    {currentPage < totalPages && (
                        <>
                            <Button
                                onClick={onNextPage}
                                sx={{ minWidth: '40px', backgroundColor: '#011226', color: '#ffffff', marginRight: '10px' }}
                            >
                                <NavigateNext />
                            </Button>
                            {showFirstAndLast && (
                                <Button
                                    onClick={onLastPage}
                                    sx={{ minWidth: '40px', backgroundColor: '#011226', color: '#ffffff' }}
                                >
                                    <LastPage />
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
}
