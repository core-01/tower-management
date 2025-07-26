import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = loginUser(username, password);
        if (success) {
            navigate('/dashboard');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Tower Management Login</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleLogin(e);
                        }}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
