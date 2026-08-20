'use client'

import { Dispatch } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { updatePageNumber } from '@/lib/actions'
import { Action } from "@/utils/types"

type Props = {
    pageCount: number;
    currentPage: number;
    dispatch: Dispatch<Action>;
    userId: string;
}

function ExpensesPagination({ pageCount, currentPage, dispatch, userId }: Props) {
    const isMobile = useMediaQuery('(max-width: 630px)')

    function handleChange(event: React.ChangeEvent<unknown>, value: number) {
        dispatch({ type: 'pageChange', payload: value })
        updatePageNumber(userId, currentPage, value)
    };

    const paginationSx = {
        '& .MuiPagination-ul': {
            gap: isMobile ? '0.1rem' : '0.35rem',
        },
        '& .MuiPaginationItem-root': {
            fontFamily: 'inherit',
            color: 'hsl(var(--foreground))',
            fontWeight: 600,
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            padding: isMobile ? '0.60rem' : '0.80rem',
            borderRadius: '999px',
            transition: 'all 0.2s ease-in-out',
            minWidth: 'auto',
            border: '1px solid hsl(var(--border))',
            '&:hover': {
                backgroundColor: 'hsl(var(--secondary))',
            },
            '&.Mui-selected': {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                border: '1px solid hsl(var(--primary))',
                '&:hover': {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                },
            },
        },
        '& .MuiPaginationItem-previousNext': {
            border: 'none',
            '&:hover': {
                backgroundColor: 'hsl(var(--secondary))',
            },
        },
        '& .MuiPaginationItem-ellipsis': {
            color: 'hsl(var(--muted-foreground))',
            border: 'none',
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            padding: isMobile ? '0.60rem' : '0.80rem',
            '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'default',
            },
        },
    };

    return (
        <div className={`flex items-center justify-center ${isMobile ? 'mt-5' : 'mt-6'}`}>
            <Pagination 
                count={pageCount} 
                page={currentPage} 
                onChange={handleChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ 
                            previous: () => <AiOutlineLeft size={isMobile ? 10 : 12} />, 
                            next: () => <AiOutlineRight size={isMobile ? 10 : 12} />
                        }}
                        {...item}
                    />
                )}
                sx={paginationSx}
            />    
        </div>
    );
}

export default ExpensesPagination;