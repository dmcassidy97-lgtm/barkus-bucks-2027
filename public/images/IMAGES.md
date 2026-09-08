# Swapping in real photos

Every page pulls its hero/banner image from one file in this folder, referenced by a
plain `<img src="images/____.svg">` tag. Nothing else needs to change in the code —
just replace the file.

| File | Used on | Swap it for |
|---|---|---|
| `hero-placeholder.svg` | Homepage hero | Wide (16:9-ish) hero shot — group photo, Barkus in action, Saigon skyline |
| `attendees-banner.svg` | Attendee list page banner | Group shot / lineup photo |
| `itinerary-banner.svg` | Itinerary page banner | Street/nightlife shot from Saigon |
| `fines-banner.svg` | Fines & rules page banner | A "court in session" photo, or a funny Barkus mugshot-style pic |

**How to swap:**

1. Drop your real photo into this `images/` folder, e.g. `hero-real.jpg`.
2. Open the relevant HTML file (`index.html`, `attendees.html`, `itinerary.html`, or
   `fines.html`) and change the `src="images/hero-placeholder.svg"` attribute to
   `src="images/hero-real.jpg"`.
3. Keep photos under ~500KB (compress with squoosh.app or similar) so the site stays
   fast on hotel wifi.
4. Real photos will sit under a dark gradient overlay (see `.hero::after` /
   `.banner::after` in `css/style.css`) so the white heading text stays readable —
   no change needed there, it applies automatically to whatever image you drop in.

The current placeholders are minimal, abstract dark-mode graphics — soft accent-colored
gradient glows, a faint grid, and (on the homepage) a simple skyline silhouette — built
to match the site's current clean/modern look. They're vector, so they scale to any
screen size with no pixelation in the meantime.
