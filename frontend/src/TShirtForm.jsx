import { useState } from 'react';
import api from './api/axiosConfig';

function TShirtForm({ onTShirtAdded }) {
    const [size, setSize] = useState('M');
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);
    const [sleeveLength, setSleeveLength] = useState('Short');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTShirt = {
            size,
            price: parseFloat(price),
            copies: parseInt(copies),
            sleeveLength
        };

        api.post('/tshirts', newTShirt)
            .then(res => {
                alert("T-Shirt Saved!");
                onTShirtAdded(res.data);
                setSize('M');
                setPrice(0);
                setCopies(1);
                setSleeveLength('Short');
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid purple', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New T-Shirt</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>Size
                    <select value={size} onChange={(e) => setSize(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </label>
                <label>Price ($)
                    <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ marginLeft: '10px' }} />
                </label>
                <label>Copies
                    <input type="number" min="1" value={copies} onChange={(e) => setCopies(e.target.value)} required style={{ marginLeft: '10px' }} />
                </label>
                <label>Sleeve Length
                    <select value={sleeveLength} onChange={(e) => setSleeveLength(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="Short">Short</option>
                        <option value="Long">Long</option>
                        <option value="3/4">3/4</option>
                    </select>
                </label>
                <button type="submit">Save to Database</button>
            </div>
        </form>
    );
}

export default TShirtForm;
