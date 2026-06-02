"use client";

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}
        >
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => onRemove(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
