import { useState } from 'react';

function MagazineForm({ onMagazineAdded }) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [orderQty, setOrderQty] = useState('');
    const [copies, setCopies] = useState('');
    const [currentIssue, setCurrentIssue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure we have valid numbers, not empty strings
        const newMagazine = {
            title: title.trim(),
            price: price === '' ? 0 : parseFloat(price),
            orderQty: orderQty === '' ? 0 : parseInt(orderQty, 10),
            copies: copies === '' ? 1 : parseInt(copies, 10),
        };

        // Only add currentIssue if it has a value
        if (currentIssue) {
            newMagazine.currentIssue = currentIssue;
        }

        console.log('Sending magazine:', newMagazine); // For debugging

        fetch('/api/magazines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMagazine),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then(savedMagazine => {
                alert("Magazine Saved!");
                onMagazineAdded(savedMagazine);
                // Reset form
                setTitle('');
                setPrice('');
                setCopies('');
                setOrderQty('');
                setCurrentIssue('');
            })
            .catch(error => {
                console.error('Error saving magazine:', error);
                alert('Error saving magazine: ' + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{
            border: '2px solid #2e7d32',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: '#ffffff', // White background
            color: '#333333', // Dark gray text
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{
                color: '#2e7d32',
                marginTop: '0',
                marginBottom: '20px',
                fontSize: '1.5rem'
            }}>
                Add New Magazine
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{
                        minWidth: '120px',
                        fontWeight: 'bold',
                        color: '#333333'
                    }}>
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            flex: '1',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{
                        minWidth: '120px',
                        fontWeight: 'bold',
                        color: '#333333'
                    }}>
                        Price ($):
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01"
                        min="0"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            width: '150px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{
                        minWidth: '120px',
                        fontWeight: 'bold',
                        color: '#333333'
                    }}>
                        Order Quantity:
                    </label>
                    <input
                        type="number"
                        value={orderQty}
                        onChange={(e) => setOrderQty(e.target.value)}
                        required
                        min="0"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            width: '150px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{
                        minWidth: '120px',
                        fontWeight: 'bold',
                        color: '#333333'
                    }}>
                        Copies:
                    </label>
                    <input
                        type="number"
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                        required
                        min="1"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            width: '150px',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{
                        minWidth: '120px',
                        fontWeight: 'bold',
                        color: '#333333'
                    }}>
                        Current Issue:
                    </label>
                    <input
                        type="datetime-local"
                        value={currentIssue}
                        onChange={(e) => setCurrentIssue(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #cccccc',
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#2e7d32',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#1b5e20'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#2e7d32'}
                    >
                        Save to Database
                    </button>
                </div>
            </div>
        </form>
    );
}

export default MagazineForm;