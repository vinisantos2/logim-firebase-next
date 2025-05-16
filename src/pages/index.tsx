'use client';
//src/pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, loginWithGoogle } from '../lib/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const camposValidos = () => {
        if (!email.includes('@') || !email.includes('.')) {
            toast.error('Digite um e-mail válido.');
            return false;
        }

        if (password.length < 5) {
            toast.error('Senha deve ter pelo menos 5 caracteres.');
            return false;
        }

        return true;
    };



    const handleLogin = async () => {

        if (!camposValidos()) return;

        setLoading(true);
        try {
            await loginWithEmail(email, password);
            toast.success('Login realizado com sucesso!');
            router.push('/home');
        } catch (e) {
            setLoading(false);
            if (e instanceof Error && 'code' in e) {
                switch ((e as any).code) {
                    case 'auth/invalid-email':
                        toast.error('Email inválido');
                        break;
                    case 'auth/user-not-found':
                        toast.error('Usuário não encontrado');
                        break;
                    case 'auth/wrong-password':
                        toast.error('Senha incorreta');
                        break;
                    case 'auth/too-many-requests':
                        toast.error('Muitas tentativas. Tente novamente mais tarde.');
                        break;
                    default:
                        toast.error('Erro ao fazer login. Verifique suas credenciais.');
                        console.error(e);
                }
            } else {
                toast.error('Erro desconhecido ao fazer login.');
                console.error(e);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            toast.success('Login com Google realizado com sucesso!');
            router.push('/home');
        } catch (e) {
            setLoading(false);
            toast.error('Erro no login com Google');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Entrar</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 mb-4 transition"
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50 transition"
                >
                    {loading ? 'Carregando...' : 'Entrar com Google'}
                </button>
            </div>
        </div>
    );
}
