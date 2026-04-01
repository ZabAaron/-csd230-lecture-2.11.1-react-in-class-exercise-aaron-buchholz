// frontend/src/PhoneForm.jsx
import { useState } from 'react';
import api from './api/axiosConfig';

function PhoneForm({ onPhoneAdded }) {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [storageGB, setStorageGB] = useState(64);
    const [isHovered, setIsHovered] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPhone = {
            brand,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            storageGB: parseInt(storageGB)
        };

        api.post('/phones', newPhone)
            .then(res => {
                alert("Phone Saved!");
                onPhoneAdded(res.data);
                setBrand('');
                setPrice(0);
                setQuantity(1);
                setStorageGB(64);
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
        select: {
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#ffffff',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            outline: 'none',
            cursor: 'pointer',
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
            <h3 style={styles.title}>Add New Phone</h3>
            <div style={styles.formGroup}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'brand' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('brand')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter phone brand"
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
                    <label style={styles.label}>Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'quantity' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('quantity')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="1"
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Storage (GB)</label>
                    <select
                        value={storageGB}
                        onChange={(e) => setStorageGB(e.target.value)}
                        style={{
                            ...styles.select,
                            ...(focusedInput === 'storage' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('storage')}
                        onBlur={() => setFocusedInput(null)}
                    >
                        <option value="64">64 GB</option>
                        <option value="128">128 GB</option>
                        <option value="256">256 GB</option>
                        <option value="512">512 GB</option>
                        <option value="1024">1 TB</option>
                    </select>
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

export default PhoneForm;