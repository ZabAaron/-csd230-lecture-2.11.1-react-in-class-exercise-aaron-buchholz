import { useState } from 'react';
import api from './api/axiosConfig';

function JacketForm({ onJacketAdded }) {
    const [size, setSize] = useState('M');
    const [price, setPrice] = useState(0);
    const [copies, setCopies] = useState(1);
    const [insulated, setInsulated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newJacket = {
            size,
            price: parseFloat(price),
            copies: parseInt(copies),
            insulated
        };

        api.post('/jackets', newJacket)
            .then(res => {
                alert("Jacket Saved!");
                onJacketAdded(res.data);
                setSize('M');
                setPrice(0);
                setCopies(1);
                setInsulated(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '2px solid orange', padding: '20px', marginBottom: '20px' }}>
            <h3>Add New Jacket</h3>
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
                <label>Insulated
                    <input type="checkbox" checked={insulated} onChange={(e) => setInsulated(e.target.checked)} style={{ marginLeft: '10px' }} />
                </label>
                <button type="submit">Save to Database</button>
            </div>
        </form>
    );
}

export default JacketForm;
