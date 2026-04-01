// frontend/src/Laptop.jsx
import { useState } from 'react';

function Laptop({ id, brand, price, quantity, processor, isAdmin, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempBrand, setTempBrand] = useState(brand);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempQuantity, setTempQuantity] = useState(quantity);
    const [tempProcessor, setTempProcessor] = useState(processor);
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = () => {
        const updated = {
            id,
            brand: tempBrand,
            price: parseFloat(tempPrice),
            quantity: parseInt(tempQuantity),
            processor: tempProcessor
        };
        onUpdate(id, updated);
        setIsEditing(false);
    };

    const styles = {
        card: {
            backgroundColor: '#1e1e1e',
            border: '1px solid #2d2d2d',
            borderRadius: '12px',
            margin: '12px 0',
            padding: '20px',
            transition: 'all 0.3s ease',
            ...(isHovered && {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                borderColor: '#00adb5',
            }),
        },
        content: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
        },
        info: {
            flex: 1,
        },
        title: {
            color: '#ffffff',
            fontSize: '1.25rem',
            fontWeight: '600',
            margin: '0 0 8px 0',
        },
        details: {
            color: '#b0b0b0',
            margin: 0,
            fontSize: '0.9rem',
        },
        price: {
            color: '#00adb5',
            fontWeight: '600',
        },
        buttonGroup: {
            display: 'flex',
            gap: '8px',
        },
        editButton: {
            backgroundColor: '#2a2a2a',
            color: '#ffc107',
            border: '1px solid #ffc107',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
        },
        deleteButton: {
            backgroundColor: '#2a2a2a',
            color: '#dc3545',
            border: '1px solid #dc3545',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
        },
        editForm: {
            backgroundColor: '#1e1e1e',
            border: '2px solid #00adb5',
            borderRadius: '12px',
            margin: '12px 0',
            padding: '20px',
        },
        editInput: {
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            borderRadius: '6px',
            padding: '10px 12px',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s ease',
        },
        saveButton: {
            backgroundColor: '#00adb5',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
        },
        cancelButton: {
            backgroundColor: '#2a2a2a',
            color: '#b0b0b0',
            border: '1px solid #3a3a3a',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
        },
    };

    if (isEditing) {
        return (
            <div style={styles.editForm}>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        value={tempBrand}
                        onChange={(e) => setTempBrand(e.target.value)}
                        style={{ ...styles.editInput, flex: 1 }}
                        placeholder="Brand"
                    />
                    <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(e.target.value)}
                        style={{ ...styles.editInput, width: '100px' }}
                        placeholder="Price"
                        step="0.01"
                    />
                    <input
                        type="number"
                        value={tempQuantity}
                        onChange={(e) => setTempQuantity(e.target.value)}
                        style={{ ...styles.editInput, width: '80px' }}
                        placeholder="Quantity"
                    />
                    <input
                        type="text"
                        value={tempProcessor}
                        onChange={(e) => setTempProcessor(e.target.value)}
                        style={{ ...styles.editInput, flex: 1 }}
                        placeholder="Processor"
                    />
                    <button onClick={handleSave} style={styles.saveButton}>Save</button>
                    <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div
            style={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.content}>
                <div style={styles.info}>
                    <h3 style={styles.title}>{brand}</h3>
                    <p style={styles.details}>
                        <strong>Processor:</strong> {processor} | <strong>Price:</strong> <span style={styles.price}>${price.toFixed(2)}</span> | <strong>Quantity:</strong> {quantity}
                    </p>
                </div>
                {isAdmin && (
                    <div style={styles.buttonGroup}>
                        <button
                            onClick={() => setIsEditing(true)}
                            style={styles.editButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#ffc10720'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2a2a2a'}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(id)}
                            style={styles.deleteButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#dc354520'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2a2a2a'}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Laptop;