import { useState } from 'react';

function BookForm({ onBookAdded }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            title: title.trim(),
            author: author.trim(),
            price: price === '' ? 0 : parseFloat(price),
            copies: copies === '' ? 1 : parseInt(copies, 10)
        };

        fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newBook),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.json();
            })
            .then(savedBook => {
                alert("Book Saved!");
                onBookAdded(savedBook);
                setTitle('');
                setAuthor('');
                setPrice('');
                setCopies('');
            })
            .catch(error => {
                console.error('Error saving book:', error);
                alert('Error saving book: ' + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{
            border: '2px solid #000000',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            color: '#000000'
        }}>
            <h3 style={{ color: '#000000', marginTop: '0', marginBottom: '20px' }}>Add New Book</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ minWidth: '100px', fontWeight: 'bold', color: '#000000' }}>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            flex: '1'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ minWidth: '100px', fontWeight: 'bold', color: '#000000' }}>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            flex: '1'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ minWidth: '100px', fontWeight: 'bold', color: '#000000' }}>Price ($):</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01"
                        min="0"
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            width: '150px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ minWidth: '100px', fontWeight: 'bold', color: '#000000' }}>Copies:</label>
                    <input
                        type="number"
                        value={copies}
                        onChange={(e) => setCopies(e.target.value)}
                        required
                        min="1"
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #000000',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            width: '150px'
                        }}
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        Save to Database
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BookForm;