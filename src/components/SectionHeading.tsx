import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker: string;
  title: ReactNode;
  intro?: string;
  light?: boolean;
  center?: boolean;
};

export function SectionHeading({
  kicker,
  title,
  intro,
  light = false,
  center = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`st${light ? " light" : ""}${center ? " center" : ""}`}
    >
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
