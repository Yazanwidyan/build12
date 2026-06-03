export default function TekiCharacter({
  size = 80,
  mood = "happy",
  className = "",
}) {
  return (
    <img
      src="/techiv2.png"
      alt="TEKI"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
