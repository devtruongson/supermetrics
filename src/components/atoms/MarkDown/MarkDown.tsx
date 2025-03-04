import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function MarkDown({ text }: { text: string }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <Box className="preview-markdown" pb={3}>
            {isClient ? <ReactMarkdown rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown> : null}
        </Box>
    );
}
