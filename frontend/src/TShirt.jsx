import { useState } from 'react';

function TShirt({ id, size, price, copies, sleeveLength, isAdmin, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempSize, setTempSize] = useState(size);
    const [tempPrice, setTempPrice] = useState(price);
    const [tempCopies, setTempCopies] = useState(copies);
    const [tempSleeveLength, setTempSleeveLength] = useState(sleeveLength);

    const handleSave = () => {
        const updated = {
            id,
            size: tempSize,
            price: parseFloat(tempPrice),
            copies: parseInt(tempCopies),
            sleeveLength: tempSleeveLength
        };
        onUpdate(id, updated);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div style={{ border: '2px solid #4444ff', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', gap: '10px', backgroundColor: '#eef' }}>
                <input type="text" value={tempSize} onChange={(e) => setTempSize(e.target.value)} placeholder="Size" style={{ width: '60px' }} />
                <input type="number" value={tempPrice} onChange={(e) => setTempPrice(e.target.value)} style={{ width: '80px' }} />
                <input type="number" value={tempCopies} onChange={(e) => setTempCopies(e.target.value)} style={{ width: '60px' }} />
                <input type="text" value={tempSleeveLength} onChange={(e) => setTempSleeveLength(e.target.value)} placeholder="Sleeve" />
                <button onClick={handleSave} style={{ backgroundColor: '#28a745', color: 'white' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ backgroundColor: '#6c757d', color: 'white' }}>Cancel</button>
            </div>
        );
    }

    return (
        <div style={{ border: '1px solid #ccc', margin: '10px 0', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
            <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>T-Shirt - {size}</h3>
                <p style={{ margin: '0' }}>
                    <strong>Price:</strong> ${price.toFixed(2)} | <strong>Copies:</strong> {copies} | <strong>Sleeve:</strong> {sleeveLength}
                </p>
            </div>
            {isAdmin && (
                <div>
                    <button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#ffc107', marginRight: '5px' }}>Edit</button>
                    <button onClick={() => onDelete(id)} style={{ backgroundColor: '#ff4444', color: 'white' }}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default TShirt;
