function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          border: "4px solid red",
          padding: "40px",
          borderRadius: "20px",
        }}
      >
        <h1 style={{ fontSize: "42px", color: "red", marginBottom: "20px" }}>
          EMERGENCYQR FUNCIONANDO
        </h1>
        <p style={{ fontSize: "24px" }}>
          Si ves este texto, tu app ya quedó desplegada.
        </p>
      </div>
    </div>
  );
}

export default App;
