// frontend/src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import api from './api/axiosConfig'
import { useAuth } from './auth/AuthProvider'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Book from './Book'
import BookForm from './BookForm'
import Magazine from './Magazine'
import MagazineForm from './MagazineForm'
import Laptop from './Laptop'
import LaptopForm from './LaptopForm'
import Phone from './Phone'
import PhoneForm from './PhoneForm'

function App() {
    const { token, isAdmin } = useAuth();
    const [books, setBooks] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [laptops, setLaptops] = useState([]);
    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        Promise.all([
            api.get('/books').then(res => res.data),
            api.get('/magazines').then(res => res.data),
            api.get('/laptops').then(res => res.data),
            api.get('/phones').then(res => res.data)
        ]).then(([bookData, magazineData, laptopData, phoneData]) => {
            setBooks(bookData);
            setMagazines(magazineData);
            setLaptops(laptopData);
            setPhones(phoneData);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [token]);

    const handleAddBook = (newBook) => setBooks([...books, newBook]);

    const handleDeleteBook = (id) => {
        if (!window.confirm("Delete this book?")) return;
        api.delete(`/books/${id}`).then(() => setBooks(books.filter(b => b.id !== id)));
    };

    const handleUpdateBook = (id, updatedData) => {
        api.put(`/books/${id}`, updatedData)
            .then(res => setBooks(books.map(b => (b.id === id ? res.data : b))));
    };

    const handleAddMagazine = (item) => setMagazines([...magazines, item]);

    const handleDeleteMagazine = (id) => {
        if (!window.confirm("Delete this magazine?")) return;
        api.delete(`/magazines/${id}`).then(() => setMagazines(magazines.filter(m => m.id !== id)));
    };

    const handleUpdateMagazine = (id, updatedData) => {
        api.put(`/magazines/${id}`, updatedData)
            .then(res => setMagazines(magazines.map(m => (m.id === id ? res.data : m))));
    };

    const handleAddLaptop = (item) => setLaptops([...laptops, item]);

    const handleDeleteLaptop = (id) => {
        if (!window.confirm("Delete this laptop?")) return;
        api.delete(`/laptops/${id}`).then(() => setLaptops(laptops.filter(t => t.id !== id)));
    };

    const handleUpdateLaptop = (id, updatedData) => {
        api.put(`/laptops/${id}`, updatedData)
            .then(res => setLaptops(laptops.map(t => (t.id === id ? res.data : t))));
    };

    const handleAddPhone = (item) => setPhones([...phones, item]);

    const handleDeletePhone = (id) => {
        if (!window.confirm("Delete this phone?")) return;
        api.delete(`/phones/${id}`).then(() => setPhones(phones.filter(j => j.id !== id)));
    };

    const handleUpdatePhone = (id, updatedData) => {
        api.put(`/phones/${id}`, updatedData)
            .then(res => setPhones(phones.map(j => (j.id === id ? res.data : j))));
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        },
        main: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
        },
        loading: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            color: '#00adb5',
            fontSize: '1.5rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        },
        pageTitle: {
            color: '#ffffff',
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #fff 0%, #00adb5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.main}>
                <Navbar />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />

                    <Route path="/inventory" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Book Inventory</h1>
                                {books.map((b) => (
                                    <Book key={b.id} {...b} isAdmin={isAdmin} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />
                                ))}
                                {books.length === 0 && (
                                    <div style={{ textAlign: 'center', color: '#6c6c6c', padding: '40px' }}>
                                        No books in inventory
                                    </div>
                                )}
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/add" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Add a Book</h1>
                                <BookForm onBookAdded={handleAddBook} />
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/magazines" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Magazine Inventory</h1>
                                {magazines.map((m) => (
                                    <Magazine key={m.id} {...m} isAdmin={isAdmin} onDelete={handleDeleteMagazine} onUpdate={handleUpdateMagazine} />
                                ))}
                                {magazines.length === 0 && (
                                    <div style={{ textAlign: 'center', color: '#6c6c6c', padding: '40px' }}>
                                        No magazines in inventory
                                    </div>
                                )}
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/add-magazine" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Add a Magazine</h1>
                                <MagazineForm onMagazineAdded={handleAddMagazine} />
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/laptops" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Laptop Inventory</h1>
                                {laptops.map((t) => (
                                    <Laptop key={t.id} {...t} isAdmin={isAdmin} onDelete={handleDeleteLaptop} onUpdate={handleUpdateLaptop} />
                                ))}
                                {laptops.length === 0 && (
                                    <div style={{ textAlign: 'center', color: '#6c6c6c', padding: '40px' }}>
                                        No laptops in inventory
                                    </div>
                                )}
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/add-laptop" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Add a Laptop</h1>
                                <LaptopForm onLaptopAdded={handleAddLaptop} />
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/phones" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Phone Inventory</h1>
                                {phones.map((j) => (
                                    <Phone key={j.id} {...j} isAdmin={isAdmin} onDelete={handleDeletePhone} onUpdate={handleUpdatePhone} />
                                ))}
                                {phones.length === 0 && (
                                    <div style={{ textAlign: 'center', color: '#6c6c6c', padding: '40px' }}>
                                        No phones in inventory
                                    </div>
                                )}
                            </div>
                        </ProtectedRoute>
                    } />

                    <Route path="/add-phone" element={
                        <ProtectedRoute>
                            <div>
                                <h1 style={styles.pageTitle}>Add a Phone</h1>
                                <PhoneForm onPhoneAdded={handleAddPhone} />
                            </div>
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </div>
    )
}

export default App