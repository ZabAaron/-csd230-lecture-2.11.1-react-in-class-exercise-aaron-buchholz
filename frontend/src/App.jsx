import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Navbar from './Navbar'
import Home from './Home'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import './App.css'

function App() {
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/books').then(res => res.json()),
            fetch('/api/magazines').then(res => res.json())
        ]).then(([booksData, magazinesData]) => {
            setBooks(booksData);
            setMagazines(magazinesData);
            setLoading(false);
        });
    }, []);

    // Book handlers
    const handleAddBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    const handleDeleteBook = (id) => {
        if (!window.confirm("Delete this book?")) return;
        fetch(`/api/books/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setBooks(books.filter(b => b.id !== id));
            });
    };

    const handleUpdateBook = (id, updatedData) => {
        fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedBook => {
                setBooks(books.map(b => (b.id === id ? savedBook : b)));
            });
    };

    // Magazine handlers
    const handleAddMagazine = (newMagazine) => {
        setMagazines([...magazines, newMagazine]);
    };

    const handleDeleteMagazine = (id) => {
        if (!window.confirm("Delete this magazine?")) return;
        fetch(`/api/magazines/${id}`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) setMagazines(magazines.filter(m => m.id !== id));
            });
    };

    const handleUpdateMagazine = (id, updatedData) => {
        fetch(`/api/magazines/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(savedMagazine => {
                setMagazines(magazines.map(m => (m.id === id ? savedMagazine : m)));
            });
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="app-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/inventory" element={
                    <div>
                        <h1>Current Books</h1>
                        <p>Found {books.length} books and {magazines.length} magazines</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {books.map((b) => (
                                <Book
                                    key={b.id}
                                    id={b.id}
                                    title={b.title}
                                    author={b.author}
                                    price={b.price}
                                    copies={b.copies}
                                    onDelete={handleDeleteBook}
                                    onUpdate={handleUpdateBook}
                                />
                            ))}
                        </div>
                    </div>
                } />

                <Route path="/magazines" element={
                    <div>
                        <h1>Magazines</h1>
                        <p>Found {magazines.length} magazines</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {magazines.map((m) => (
                                <Magazine
                                    key={m.id}
                                    id={m.id}
                                    title={m.title}
                                    price={m.price}
                                    orderQty={m.orderQty}
                                    currentIssue={m.currentIssue}
                                    onDelete={handleDeleteMagazine}
                                    onUpdate={handleUpdateMagazine}
                                />
                            ))}
                        </div>
                    </div>
                } />

                <Route path="/add" element={
                    <div>
                        <h1>Add New Book</h1>
                        <BookForm onBookAdded={handleAddBook} />
                    </div>
                } />

                <Route path="/add-magazine" element={
                    <div>
                        <h1>Add New Magazine</h1>
                        <MagazineForm onMagazineAdded={handleAddMagazine} />
                    </div>
                } />
            </Routes>
        </div>
    )
}

export default App