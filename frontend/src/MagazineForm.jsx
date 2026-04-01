import { useState } from 'react';
import api from './api/axiosConfig';

function MagazineForm({ onMagazineAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [orderQty, setOrderQty] = useState(1);
    const [currentIssue, setCurrentIssue] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMagazine = {
            title,
            price: parseFloat(price),
            copies: 1,
            orderQty: parseInt(orderQty),
            currentIssue: currentIssue + "T00:00:00"
        };

        api.post('/magazines', newMagazine)
            .then(res => {
                alert("Magazine Saved!");
                onMagazineAdded(res.data);
                setTitle('');
                setPrice(0);
                setOrderQty(1);
                setCurrentIssue('');
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

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={styles.title}>Add New Magazine</h3>
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
                        placeholder="Enter magazine title"
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

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Order Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={orderQty}
                        onChange={(e) => setOrderQty(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'orderQty' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('orderQty')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="1"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Current Issue Date</label>
                    <input
                        type="date"
                        value={currentIssue}
                        onChange={(e) => setCurrentIssue(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'date' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('date')}
                        onBlur={() => setFocusedInput(null)}
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

export default MagazineForm;