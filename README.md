# Masala Body — The Facility Tour

**[krishashok.github.io/masala-body-atlas](https://krishashok.github.io/masala-body-atlas/)**

A companion site to the book. The human body drawn as an industrial
processing plant: ten stations, from the intake at the mouth to the
discharge, plus the instruments that measure it and cannot quite agree.

Every station has two detail layers — **Simple** and **Nerd Mode** — and a
set of operating states you can put the machine into, including the ones
where it goes wrong. Reflux is a valve that stopped sealing. Lactose
intolerance is a missing tool upstream of a fermenter. The argument the
site is making is that a plant this robust is not endangered by dinner.

## How it is built

No build step, no framework, no npm, no CDN. Plain HTML, CSS and ES
modules, served as files. Every drawing is hand-authored inline SVG,
animated in CSS. The whole site is about 69 KB gzipped.

```
index.html   shell, and the shared paint servers every sheet is lit by
app.css      the drawing vocabulary — a station may only use these classes,
             which is what makes ten separate drawings read as one set
app.js       router, layer and mode state, and the measurements that keep a
             scaled drawing clear of unscaled chrome
stations/    one module per station, each exporting the same contract
<slug>/      a redirect page per station, so a shared link gets its own card
```

State lives in the URL, so any view can be linked to:
`#/reactor?layer=tech&mode=reflux&panel=myth`

## Adding a station

Write a module exporting `{ id, no, rail, title, sub, drawing, modes, svg,
main, hotspots? }`, then add it to `stations/index.js`. Anything the
drawing needs that does not exist yet is a new class in `app.css`, next to
its relatives — never a one-off style inside a station file.

## Verification

Checked at 390, 500, 700, 900, 1024, 1180, 1300, 1440 and 1920 px — every
station, both layers, both panels, every mode — for labels clipped by the
sheet edge and labels overlapping each other. Currently zero of both.
