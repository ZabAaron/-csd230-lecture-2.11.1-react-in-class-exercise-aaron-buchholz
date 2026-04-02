import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from './auth/AuthProvider';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const expired = searchParams.get('expired') === 'true';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then(res => {
                if (!res.ok) throw new Error('Invalid credentials');
                return res.json();
            })
            .then(data => {
                login(data.token);
                navigate('/');
            })
            .catch(err => setError(err.message));
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
        },
        card: {
            maxWidth: '440px',
            width: '90%',
            padding: '40px',
            backgroundColor: '#1e1e1e',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #2d2d2d',
        },
        title: {
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '32px',
            textAlign: 'center',
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        },
        alert: {
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid',
        },
        expiredAlert: {
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderColor: 'rgba(255, 193, 7, 0.3)',
            color: '#ffc107',
        },
        errorAlert: {
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            borderColor: 'rgba(220, 53, 69, 0.3)',
            color: '#dc3545',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        label: {
            color: '#b0b0b0',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
        },
        input: {
            padding: '12px 16px',
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
            fontFamily: 'inherit',
        },
        inputFocus: {
            borderColor: '#00adb5',
            boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
        },
        button: {
            marginTop: '8px',
            padding: '12px 24px',
            backgroundColor: '#00adb5',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        buttonHover: {
            backgroundColor: '#008c94',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 173, 181, 0.3)',
        },
        footer: {
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #2d2d2d',
            textAlign: 'center',
            color: '#6c6c6c',
            fontSize: '13px',
            lineHeight: '1.5',
        },
        footerStrong: {
            color: '#00adb5',
            fontWeight: '600',
        },
    };

    const [isHovered, setIsHovered] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome Back</h1>

                {expired && (
                    <div style={{ ...styles.alert, ...styles.expiredAlert }}>
                        ⚠️ Your session has expired. Please log in again.
                    </div>
                )}

                {error && (
                    <div style={{ ...styles.alert, ...styles.errorAlert }}>
                        ✗ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                ...(focusedInput === 'username' && styles.inputFocus),
                            }}
                            onFocus={() => setFocusedInput('username')}
                            onBlur={() => setFocusedInput(null)}
                            placeholder="Enter your username"
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                ...(focusedInput === 'password' && styles.inputFocus),
                            }}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            ...styles.button,
                            ...(isHovered && styles.buttonHover),
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Sign In
                    </button>
                </form>

                <div style={styles.footer}>
                    <span>Demo accounts: </span>
                    <strong style={styles.footerStrong}>login with admin/admin</strong>
                    <span> (Admin) or </span>
                    <strong style={styles.footerStrong}> login with user/user</strong>
                    <span> (User)</span>
                </div>
            </div>
        </div>
    );
}

export default Login;