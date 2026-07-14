# Higgsfield — Hero Background Loop (Dark Mode / Neon Green UI)

Colocar o vídeo final em: `public/videos/hero-loop.mp4`

## Prompt principal

```
Cinematic live-action background plate for a premium dark-mode website hero.

SCENE: An empty winding asphalt road cutting through a dense, misty pine
forest in volcanic mountain terrain at first light. Low rolling fog hugs
the ground and drifts slowly between dark tree trunks. Fallen red blossoms
scattered on the wet asphalt. No people, no vehicles.

CAMERA: Ultra-slow forward dolly drift at walking-pace-divided-by-ten,
35mm anamorphic lens, eye-level, perfectly stable, subtle parallax between
foreground branches and background mist. No pans, no tilts, no zooms,
no camera shake.

LIGHTING & GRADE: Pre-dawn blue-green hour. Soft volumetric god rays
piercing the canopy from screen-right at a low angle. Moody desaturated
teal-green palette, deep crushed blacks (#0a0e0c), midtones kept dark,
highlights soft and never clipped — the frame must stay dark enough for
white text and neon-green (#2ce66f) UI elements to pop on top of it.
Filmic grain, gentle halation on highlights, high-end automotive
commercial look.

MOTION: Fog rolling slowly left to right, faint mist particles floating
in the light shafts, micro-movement of leaves and branches in a light
breeze, occasional slow drip of condensation. Everything at 20-30% of
natural speed — hypnotic and calm.

LOOP: Seamless 10-second loop. First and last frames identical in fog
position, light and camera placement. No cuts, no fades.

NEGATIVE: no people, no animals crossing frame, no vehicles, no text,
no logos, no watermark, no lens flare crossing frame center, no flicker,
no exposure pumping, no fast motion, no birds, no rain, no oversaturated
greens, no bright sky.

TECH: 16:9, 4K, 24 fps, duration 10 s, loop = true, motion strength: low (0.3)
```

## Variante alternativa (montanha ao amanhecer)

```
Same technical, camera, grade, loop and negative constraints as above, but:

SCENE: A high mountain ridge above a sea of clouds at dawn, jagged dark
volcanic peaks silhouetted in layers of atmospheric haze. A thin ribbon
of dirt road visible on the ridge line. Clouds below drift almost
imperceptibly; a faint warm glow builds on the horizon behind cold
teal-green atmosphere, kept dim so the dark UI theme dominates.
```

## Notas de integração

- O componente `VideoBackground.tsx` já tem `<video autoPlay muted loop playsInline>` a apontar para `/videos/hero-loop.mp4`, com poster de fallback e dois véus de gradiente por cima — não é preciso gerar o vídeo já escuro ao ponto de perder detalhe; os véus tratam do contraste final.
- Exportar em H.264 (mp4), bitrate ~8–12 Mbps para 4K; se o ficheiro passar dos ~15 MB, gerar também uma versão 1080p para mobile.
