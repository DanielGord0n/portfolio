# TellTours Showcase: Asset Slots & Higgsfield Guide

The `/showcase` scroll film works fully without any assets (everything is drawn in code).
These slots make it richer when you add them. Nothing breaks if a file is missing.

## 1. Video backplates (Higgsfield)

Drop MP4s into `public/clips/` with these exact names. They appear automatically
behind the hero and CTA, dimmed, muted, looping. No rebuild needed on Vercel,
just commit the files.

| File | Where it shows | What to generate |
|---|---|---|
| `public/clips/showcase-hero.mp4` | Behind the opening title | Slow cinematic dolly through an old European street or Toronto landmark district, golden hour, no people close to camera, no text |
| `public/clips/showcase-cta.mp4` | Behind the closing "Listen." | POV driving a coastal highway at dusk, steady, dreamy |

### Generating them in Higgsfield (via your Claude Desktop MCP)

1. Connect the Higgsfield MCP in Claude Desktop, then ask it to generate with these settings:
   - **Aspect ratio 16:9, length 5 to 8 seconds** (it loops, longer wastes credits)
   - **Camera moves**: pick ONE slow move per clip (dolly-in or lateral track). Avoid cuts; loops hide best on continuous motion
   - **No on-screen text, no logos, no faces near camera** (faces and text break the loop illusion and can render badly)
   - Style keywords that match the page: `cinematic, muted greens, golden hour, soft haze, shallow depth of field`
2. Example prompt for the hero clip:
   > Slow forward dolly through a narrow cobblestone street in an old European quarter at golden hour, warm light raking across stone facades, muted green and amber palette, cinematic, soft haze, no people in foreground, no text
3. Export/download as MP4 (H.264). Keep each under ~6 MB if possible; if Higgsfield exports large files, compress:
   `ffmpeg -i in.mp4 -an -vcodec libx264 -crf 28 -vf scale=1280:-2 public/clips/showcase-hero.mp4`
4. The free tier's watermark usually sits in a corner; the page dims clips to ~40% opacity so a corner watermark is barely visible, but a clean export is better if you have credits.

## 2. Real app screenshots (better than the code-drawn phone)

The phone in Act 2 is currently drawn in code from your real app copy. To swap in
real screens, add PNGs (around 1170x2532, no status-bar personal info):

- `src/images/showcase/screen-explore.png` (Explore / "Where to today?")
- `src/images/showcase/screen-roam.png` (Free Roam map with POIs)
- `src/images/showcase/screen-playing.png` (Now Playing narration card)

Then tell Claude "wire the real screenshots into the showcase phone" and the
three `PhoneScreen*` components get replaced with the images.

## 3. Already wired from the TellTours repo

- Brand green `#34A160` family and Instrument Serif (self-hosted in `public/fonts/`)
- `TellToursLogo.svg`, `TellToursLogo_AudioPin.svg` (the traveling pin), POI category pins
- All copy on the page is verbatim from telltours.com / the app
