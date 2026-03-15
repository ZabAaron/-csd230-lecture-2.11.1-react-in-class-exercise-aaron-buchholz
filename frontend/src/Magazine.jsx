import { useState } from 'react';

function Magazine({ id, title, price, orderQty, currentIssue, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editPrice, setEditPrice] = useState(price);
    const [editOrderQty, setEditOrderQty] = useState(orderQty);
    const [editCurrentIssue, setEditCurrentIssue] = useState(currentIssue || '');

    // Format the date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'No issue date set';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return 'Invalid date';
        }
    };

    // Format date for datetime-local input
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch (e) {
            return '';
        }
    };

    const handleUpdate = () => {
        const updatedMagazine = {
            id: id,
            title: editTitle,
            price: parseFloat(editPrice),
            orderQty: parseInt(editOrderQty, 10),
            copies: 1, // You might want to make this editable too
        };

        if (editCurrentIssue) {
            updatedMagazine.currentIssue = editCurrentIssue;
        }

        onUpdate(id, updatedMagazine);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div style={{
                border: '3px solid #ffc107',
                margin: '10px',
                padding: '15px',
                width: '280px',
                backgroundColor: '#fff9e6',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ color: '#856404', marginTop: '0' }}>Edit Magazine</h3>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Title:</label>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Price:</label>
                    <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        step="0.01"
                        min="0"
                        style={{
                            width: '100%',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Order Quantity:</label>
                    <input
                        type="number"
                        value={editOrderQty}
                        onChange={(e) => setEditOrderQty(e.target.value)}
                        min="0"
                        style={{
                            width: '100%',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Current Issue:</label>
                    <input
                        type="datetime-local"
                        value={formatDateForInput(editCurrentIssue)}
                        onChange={(e) => setEditCurrentIssue(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '5px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleUpdate}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1,
                            fontWeight: 'bold'
                        }}
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            flex: 1,
                            fontWeight: 'bold'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    // Regular display view
    return (
        <div style={{
            border: '2px solid #2e7d32',
            margin: '10px',
            padding: '15px',
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            color: '#333333'
        }}>
            <h3 style={{
                color: '#1b5e20',
                marginTop: '0',
                marginBottom: '10px',
                fontSize: '1.3rem',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '8px'
            }}>
                {title || 'Untitled'}
            </h3>

            <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '5px 0', color: '#333333' }}>
                    <strong style={{ color: '#2e7d32' }}>Price:</strong> ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
                </p>
                <p style={{ margin: '5px 0', color: '#333333' }}>
                    <strong style={{ color: '#2e7d32' }}>Order Qty:</strong> {orderQty || 0}
                </p>
                <p style={{ margin: '5px 0', color: '#333333' }}>
                    <strong style={{ color: '#2e7d32' }}>Current Issue:</strong> {formatDate(currentIssue)}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button
                    onClick={() => onDelete(id)}
                    style={{
                        backgroundColor: '#dc3545',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                    Delete
                </button>
                <button
                    onClick={() => setIsEditing(true)}
                    style={{
                        backgroundColor: '#ffc107',
                        color: '#333333',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1,
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default Magazine;