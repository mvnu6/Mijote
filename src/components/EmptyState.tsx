export function EmptyState({
  message = "Aucun résultat",
}: {
  message?: string;
}) {
  return (
    <div className="state-container empty-state">
      <p> {message}</p>
    </div>
  );
}
