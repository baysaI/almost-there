# ALMOST THERE

**A PS1-style psychological horror game by Mehmet Baysal.**

A man lives alone in a house that keeps rearranging itself around a single night.
Every morning the alarm rings at 7:00. Every morning there are three mugs.
Five days. One road. You will not get a straight answer, and that is the point.

▶ **Play in the browser:** https://baysaI.github.io/almost-there/
⬇ **Windows download:** see [Releases](../../releases). The game asks if you are sure before it opens. Say yes.

> Content warning: grief, loss of family, a car crash, blood, sudden loud jumpscares and flashing lights.
> Play with headphones, in the dark, alone.

---

## Controls

| | |
|---|---|
| Move | `W A S D` |
| Look | Mouse |
| Interact | `E` |
| Pause / settings | `Esc` |
| Fullscreen (desktop build) | `F11` |

Touch screens are supported: left side walks, right side looks, `USE` interacts.

## Features

- **Five days and a prologue**, each one worse than the last.
- **No straight story.** Notes, letters, police reports and voicemails contradict each other. The player builds their own theory.
- **English and Turkish**: the whole game, including the writing on the walls, is translated (Settings → Language).
- **Chapters** unlock after you finish the game.
- Hidden things for people who look too closely. Some of them look back.

## How it's made

The whole game is **one HTML file**: no image files, no models, no build step.

- **three.js r128** with a hand-written PS1 shader: per-vertex lighting, snapped vertices, a 360p render target, ordered dithering, VHS noise and vignette in a post pass.
- **Every texture is drawn in code** on a `<canvas>` at load time: wood, wallpaper, the photos, the children's drawings, the blood writing (letters are rasterised, then bled, dripped and crusted pixel by pixel).
- **Silhouettes** are rendered in a separate full-resolution pass, depth-tested against the low-res scene, so they stay sharp while the world stays crunchy.
- **A mirror that is one second late**: the reflection is a second camera with the player's movement delayed through a history buffer.
- **Procedural audio** with the Web Audio API: music box, rain, engine hum, heartbeat, flatlining monitor, footsteps that walk through the house in 3D.
- **Recorded voices and sounds** (lullaby, screams, crying) are embedded as base64 MP3 inside the same file.
- **Save data** (settings, endings) lives in `localStorage`.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Build the Windows .exe

The desktop build wraps the game in Electron and bundles three.js and the fonts so it runs offline.

```bash
npm install
npm run dist        # → release/AlmostThere-1.0.0-x64-portable.exe and an installer
```

Pushing a tag such as `v1.0.0` builds the Windows executables on GitHub Actions and attaches them to a release automatically.

## Credits

- Game, story, design: **Mehmet Baysal**
- The whole story of this game came from a dream I had.
- Special thanks to **Umut Eren** and **Raşit**.
- Voices and sound effects generated with ElevenLabs
- [three.js](https://threejs.org) (MIT)
- Surface textures from [Poly Haven](https://polyhaven.com) and furniture models from the [Kenney Furniture Kit](https://kenney.nl/assets/furniture-kit) (both CC0), shrunk to PS1-size textures and low-poly meshes
- Fonts: VT323, Reenie Beanie, Caveat, Cormorant Garamond (SIL Open Font License, via Google Fonts)

## License

Code is released under the [MIT License](LICENSE). © 2026 Mehmet Baysal.

---

## Türkçe

**Almost There**, Mehmet Baysal'ın yaptığı PS1 tarzı psikolojik bir korku oyunu.

Bir adam, tek bir gecenin etrafında kendini sürekli yeniden düzenleyen bir evde yalnız yaşıyor.
Her sabah alarm 7:00'de çalıyor. Her sabah masada üç kupa var.
Beş gün. Tek bir yol. Net bir cevap alamayacaksın; olay da tam olarak bu.

- Tarayıcıda oyna: https://baysaI.github.io/almost-there/
- Windows sürümü: [Releases](../../releases)
- Dil: Ayarlar → Dil → Türkçe
- Bölümler, oyunu bitirince açılır.

Bu oyunun hikâyesinin tamamı gördüğüm bir rüyadan doğdu.
Umut Eren ve Raşit'e özel teşekkürler.

Kulaklıkla, karanlıkta ve yalnız oyna.
