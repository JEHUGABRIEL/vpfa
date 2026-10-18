export default function AdminLoading() {
  return (
    <div className="adm-loading" role="status" aria-live="polite">
      <span className="adm-sr">Chargement…</span>
      <div className="adm-skel" style={{ height: 44, width: "40%" }} />
      <div className="adm-skel" style={{ height: 96 }} />
      <div className="adm-skel" style={{ height: 320 }} />
    </div>
  );
}
