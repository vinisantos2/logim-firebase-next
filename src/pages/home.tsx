'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../lib/firebase';
import { ref, onValue } from "firebase/database";
import { Movimentacao } from '../types/movimentacao';
import ItemMovimentacao from '../components/itemMovimentacao';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<Movimentacao[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const dbRef = ref(database, "/movimentacoes/" + auth.currentUser.uid);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const movArray: Movimentacao[] = Object.values(val);
        setData(movArray);
      } else {
        setData([]);
      }
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{
      maxWidth: 900,
      margin: '40px auto',
      padding: 20,
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    }}>
      <h1 style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 10 }}>
        Bem-vindo, {user?.email}
      </h1>

      <button
        onClick={() => auth.signOut().then(() => router.push('/'))}
        style={{
          backgroundColor: '#ff4d4f',
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          fontWeight: 'bold',
          borderRadius: 5,
          cursor: 'pointer',
          marginBottom: 30,
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#d9363e')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#ff4d4f')}
      >
        Sair
      </button>

      <section>
        <h2 style={{ marginBottom: 20, borderBottom: '2px solid #ccc', paddingBottom: 5 }}>
          Movimentações
        </h2>

        {data.length === 0 && (
          <p style={{ fontStyle: 'italic', color: '#777' }}>
            Sem movimentações para mostrar.
          </p>
        )}

        {data.map((mov) => (
          <ItemMovimentacao key={mov.id} mov={mov} />
        ))}
      </section>
    </div>
  );
}
