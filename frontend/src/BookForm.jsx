import { useState } from 'react';
import api from './api/axiosConfig';

function BookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = { title, author, price: parseFloat(price), copies: 1 };

        api.post('/books', newBook)
            .then(res => {
                alert("Book Saved!");
                onBookAdded(res.data);
                setTitle('');
                setAuthor('');
                setPrice(0);
            });
    };

    const styles = {
        form: {
            backgroundColor: '#1e1e1e',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #2d2d2d',
        },
        title: {
            color: '#00adb5',
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '20px',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
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
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#ffffff',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
        },
        button: {
            backgroundColor: '#00adb5',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginTop: '8px',
        },
    };

    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}>Add New Book</h3>
            <div style={styles.formGroup}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'title' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('title')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter book title"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'author' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('author')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter author name"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Price ($)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'price' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('price')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="0.00"
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        ...styles.button,
                        ...(isHovered && {
                            backgroundColor: '#008c94',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 173, 181, 0.3)',
                        }),
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Save to Database
                </button>
            </div>
        </form>
    );
}

export default BookForm;