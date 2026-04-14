import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

type UserProfile = {
  id: string;
  wixMemberId: string;
  email: string;
  fullName: string;
  planStatus: string;
};

function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          maxWidth: '700px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#c62828', marginBottom: '12px' }}>EmergencyQR</h1>
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>
          Plataforma de información médica en caso de emergencia
        </p>
        <p style={{ color: '#555', marginBottom: '24px' }}>
          Sitio base desplegado correctamente en Azure Static Web Apps.
        </p>

        <Link
          to="/dashboard?userId=17f2c59b-79e3-4009-a759-a04fb34fd3f0"
          style={{
            display: 'inline-block',
            background: '#c62828',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          Probar dashboard real
        </Link>
      </div>
    </div>
  );
}

function DashboardPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId') || '';

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!userId) {
        setError('No se recibió userId en la URL.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          'https://azurefunction-emergencyqr-dev-hzh9g7c2eeezf7h7.mexicocentral-01.azurewebsites.net/api/get-user-profile',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo obtener el perfil del usuario.');
        }

        setUser(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [userId]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#eef2f7',
        fontFamily: 'Arial, sans-serif',
        padding: '32px',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: '#c62828',
            color: '#fff',
            borderRadius: '20px',
            padding: '28px',
            marginBottom: '24px',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '32px' }}>Bienvenido a EmergencyQR</h1>
          <p style={{ marginTop: '10px', marginBottom: 0, opacity: 0.95 }}>
            Tu acceso a información médica crítica ya está conectado con Wix.
          </p>
        </div>

        {loading && (
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            }}
          >
            Cargando perfil del usuario...
          </div>
        )}

        {!loading && error && (
          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              color: '#c62828',
              fontWeight: 700,
            }}
          >
            Error: {error}
          </div>
        )}

        {!loading && !error && user && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#222' }}>Datos de la sesión</h2>
              <p><strong>Nombre:</strong> {user.fullName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Plan:</strong> {user.planStatus}</p>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#222' }}>Siguiente paso</h2>
              <p>Ahora sigue capturar y guardar el perfil médico del usuario.</p>
              <button
                style={{
                  background: '#c62828',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Completar perfil médico
              </button>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#222' }}>QR personal</h2>
              <p>Aquí después mostraremos el QR de acceso médico del usuario.</p>
              <button
                style={{
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Ver mi QR
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <Link
            to="/"
            style={{
              color: '#c62828',
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}