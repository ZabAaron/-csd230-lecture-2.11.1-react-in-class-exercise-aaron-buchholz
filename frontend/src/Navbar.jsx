import { Link } from 'react-router';
import { useAuth } from './auth/AuthProvider';
import { useState } from 'react';

function Navbar() {
    const { token, isAdmin, username, logout } = useAuth();
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);

    const styles = {
        nav: {
            backgroundColor: '#1e1e1e',
            padding: '1rem 2rem',
            marginBottom: '30px',
            borderRadius: '12px',
            border: '1px solid #2d2d2d',
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        },
        link: {
            color: '#b0b0b0',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
        },
        linkHover: {
            color: '#00adb5',
            backgroundColor: 'rgba(0, 173, 181, 0.1)',
        },
        addLink: {
            color: '#00adb5',
            textDecoration: 'none',
            fontWeight: '600',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
        },
        userInfo: {
            marginLeft: 'auto',
            color: '#6c6c6c',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
        },
        username: {
            color: '#00adb5',
            fontWeight: '600',
        },
        role: {
            backgroundColor: '#2a2a2a',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
        },
        logoutButton: {
            backgroundColor: '#2a2a2a',
            color: '#dc3545',
            border: '1px solid #dc3545',
            padding: '6px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
        },
    };

    const [hoveredLink, setHoveredLink] = useState(null);

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            style={{
                ...styles.link,
                ...(hoveredLink === to && styles.linkHover),
            }}
            onMouseEnter={() => setHoveredLink(to)}
            onMouseLeave={() => setHoveredLink(null)}
        >
            {children}
        </Link>
    );

    const AddLink = ({ to, children }) => (
        <Link
            to={to}
            style={{
                ...styles.addLink,
                ...(hoveredLink === to && { color: '#008c94' }),
            }}
            onMouseEnter={() => setHoveredLink(to)}
            onMouseLeave={() => setHoveredLink(null)}
        >
            {children}
        </Link>
    );

    return (
        <nav style={styles.nav}>
            <NavLink to="/">Home</NavLink>

            {token && (
                <>
                    <NavLink to="/inventory">Books</NavLink>
                    <NavLink to="/magazines">Magazines</NavLink>
                    <NavLink to="/tshirts">T-Shirts</NavLink>
                    <NavLink to="/jackets">Jackets</NavLink>

                    {isAdmin && (
                        <>
                            <AddLink to="/add">+ Book</AddLink>
                            <AddLink to="/add-magazine">+ Magazine</AddLink>
                            <AddLink to="/add-tshirt">+ T-Shirt</AddLink>
                            <AddLink to="/add-jacket">+ Jacket</AddLink>
                        </>
                    )}

                    <div style={styles.userInfo}>
                        <span>
                            <span style={styles.username}>{username}</span>
                            <span style={{ margin: '0 4px' }}>•</span>
                            <span style={styles.role}>{isAdmin ? 'Admin' : 'User'}</span>
                        </span>
                        <button
                            onClick={logout}
                            style={{
                                ...styles.logoutButton,
                                ...(isLogoutHovered && {
                                    backgroundColor: '#dc3545',
                                    color: '#ffffff',
                                }),
                            }}
                            onMouseEnter={() => setIsLogoutHovered(true)}
                            onMouseLeave={() => setIsLogoutHovered(false)}
                        >
                            Logout
                        </button>
                    </div>
                </>
            )}

            {!token && (
                <NavLink to="/login">Login</NavLink>
            )}
        </nav>
    );
}

export default Navbar;