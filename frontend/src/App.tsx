import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

type EmergencyContact = {
  name: string;
  phone: string;
  relationship: string;
};

type MedicalProfile = {
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyContacts: EmergencyContact[];
  notes: string;
};

type UserProfile = {
  id: string;
  wixMemberId: string;
  email: string;
  fullName: string;
  planStatus: string;
  medicalProfile?: MedicalProfile;
};

const WIX_API_BASE = 'https://www.ldcvertextech.com/_functions';
const WIX_MEDICAL_PROFILE_URL = 'https://www.ldcvertextech.com/myperfilmedico';

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
          El dashboard ahora consulta el perfil médico guardado en Wix.
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
  const [publicId, setPublicId] = useState('');
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
          `${WIX_API_BASE}/medicalProfile?userId=${encodeURIComponent(userId)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'No se pudo obtener el perfil médico.');
        }

        setPublicId(data.publicId || '');

        setUser({
          id: userId,
          wixMemberId: userId,
          email: '',
          fullName: 'Usuario',
          planStatus: 'Activo',
          medicalProfile: {
            bloodType: data.bloodType || '',
            allergies: data.allergies
              ? data.allergies.split(',').map((item: string) => item.trim()).filter(Boolean)
              : [],
            conditions: data.conditions
              ? data.conditions.split(',').map((item: string) => item.trim()).filter(Boolean)
              : [],
            medications: data.medications
              ? data.medications.split(',').map((item: string) => item.trim()).filter(Boolean)
              : [],
            emergencyContacts:
              data.emergencyName || data.emergencyPhone || data.emergencyRelation
                ? [
                    {
                      name: data.emergencyName || '',
                      phone: data.emergencyPhone || '',
                      relationship: data.emergencyRelation || '',
                    },
                  ]
                : [],
            notes: data.notes || '',
          },
        });
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
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
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
            Aqui encontraras informacion del Perfil Medico.
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
              <h2 style={{ marginTop: 0, color: '#222' }}>Datos del usuario</h2>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Plan:</strong> {user.planStatus}</p>
              <p><strong>Public ID:</strong> {publicId || 'No generado aún'}</p>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#222' }}>Perfil médico actual</h2>
              <p><strong>Tipo de sangre:</strong> {user.medicalProfile?.bloodType || 'N/A'}</p>
              <p><strong>Alergias:</strong> {user.medicalProfile?.allergies.join(', ') || 'N/A'}</p>
              <p><strong>Condiciones:</strong> {user.medicalProfile?.conditions.join(', ') || 'N/A'}</p>
              <p><strong>Medicamentos:</strong> {user.medicalProfile?.medications.join(', ') || 'N/A'}</p>
              <p><strong>Notas:</strong> {user.medicalProfile?.notes || 'N/A'}</p>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#222' }}>Contacto de emergencia</h2>
              {user.medicalProfile?.emergencyContacts.length ? (
                <>
                  <p><strong>Nombre:</strong> {user.medicalProfile.emergencyContacts[0].name}</p>
                  <p><strong>Teléfono:</strong> {user.medicalProfile.emergencyContacts[0].phone}</p>
                  <p><strong>Relación:</strong> {user.medicalProfile.emergencyContacts[0].relationship}</p>
                </>
              ) : (
                <p>No hay contacto de emergencia registrado.</p>
              )}
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ marginTop: 0, color: '#222' }}>Acciones</h2>

              <button
                onClick={() => {
                  window.location.href = WIX_MEDICAL_PROFILE_URL;
                }}
                style={{
                  background: '#c62828',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  marginRight: '10px',
                }}
              >
                Editar perfil en Wix
              </button>

              <button
                disabled
                style={{
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  cursor: 'not-allowed',
                  fontWeight: 700,
                  opacity: 0.7,
                }}
              >
                Ver mi QR
              </button>

              <p style={{ marginTop: '16px', color: '#555' }}>
                El QR se conectará después con <strong>publicId</strong>.
              </p>
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

function ProfilePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7fb',
        fontFamily: 'Arial, sans-serif',
        padding: '32px',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <h1 style={{ color: '#c62828', marginTop: 0 }}>Perfil médico</h1>
        <p style={{ color: '#555' }}>
          La edición del perfil médico ahora se realiza en Wix Members Area.
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.href = WIX_MEDICAL_PROFILE_URL;
          }}
          style={{
            background: '#c62828',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 700,
            marginTop: '16px',
          }}
        >
          Ir a mi perfil médico en Wix
        </button>

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
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}