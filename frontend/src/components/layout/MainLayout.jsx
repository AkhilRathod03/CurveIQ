import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { darkMode } = useContext(ThemeContext);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) setMobileOpen(false);
    }, [location.pathname, isMobile]);

    return (
        <div className="d-flex position-relative overflow-x-hidden" style={{ minHeight: '100vh', width: '100%' }}>
            {/* Mobile Drawer Overlay Backdrop */}
            {isMobile && mobileOpen && (
                <div 
                    onClick={() => setMobileOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 1040,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}

            <Sidebar 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
                isMobile={isMobile}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Content Area */}
            <motion.div 
                className="flex-grow-1 d-flex flex-column min-w-0" 
                animate={{ 
                    marginLeft: isMobile ? '0px' : (isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}
            >
                {/* Top Navigation */}
                <Navbar 
                    isCollapsed={isCollapsed} 
                    setIsCollapsed={setIsCollapsed} 
                    isMobile={isMobile}
                    mobileOpen={mobileOpen}
                    setMobileOpen={setMobileOpen}
                />

                {/* Main Page Content with Transitions */}
                <main className="p-4 flex-grow-1 custom-scrollbar overflow-x-hidden">
                    <div className="container-fluid p-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
            </motion.div>
            
            <style>{`
                .max-w-fit { max-width: fit-content; }
                .italic { font-style: italic; }
                .uppercase { text-transform: uppercase; }
                .letter-spacing-1 { letter-spacing: 1px; }
                .letter-spacing-2 { letter-spacing: 2px; }
            `}</style>
        </div>
    );
};

export default MainLayout;
