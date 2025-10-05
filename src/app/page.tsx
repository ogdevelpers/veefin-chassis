
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "1920px", height: "1080px" }}>
      <video
  src="https://res.cloudinary.com/dzyg5bubn/video/upload/v1759668050/Veefin_Intro_Screen_ryhw8x.mp4"
  width="1920"
  height="1080"
  autoPlay
  muted
  loop
  playsInline
  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
/>
      <Link
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "1920px",
          height: "1080px",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          zIndex: 2,
          cursor: "pointer",
          border: "20px solid red"
        }}
        href="/architecture"
        aria-label="Invisible Center Link"
      >
        Center Link
      </Link>
    </div>
  );
}
