// frontend/src/LaptopForm.jsx
import { useState } from 'react';
import api from './api/axiosConfig';

function LaptopForm({ onLaptopAdded }) {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [processor, setProcessor] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newLaptop = {
            brand,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            processor
        };

        api.post('/laptops', newLaptop)
            .then(res => {
                alert("Laptop Saved!");
                onLaptopAdded(res.data);
                setBrand('');
                setPrice(0);
                setQuantity(1);
                setProcessor('');
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
            <h3 style={styles.title}>Add New Laptop</h3>
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
                        placeholder="Enter laptop brand"
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
                    <label style={styles.label}>Processor</label>
                    <input
                        type="text"
                        value={processor}
                        onChange={(e) => setProcessor(e.target.value)}
                        required
                        style={{
                            ...styles.input,
                            ...(focusedInput === 'processor' && {
                                borderColor: '#00adb5',
                                boxShadow: '0 0 0 2px rgba(0, 173, 181, 0.2)',
                            }),
                        }}
                        onFocus={() => setFocusedInput('processor')}
                        onBlur={() => setFocusedInput(null)}
                        placeholder="Enter processor (e.g., Intel i7, AMD Ryzen 5)"
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

export default LaptopForm;