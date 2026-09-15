import { motion } from 'framer-motion';

/**
 * PageTransition — wraps every public page for route-aware entrance animation.
 * AnimatePresence in App.jsx uses location.pathname as key, so this component
 * mounts fresh on every route change, guaranteeing animations re-trigger.
 */
const pageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export default function PageTransition({ children }) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
        >
            {children}
        </motion.div>
    );
}
