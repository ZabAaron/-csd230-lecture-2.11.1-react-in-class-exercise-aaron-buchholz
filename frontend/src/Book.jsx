import { useState } from 'react';

function Book({ id, title, author, price, copies, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editAuthor, setEditAuthor] = useState(author);
    const [editPrice, setEditPrice] = useState(price);
    const [editCopies, setEditCopies] = useState(copies || 1);

    const handleUpdate = () => {
        const updatedBook = {
            id: id,
            title: editTitle,
            author: editAuthor,
            price: parseFloat(editPrice),
            copies: parseInt(editCopies, 10)
        };

        onUpdate(id, updatedBook);
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
                <h3 style={{ color: '#856404', marginTop: '0' }}>Edit Book</h3>

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
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Author:</label>
                    <input
                        type="text"
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
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

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '3px' }}>Copies:</label>
                    <input
                        type="number"
                        value={editCopies}
                        onChange={(e) => setEditCopies(e.target.value)}
                        min="1"
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

    return (
        <div style={{
            border: '2px solid #dc3545',  // Red border
            margin: '10px',
            padding: '15px',
            width: '280px',
            backgroundColor: '#ffffff',  // White background
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            color: '#333333'
        }}>
            <h3 style={{
                color: '#dc3545',
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
                    <strong style={{ color: '#dc3545' }}>Author:</strong> {author || 'Unknown'}
                </p>
                <p style={{ margin: '5px 0', color: '#333333' }}>
                    <strong style={{ color: '#dc3545' }}>Price:</strong> ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
                </p>
                <p style={{ margin: '5px 0', color: '#333333' }}>
                    <strong style={{ color: '#dc3545' }}>Copies:</strong> {copies || 1}
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

export default Book;