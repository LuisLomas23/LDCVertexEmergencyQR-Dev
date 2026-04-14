import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
              <h2 style={{ marginTop: 0, color: '#222' }}>Perfil médico</h2>
              <p>
                {user.medicalProfile
                  ? 'Ya existe un perfil médico guardado. Puedes editarlo.'
                  : 'Aún no has completado tu perfil médico.'}
              </p>
              <button
                onClick={() => navigate(`/profile?userId=${encodeURIComponent(user.id)}`)}
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
                {user.medicalProfile ? 'Editar perfil médico' : 'Completar perfil médico'}
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

function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId') || '';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRelationship, setContactRelationship] = useState('');
  const [notes, setNotes] = useState('');

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
          throw new Error(data.error || 'No se pudo cargar el perfil.');
        }

        const profile = data.medicalProfile;

        if (profile) {
          setBloodType(profile.bloodType || '');
          setAllergies((profile.allergies || []).join(', '));
          setConditions((profile.conditions || []).join(', '));
          setMedications((profile.medications || []).join(', '));

          if (profile.emergencyContacts && profile.emergencyContacts.length > 0) {
            const firstContact = profile.emergencyContacts[0];
            setContactName(firstContact.name || '');
            setContactPhone(firstContact.phone || '');
            setContactRelationship(firstContact.relationship || '');
          }

          setNotes(profile.notes || '');
        }
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const payload = {
        userId,
        bloodType,
        allergies: allergies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        conditions: conditions
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        medications: medications
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
        emergencyContacts: contactName || contactPhone || contactRelationship
          ? [
              {
                name: contactName,
                phone: contactPhone,
                relationship: contactRelationship,
              },
            ]
          : [],
        notes,
      };

      const response = await fetch(
        'https://azurefunction-emergencyqr-dev-hzh9g7c2eeezf7h7.mexicocentral-01.azurewebsites.net/api/save-profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo guardar el perfil.');
      }

      setMessage('Perfil médico guardado correctamente.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

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
          Completa la información crítica que podrá consultarse en caso de emergencia.
        </p>

        {loading && <p>Cargando perfil actual...</p>}

        {!loading && error && (
          <div style={{ color: '#c62828', fontWeight: 700, marginBottom: '16px' }}>
            Error: {error}
          </div>
        )}

        {!loading && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label><strong>Tipo de sangre</strong></label>
                <input
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  placeholder="Ej. O+"
                  style={inputStyle}
                />
              </div>

              <div>
                <label><strong>Alergias</strong></label>
                <input
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="Ej. Penicilina, mariscos"
                  style={inputStyle}
                />
              </div>

              <div>
                <label><strong>Enfermedades o condiciones</strong></label>
                <input
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  placeholder="Ej. Diabetes, hipertensión"
                  style={inputStyle}
                />
              </div>

              <div>
                <label><strong>Medicamentos</strong></label>
                <input
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="Ej. Metformina, Losartán"
                  style={inputStyle}
                />
              </div>

              <div>
                <label><strong>Nombre del contacto de emergencia</strong></label>
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Ej. María Lomas"
                  style={inputStyle}
                />
              </div>

              <div>
                <label><strong>Teléfono del contacto</strong></label>
                <input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Ej. +5213312345678"
                  style={inputStyle}
                />
              </div>

              <div>
                <label><strong>Relación</strong></label>
                <input
                  value={contactRelationship}
                  onChange={(e) => setContactRelationship(e.target.value)}
                  placeholder="Ej. Esposa, hermano"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <label><strong>Notas adicionales</strong></label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Información adicional útil en caso de emergencia"
                style={{
                  ...inputStyle,
                  minHeight: '120px',
                  resize: 'vertical',
                }}
              />
            </div>

            {message && (
              <div style={{ color: 'green', fontWeight: 700, marginTop: '16px' }}>
                {message}
              </div>
            )}

            {error && !loading && (
              <div style={{ color: '#c62828', fontWeight: 700, marginTop: '16px' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: '#c62828',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {saving ? 'Guardando...' : 'Guardar perfil'}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/dashboard?userId=${encodeURIComponent(userId)}`)}
                style={{
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Volver al dashboard
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  marginTop: '8px',
  borderRadius: '10px',
  border: '1px solid #d0d7de',
  boxSizing: 'border-box',
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}