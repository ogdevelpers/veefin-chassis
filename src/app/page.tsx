
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ position: "relative", width: "1920px", height: "1080px" }}>
      <iframe
        src="https://player.cloudinary.com/embed/?cloud_name=dzyg5bubn&public_id=Veefin_Intro_Screen_t9fbf5&profile=cld-looping&autoplay=true&controls=false"
        width="1920"
        height="1080"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        style={{ border: "none" }}
      ></iframe>
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
