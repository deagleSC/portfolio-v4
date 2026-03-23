import { ImageResponse } from "next/og";
import info from "@/data/info.json";
import { siteOrigin } from "@/lib/site";

export const runtime = "edge";

export const alt = `${info.name} — ${info.designation} @ ${info.company}`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const headline = `${info.designation} @ ${info.company}`;

const blurb =
  info.summary.length > 220
    ? `${info.summary.slice(0, 217).trim()}…`
    : info.summary;

export default function OpenGraphImage() {
  const origin = siteOrigin();

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        background:
          "linear-gradient(135deg, #0c0f0d 0%, #142018 55%, #0f1a14 100%)",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px 48px 56px 64px",
          maxWidth: "720px",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {info.name}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: "#6eb89a",
            marginTop: 20,
            letterSpacing: "-0.01em",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginTop: 28,
            lineHeight: 1.45,
          }}
        >
          {blurb}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#64748b",
            marginTop: 36,
          }}
        >
          supratikch.com
        </div>
      </div>
      <div
        style={{
          width: 440,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 56,
        }}
      >
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: "50%",
            border: "6px solid #6eb89a",
            overflow: "hidden",
            display: "flex",
            boxShadow: "0 12px 48px rgba(0,0,0,0.45)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${origin}/profile.png`}
            alt=""
            width={340}
            height={340}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>,
    { ...size },
  );
}
