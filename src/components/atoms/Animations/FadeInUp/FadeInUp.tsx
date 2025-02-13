import { Easing, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeInUpBoxProps {
    children: ReactNode;
    duration: number;
    ease: Easing;
}

const FadeInUpBox = ({ children, duration = 0.5, ease = 'easeOut' }: FadeInUpBoxProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, ease }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInUpBox;
