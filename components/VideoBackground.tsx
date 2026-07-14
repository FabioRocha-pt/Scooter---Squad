/*
  Fundo motion do Hero.
  O loop gerado pelo Higgsfield (ver prompts/higgsfield-hero-loop.md)
  deve ser colocado em: public/videos/hero-loop.mp4
  Enquanto o vídeo não existir, o poster mantém o visual.
*/
export default function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://www.scooter-quad.com/wp-content/uploads/2024/03/scooter-home.jpg"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* véus: legibilidade do texto + fazer o néon sobressair */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/40 to-night" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,transparent_0%,rgba(10,14,12,0.55)_100%)]" />
    </div>
  );
}
