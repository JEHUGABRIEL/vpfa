import Image from "next/image";

export default function Loading() {
  return (
    <section className="page-loading" role="status" aria-live="polite">
      <span className="page-loading-mark" aria-hidden="true">
        <Image src="/images/logo.jpg" alt="" width={72} height={72} />
      </span>
      <p>Chargement…</p>
    </section>
  );
}
