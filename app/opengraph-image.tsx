import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { theme } from "@/lib/theme";

export const alt = `${profile.name} - ${profile.role}, ${profile.focus}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { headline, role, focus, name } = profile;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: theme.paper,
          color: theme.ink,
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: theme.accent,
          }}
        >
          {role} · {focus}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.0 }}>
          <span>
            {headline.lead}{" "}
            <span style={{ color: theme.accent, fontStyle: "italic" }}>{headline.emphasis}</span>
          </span>
          <span>{headline.trail}</span>
        </div>
        <div style={{ fontSize: 30, color: theme.muted }}>{name}</div>
      </div>
    ),
    { ...size },
  );
}
