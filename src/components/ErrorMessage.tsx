export function ErrorMessage({
  message = "Une erreur est survenue",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="state-container error-state">
      <p> {message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-retry">
          Réessayer
        </button>
      )}
    </div>
  );
}
