function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ color: "#c62828", marginBottom: "12px" }}>
          EmergencyQR
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "8px" }}>
          Plataforma de información médica en caso de emergencia
        </p>
        <p style={{ color: "#555" }}>
          Sitio base desplegado correctamente en Azure Static Web Apps.
        </p>
      </div>
    </div>
  );
}

export default App;