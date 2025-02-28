'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { Box, Input } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

export default function Search() {
    const [open, setOpen] = useState(false);
    const [textSearch, setTextSearch] = useState<string>('');

    useEffect(() => {
        if (textSearch.length) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [textSearch]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box>
            <Tooltip
                ref={ref}
                closeOnClick={true}
                open={open}
                interactive
                content={
                    <div>
                        <DocumentSearch
                            close={setOpen}
                            data={[
                                {
                                    title: 'ABC',
                                },
                                {
                                    title: 'BCD',
                                },
                            ]}
                        />
                    </div>
                }
            >
                <Input
                    onFocus={() => {
                        setOpen(true);
                    }}
                    value={textSearch}
                    onChange={(e) => {
                        setTextSearch(e.target.value);
                    }}
                    placeholder="Nhập từ khóa để tìm kiếm ...."
                />
            </Tooltip>
        </Box>
    );
}

function DocumentSearch({ data, close }: { data: { title: string }[]; close: (status: boolean) => void }) {
    return (
        <Box>
            {data.map((item, index: number) => (
                <div
                    onClick={() => {
                        alert('click me');
                        close(false);
                    }}
                    key={index}
                >
                    {item.title}
                </div>
            ))}
        </Box>
    );
}
