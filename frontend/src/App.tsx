import { Routes, Route, Link, useLocation } from 'react-router-dom';

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
          to="/dashboard?userId=test123&fullName=Luis%20Lomas&email=luis.d.lomas@gmail.com"
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
          Probar dashboard
        </Link>
      </div>
    </div>
  );
}

function DashboardPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const userId = params.get('userId') || '';
  const fullName = params.get('fullName') || 'Usuario';
  const email = params.get('email') || 'Sin email';

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
            <p><strong>Nombre:</strong> {fullName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>User ID:</strong> {userId}</p>
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