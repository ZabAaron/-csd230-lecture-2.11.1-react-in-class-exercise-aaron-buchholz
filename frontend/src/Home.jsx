import { useAuth } from './auth/AuthProvider';

function Home() {
    const { token, username, isAdmin } = useAuth();

    const styles = {
        container: {
            textAlign: 'center',
            padding: '60px 20px',
        },
        title: {
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #00adb5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        },
        subtitle: {
            fontSize: '1.25rem',
            color: '#b0b0b0',
            marginBottom: '30px',
        },
        message: {
            backgroundColor: '#1e1e1e',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '500px',
            margin: '0 auto',
            border: '1px solid #2d2d2d',
        },
        welcomeText: {
            color: '#ffffff',
            fontSize: '1.5rem',
            marginBottom: '16px',
        },
        description: {
            color: '#6c6c6c',
            fontSize: '1rem',
        },
        highlight: {
            color: '#00adb5',
            fontWeight: '600',
        },
    };

    return (
        <div style={styles.container}>
            {token ? (
                <div style={styles.message}>
                    <h1 style={styles.welcomeText}>
                        Welcome back, <span style={styles.highlight}>{username || (isAdmin ? 'Admin' : 'Customer')}</span>
                    </h1>
                    <p style={styles.description}>
                        {isAdmin
                            ? "Manage your inventory, add new items, and keep track of your store."
                            : "Browse our collection of books, magazines, and merchandise."}
                    </p>
                    <p style={{ ...styles.description, marginTop: '16px' }}>
                        Use the navigation bar above to get started.
                    </p>
                </div>
            ) : (
                <div style={styles.message}>
                    <h1 style={styles.welcomeText}>Welcome to the Store, Aaron</h1>
                    <p style={styles.description}>
                        Please <span style={styles.highlight}>log in</span> to continue browsing our collection.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;