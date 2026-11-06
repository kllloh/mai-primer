/* Interactive demos. Each demo is DEMOS[id](root) where root is an empty <div>.
   Helpers: APP.onCleanup(fn) for timers; APP.onTheme(fn) to redraw when theme toggles. */
(function () {
  const D = (window.DEMOS = {});

  /* ---------- helpers ---------- */
  const $ = (h) => { const t = document.createElement('template'); t.innerHTML = h.trim(); return t.content.firstChild; };
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const colors = () => ({ ink: css('--ink'), ink2: css('--ink-2'), ink3: css('--ink-3'), line: css('--line'), surface: css('--surface'), s2: css('--surface-2'), brand: css('--brand'), good: css('--good'), bad: css('--bad'), warn: css('--warn'), c1: css('--c1'), c2: css('--c2'), c3: css('--c3'), c4: css('--c4'), c5: css('--c5'), c6: css('--c6') });
  function canvas(root, w, h, label) {
    const c = document.createElement('canvas');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = w * dpr; c.height = h * dpr; c.style.aspectRatio = w + '/' + h;
    c.setAttribute('role', 'img'); c.setAttribute('aria-label', label || 'Interactive chart');
    const ctx = c.getContext('2d'); ctx.scale(dpr, dpr);
    root.appendChild(c);
    return { c, ctx, w, h };
  }
  function slider(root, o, onChange) {
    const l = $(`<label><span>${o.label}: <b></b></span><input type="range" min="${o.min}" max="${o.max}" step="${o.step}" value="${o.value}"></label>`);
    const i = l.querySelector('input'), b = l.querySelector('b');
    const fmt = o.fmt || ((v) => v);
    const upd = () => { b.textContent = fmt(+i.value); };
    i.addEventListener('input', () => { upd(); onChange(+i.value); });
    upd(); root.appendChild(l);
    return { el: l, input: i, get: () => +i.value, set: (v) => { i.value = v; upd(); } };
  }
  const controls = (root) => { const d = $('<div class="controls"></div>'); root.appendChild(d); return d; };
  const readout = (root) => { const d = $('<div class="readout" aria-live="polite"></div>'); root.appendChild(d); return d; };
  const button = (root, text, fn, cls) => { const b = $(`<button class="btn small ${cls || ''}" type="button">${text}</button>`); b.addEventListener('click', fn); root.appendChild(b); return b; };
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function gauss(r) { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  const fmt = (x, d = 2) => (Math.abs(x) < 1e-12 ? 0 : x).toFixed(d);

  /* ───────────── 1. Gradient descent ───────────── */
  D.gd = function (root) {
    const f = (x) => x ** 4 / 4 - x * x + 0.3 * x, df = (x) => x ** 3 - 2 * x + 0.3;
    const cv = canvas(root, 720, 320, 'Curve with two valleys and a ball rolling downhill by gradient descent');
    let x, it, trail, timer = null, dead = false;
    const ctl = controls(root);
    const sx = slider(ctl, { label: 'Start x', min: -2.5, max: 2.5, step: 0.1, value: 2.2 }, () => reset());
    const slr = slider(ctl, { label: 'Learning rate', min: 0.01, max: 0.9, step: 0.01, value: 0.1 }, () => {});
    const ro = readout(root);
    const bt = $('<div class="controls"></div>'); root.appendChild(bt);
    button(bt, 'Step', () => step()); button(bt, 'Run', () => run()); button(bt, 'Reset', () => reset(), 'ghost');
    const X0 = -3, X1 = 3, Y0 = -2.2, Y1 = 7;
    const px = (v) => 40 + (v - X0) / (X1 - X0) * (cv.w - 60), py = (v) => cv.h - 30 - (v - Y0) / (Y1 - Y0) * (cv.h - 50);
    function draw() {
      const C = colors(), g = cv.ctx; g.clearRect(0, 0, cv.w, cv.h);
      g.strokeStyle = C.line; g.lineWidth = 1; g.beginPath(); g.moveTo(40, py(0)); g.lineTo(cv.w - 20, py(0)); g.moveTo(px(0), 10); g.lineTo(px(0), cv.h - 20); g.stroke();
      g.strokeStyle = C.brand; g.lineWidth = 3; g.beginPath();
      for (let v = X0; v <= X1; v += 0.02) { const X = px(v), Y = py(f(v)); v === X0 ? g.moveTo(X, Y) : g.lineTo(X, Y); } g.stroke();
      g.fillStyle = C.ink3; g.font = '12px system-ui'; g.fillText('x', cv.w - 18, py(0) - 6); g.fillText('loss f(x)', px(0) + 6, 18);
      g.strokeStyle = C.warn; g.lineWidth = 2; g.beginPath(); trail.forEach((t, i) => { const X = px(t), Y = py(f(t)); i ? g.lineTo(X, Y) : g.moveTo(X, Y); }); g.stroke();
      trail.forEach((t) => { g.fillStyle = C.warn; g.beginPath(); g.arc(px(t), py(f(t)), 3, 0, 7); g.fill(); });
      if (isFinite(x) && Math.abs(x) < 6) {
        const s = df(x); g.strokeStyle = C.bad; g.lineWidth = 2; g.beginPath(); g.moveTo(px(x - 0.5), py(f(x) - 0.5 * s)); g.lineTo(px(x + 0.5), py(f(x) + 0.5 * s)); g.stroke();
        g.fillStyle = C.bad; g.beginPath(); g.arc(px(x), py(f(x)), 8, 0, 7); g.fill();
      }
      const s = df(x), lr = slr.get();
      ro.innerHTML = dead ? '<b>Diverged!</b> The steps were so large the ball flew off the curve. Lower the learning rate and Reset.' :
        `iteration <b>${it}</b>   x = <b>${fmt(x, 3)}</b>   f(x) = <b>${fmt(f(x), 3)}</b>\nslope f′(x) = <b>${fmt(s, 3)}</b>   next step = −${lr} × ${fmt(s, 3)} = <b>${fmt(-lr * s, 3)}</b>` + (Math.abs(s) < 0.01 ? '\n<b>Converged</b> (slope ≈ 0). Is this the lowest valley, or only a local one?' : '');
    }
    function step() { if (dead) return; x = x - slr.get() * df(x); it++; trail.push(x); if (!isFinite(x) || Math.abs(x) > 6) { dead = true; stop(); } draw(); }
    function stop() { clearInterval(timer); timer = null; }
    function run() { if (timer) return stop(); timer = setInterval(() => { step(); if (Math.abs(df(x)) < 0.005 || it > 300 || dead) stop(); }, 90); }
    function reset() { stop(); dead = false; x = sx.get(); it = 0; trail = [x]; draw(); }
    APP.onCleanup(stop); APP.onTheme(draw); reset();
  };

  /* ───────────── 2. Cosine similarity ───────────── */
  D.cos = function (root) {
    const cv = canvas(root, 520, 360, 'Two vectors from the origin with angle between them');
    const ctl = controls(root);
    const sa = slider(ctl, { label: 'Angle of A (°)', min: 0, max: 360, step: 1, value: 20 }, draw);
    const sb = slider(ctl, { label: 'Angle of B (°)', min: 0, max: 360, step: 1, value: 110 }, draw);
    const sl = slider(ctl, { label: 'Length of B', min: 0.3, max: 1.5, step: 0.05, value: 1 }, draw);
    const ro = readout(root);
    function draw() {
      const C = colors(), g = cv.ctx, cx = cv.w / 2, cy = cv.h / 2, R = 140; g.clearRect(0, 0, cv.w, cv.h);
      g.strokeStyle = C.line; g.beginPath(); g.moveTo(10, cy); g.lineTo(cv.w - 10, cy); g.moveTo(cx, 10); g.lineTo(cx, cv.h - 10); g.stroke();
      g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke();
      const ta = sa.get() * Math.PI / 180, tb = sb.get() * Math.PI / 180, lb = sl.get();
      const a = [Math.cos(ta), Math.sin(ta)], b = [lb * Math.cos(tb), lb * Math.sin(tb)];
      const arrow = (v, col, name) => { const X = cx + v[0] * R, Y = cy - v[1] * R; g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, cy); g.lineTo(X, Y); g.stroke(); g.beginPath(); g.arc(X, Y, 6, 0, 7); g.fill(); g.font = 'bold 14px system-ui'; g.fillText(name, X + 8, Y - 8); };
      arrow(a, C.c1, 'A'); arrow(b, C.c4, 'B');
      const dot = a[0] * b[0] + a[1] * b[1], nb = Math.hypot(b[0], b[1]), cs = dot / nb;
      let ang = Math.abs(sa.get() - sb.get()) % 360; if (ang > 180) ang = 360 - ang;
      const meaning = cs > 0.9 ? 'almost the same direction → very similar' : cs > 0.4 ? 'broadly similar' : cs > -0.4 ? 'roughly unrelated (near 90°)' : cs > -0.9 ? 'broadly opposed' : 'opposite directions';
      ro.innerHTML = `A = (${fmt(a[0])}, ${fmt(a[1])})   B = (${fmt(b[0])}, ${fmt(b[1])})\ndot product A·B = ${fmt(a[0])}×${fmt(b[0])} + ${fmt(a[1])}×${fmt(b[1])} = <b>${fmt(dot)}</b>\ncosine similarity = A·B / (|A||B|) = <b>${fmt(cs)}</b>   angle = <b>${fmt(ang, 0)}°</b>\n→ ${meaning}\n(Cosine ignores length: change “Length of B” and the cosine stays put; the raw dot product does not.)`;
    }
    APP.onTheme(draw); draw();
  };

  /* ───────────── 3. Bayes ───────────── */
  D.bayes = function (root) {
    const cv = canvas(root, 720, 250, 'Grid of 1000 people coloured by test outcome');
    const ctl = controls(root);
    const sp = slider(ctl, { label: 'How common is the condition', min: 0.1, max: 50, step: 0.1, value: 1, fmt: (v) => v + '%' }, draw);
    const ss = slider(ctl, { label: 'Test sensitivity (catches real cases)', min: 50, max: 100, step: 1, value: 90, fmt: (v) => v + '%' }, draw);
    const sf = slider(ctl, { label: 'False-positive rate (healthy flagged)', min: 0, max: 30, step: 1, value: 10, fmt: (v) => v + '%' }, draw);
    root.appendChild($('<div class="legend"><span><i style="background:#e30613"></i>sick, test positive (true +)</span><span><i style="background:#e8a33d"></i>healthy, test positive (false +)</span><span><i style="background:#6b7a99"></i>sick, test negative (missed)</span><span><i style="background:#cfd5e4"></i>healthy, test negative</span></div>'));
    const ro = readout(root);
    function draw() {
      const C = colors(), g = cv.ctx; g.clearRect(0, 0, cv.w, cv.h);
      const N = 1000, sick = Math.max(1, Math.round(N * sp.get() / 100)), healthy = N - sick;
      const tp = Math.round(sick * ss.get() / 100), fn = sick - tp, fp = Math.round(healthy * sf.get() / 100), tn = healthy - fp;
      const cols = 50, rows = 20, cw = cv.w / cols, ch = cv.h / rows; let i = 0;
      const seq = [['#e30613', tp], ['#6b7a99', fn], ['#e8a33d', fp], ['#cfd5e4', tn]];
      seq.forEach(([col, n]) => { for (let k = 0; k < n; k++, i++) { g.fillStyle = col; g.beginPath(); g.arc((i % cols + 0.5) * cw, (Math.floor(i / cols) + 0.5) * ch, Math.min(cw, ch) * 0.34, 0, 7); g.fill(); } });
      const pos = tp + fp, ppv = pos ? tp / pos * 100 : 0;
      ro.innerHTML = `Out of 1,000 people: <b>${sick}</b> sick, <b>${healthy}</b> healthy.\nTest positives: <b>${tp}</b> true + <b>${fp}</b> false = <b>${pos}</b>\nIf you test positive, chance you are really sick = ${tp} / ${pos} = <b>${fmt(ppv, 1)}%</b>\n${ppv < 50 ? 'Most positives are false alarms: the condition is rare, so false positives swamp true ones.' : 'Now most positives are real: the condition is common enough, or the test is precise enough.'}`;
    }
    draw();
  };

  /* ───────────── 4. Big-O ───────────── */
  D.bigo = function (root) {
    const cv = canvas(root, 720, 300, 'Growth curves for log n, n, n log n, n squared and 2 to the n');
    const ctl = controls(root);
    const sn = slider(ctl, { label: 'Input size n', min: 2, max: 100, step: 1, value: 20 }, draw);
    const lg = $('<div class="legend"></div>'); root.appendChild(lg);
    const tbl = $('<div></div>'); root.appendChild(tbl);
    const fns = [['log n', (n) => Math.log2(n), 'c3'], ['n', (n) => n, 'c2'], ['n log n', (n) => n * Math.log2(n), 'c1'], ['n²', (n) => n * n, 'c4'], ['2ⁿ', (n) => Math.pow(2, n), 'c6']];
    function human(sec) {
      if (sec < 1e-6) return (sec * 1e9).toFixed(0) + ' ns'; if (sec < 1e-3) return (sec * 1e6).toFixed(1) + ' µs'; if (sec < 1) return (sec * 1e3).toFixed(1) + ' ms';
      if (sec < 60) return sec.toFixed(1) + ' s'; if (sec < 3600) return (sec / 60).toFixed(1) + ' min'; if (sec < 86400) return (sec / 3600).toFixed(1) + ' hours'; if (sec < 3.15e7) return (sec / 86400).toFixed(1) + ' days';
      const y = sec / 3.15e7; return y > 1.4e10 ? '≈ ' + y.toExponential(1) + ' years (older than the universe)' : (y < 1e6 ? y.toFixed(0) : y.toExponential(1)) + ' years';
    }
    function sci(v) { return v < 1e9 ? Math.round(v).toLocaleString() : v.toExponential(2); }
    function draw() {
      const C = colors(), g = cv.ctx, n = sn.get(); g.clearRect(0, 0, cv.w, cv.h);
      const ymax = Math.max(4 * n, 10), L = 50, B = 30, T = 10, Rr = 10, pw = cv.w - L - Rr, ph = cv.h - B - T;
      g.strokeStyle = C.line; g.beginPath(); g.moveTo(L, T); g.lineTo(L, cv.h - B); g.lineTo(cv.w - Rr, cv.h - B); g.stroke();
      g.fillStyle = C.ink3; g.font = '12px system-ui'; g.fillText('steps', 6, 16); g.fillText('n →', cv.w - 36, cv.h - 10); g.fillText(Math.round(ymax), 12, T + 10);
      fns.forEach(([name, f, c]) => { g.strokeStyle = C[c]; g.lineWidth = 2.5; g.beginPath(); let started = false; for (let k = 1; k <= n; k += n > 60 ? 1 : 0.25) { const v = f(k); const X = L + (k / n) * pw, Y = cv.h - B - Math.min(v / ymax, 1.05) * ph; if (!started) { g.moveTo(X, Y); started = true; } else g.lineTo(X, Y); } g.stroke(); });
      lg.innerHTML = fns.map(([nm, , c]) => `<span><i style="background:${C[c]}"></i>O(${nm})</span>`).join('') + '<span>(curves leaving the top are “off the chart”)</span>';
      tbl.innerHTML = `<table><thead><tr><th>Growth</th><th class="num">Steps for n = ${n}</th><th class="num">Time at 10⁹ steps/s</th></tr></thead><tbody>${fns.map(([nm, f]) => { const v = f(n); return `<tr><td>O(${nm})</td><td class="num">${sci(v)}</td><td class="num">${human(v / 1e9)}</td></tr>`; }).join('')}</tbody></table>`;
    }
    APP.onTheme(draw); draw();
  };

  /* ───────────── 5. Search on a grid ───────────── */
  D.search = function (root) {
    const COLS = 24, ROWS = 14, S = 30, cv = canvas(root, COLS * S, ROWS * S, 'Grid where you can draw walls and compare search algorithms');
    const start = [2, 7], goal = [21, 7]; let wall = new Set(), anim = null, shown = { seen: [], path: [] };
    const key = (c, r) => c + ',' + r;
    const ctl = controls(root);
    const sel = $('<label>Algorithm <select><option value="bfs">Breadth-first (BFS)</option><option value="greedy">Greedy best-first</option><option value="astar" selected>A* (g + h)</option></select></label>'); ctl.appendChild(sel);
    button(ctl, 'Run', run); button(ctl, 'Clear search', () => { stopAnim(); shown = { seen: [], path: [] }; ro.textContent = ''; draw(); }, 'ghost'); button(ctl, 'Random walls', () => { stopAnim(); wall = new Set(); const r = rng(Date.now() & 0xffff); for (let i = 0; i < 70; i++) { const c = Math.floor(r() * COLS), rr = Math.floor(r() * ROWS); if (key(c, rr) !== key(...start) && key(c, rr) !== key(...goal)) wall.add(key(c, rr)); } shown = { seen: [], path: [] }; draw(); }, 'ghost');
    button(ctl, 'Clear walls', () => { stopAnim(); wall = new Set(); shown = { seen: [], path: [] }; draw(); }, 'ghost');
    const ro = readout(root); root.appendChild($('<div class="legend"><span><i style="background:#0a7a3d"></i>start</span><span><i style="background:#e30613"></i>goal</span><span><i style="background:#9bb7f0"></i>explored</span><span><i style="background:#f0b429"></i>path</span><span><i style="background:#111111"></i>wall (click / drag to draw, shift-click to erase)</span></div>'));
    const h = (c, r) => Math.abs(c - goal[0]) + Math.abs(r - goal[1]);
    function solve(alg) {
      const open = [{ c: start[0], r: start[1], g: 0 }], par = new Map(), gs = new Map([[key(...start), 0]]), closed = new Set(), order = [];
      const pr = (n) => alg === 'bfs' ? n.g : alg === 'greedy' ? h(n.c, n.r) : n.g + h(n.c, n.r);
      while (open.length) {
        let bi = 0; for (let i = 1; i < open.length; i++) { const a = pr(open[i]), b = pr(open[bi]); if (a < b || (a === b && alg === 'astar' && h(open[i].c, open[i].r) < h(open[bi].c, open[bi].r))) bi = i; }
        const n = open.splice(bi, 1)[0], k = key(n.c, n.r); if (closed.has(k)) continue; closed.add(k); order.push([n.c, n.r]);
        if (n.c === goal[0] && n.r === goal[1]) { const path = []; let q = k; while (q) { path.push(q.split(',').map(Number)); q = par.get(q); } return { order, path: path.reverse() }; }
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dc, dr]) => { const c = n.c + dc, r = n.r + dr, kk = key(c, r); if (c < 0 || r < 0 || c >= COLS || r >= ROWS || wall.has(kk) || closed.has(kk)) return; const g2 = n.g + 1; if (alg === 'bfs' ? !gs.has(kk) : (!gs.has(kk) || g2 < gs.get(kk))) { gs.set(kk, g2); par.set(kk, k); open.push({ c, r, g: g2 }); } });
      }
      return { order, path: null };
    }
    function stopAnim() { if (anim) { clearInterval(anim); anim = null; } }
    function run() {
      stopAnim(); const alg = sel.querySelector('select').value, res = solve(alg); shown = { seen: [], path: [] }; let i = 0;
      anim = setInterval(() => { for (let k = 0; k < 6 && i < res.order.length; k++, i++) shown.seen.push(res.order[i]); if (i >= res.order.length) { stopAnim(); shown.path = res.path || []; ro.innerHTML = res.path ? `<b>${{ bfs: 'BFS', greedy: 'Greedy', astar: 'A*' }[alg]}</b>: explored <b>${res.order.length}</b> cells, path length <b>${res.path.length - 1}</b> steps.` + (alg === 'greedy' ? '\nGreedy is fast but not guaranteed shortest; build a wall in front of the goal and see it get lured.' : alg === 'astar' ? '\nA* found a shortest path while exploring fewer cells than BFS (try the same walls with BFS).' : '\nBFS finds a shortest path but explores in all directions.') : '<b>No path exists.</b> Explored ' + res.order.length + ' cells.'; } draw(); }, 25);
    }
    function draw() {
      const C = colors(), g = cv.ctx; g.clearRect(0, 0, cv.w, cv.h);
      for (let c = 0; c < COLS; c++) for (let r = 0; r < ROWS; r++) { g.fillStyle = C.s2; g.fillRect(c * S + 1, r * S + 1, S - 2, S - 2); }
      shown.seen.forEach(([c, r]) => { g.fillStyle = '#9bb7f0'; g.fillRect(c * S + 1, r * S + 1, S - 2, S - 2); });
      shown.path.forEach(([c, r]) => { g.fillStyle = '#f0b429'; g.fillRect(c * S + 1, r * S + 1, S - 2, S - 2); });
      wall.forEach((k) => { const [c, r] = k.split(',').map(Number); g.fillStyle = '#111111'; g.fillRect(c * S + 1, r * S + 1, S - 2, S - 2); });
      g.fillStyle = '#0a7a3d'; g.fillRect(start[0] * S + 1, start[1] * S + 1, S - 2, S - 2); g.fillStyle = '#e30613'; g.fillRect(goal[0] * S + 1, goal[1] * S + 1, S - 2, S - 2);
      g.fillStyle = '#fff'; g.font = 'bold 14px system-ui'; g.fillText('S', start[0] * S + 10, start[1] * S + 20); g.fillText('G', goal[0] * S + 9, goal[1] * S + 20);
    }
    let drawing = false, erase = false;
    const cell = (e) => { const rc = cv.c.getBoundingClientRect(), c = Math.floor((e.clientX - rc.left) / rc.width * COLS), r = Math.floor((e.clientY - rc.top) / rc.height * ROWS); return [c, r]; };
    const paint = (e) => { const [c, r] = cell(e), k = key(c, r); if (c < 0 || r < 0 || c >= COLS || r >= ROWS || k === key(...start) || k === key(...goal)) return; erase ? wall.delete(k) : wall.add(k); draw(); };
    cv.c.addEventListener('pointerdown', (e) => { drawing = true; erase = e.shiftKey; cv.c.setPointerCapture(e.pointerId); stopAnim(); shown = { seen: [], path: [] }; paint(e); });
    cv.c.addEventListener('pointermove', (e) => { if (drawing) paint(e); }); cv.c.addEventListener('pointerup', () => { drawing = false; });
    cv.c.style.touchAction = 'none';
    // starter obstacle: a wall with a gap
    for (let r = 2; r < 12; r++) wall.add(key(11, r));
    APP.onCleanup(stopAnim); APP.onTheme(draw); draw();
  };

  /* ───────────── 6. Polynomial fit / overfitting ───────────── */
  D.fit = function (root) {
    const cv = canvas(root, 720, 340, 'Noisy data with a polynomial curve fitted; training and test errors reported');
    let seed = 7, tr, te;
    const truth = (t) => Math.sin(Math.PI * (t + 1));
    const ctl = controls(root);
    const sd = slider(ctl, { label: 'Model degree (flexibility)', min: 1, max: 12, step: 1, value: 1 }, draw);
    const sn = slider(ctl, { label: 'Noise', min: 0, max: 0.6, step: 0.05, value: 0.25 }, () => { gen(); draw(); });
    button(ctl, 'New data', () => { seed++; gen(); draw(); }, 'ghost');
    const ro = readout(root);
    root.appendChild($('<div class="legend"><span><i style="background:#1d3fbb"></i>training points (model sees these)</span><span><i style="background:#e8890c"></i>test points (held back)</span><span><i style="background:#e30613"></i>fitted model</span><span><i style="background:#9aa3bd"></i>true pattern</span></div>'));
    function gen() { const r = rng(seed), s = sn.get(); const mk = (n) => Array.from({ length: n }, () => { const t = r() * 2 - 1; return [t, truth(t) + s * gauss(r)]; }); tr = mk(15); te = mk(60); }
    function polyfit(pts, d) {
      const n = d + 1, A = Array.from({ length: n }, () => new Array(n + 1).fill(0));
      pts.forEach(([x, y]) => { const p = []; for (let i = 0; i < 2 * n; i++) p.push(Math.pow(x, i)); for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) A[i][j] += p[i + j]; A[i][n] += p[i] * y; } });
      for (let i = 0; i < n; i++) A[i][i] += 1e-8;
      for (let i = 0; i < n; i++) { let m = i; for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[m][i])) m = k;[A[i], A[m]] = [A[m], A[i]]; for (let k = i + 1; k < n; k++) { const f = A[k][i] / A[i][i]; for (let j = i; j <= n; j++) A[k][j] -= f * A[i][j]; } }
      const w = new Array(n).fill(0); for (let i = n - 1; i >= 0; i--) { let s = A[i][n]; for (let j = i + 1; j < n; j++) s -= A[i][j] * w[j]; w[i] = s / A[i][i]; } return w;
    }
    const ev = (w, x) => w.reduce((s, c, i) => s + c * Math.pow(x, i), 0), mse = (w, pts) => pts.reduce((s, [x, y]) => s + (ev(w, x) - y) ** 2, 0) / pts.length;
    function draw() {
      const C = colors(), g = cv.ctx, d = sd.get(), w = polyfit(tr, d); g.clearRect(0, 0, cv.w, cv.h);
      const px = (t) => 20 + (t + 1) / 2 * (cv.w - 40), py = (y) => cv.h / 2 - y * 70; g.strokeStyle = C.line; g.beginPath(); g.moveTo(20, py(0)); g.lineTo(cv.w - 20, py(0)); g.stroke();
      g.strokeStyle = '#9aa3bd'; g.setLineDash([6, 5]); g.lineWidth = 2; g.beginPath(); for (let t = -1; t <= 1; t += 0.01) t === -1 ? g.moveTo(px(t), py(truth(t))) : g.lineTo(px(t), py(truth(t))); g.stroke(); g.setLineDash([]);
      te.forEach(([x, y]) => { g.strokeStyle = '#e8890c'; g.lineWidth = 1.5; g.beginPath(); g.arc(px(x), py(y), 3.5, 0, 7); g.stroke(); });
      g.strokeStyle = '#e30613'; g.lineWidth = 3; g.beginPath(); let st = false; for (let t = -1; t <= 1; t += 0.01) { const Y = Math.max(-3, Math.min(3, ev(w, t))); st ? g.lineTo(px(t), py(Y)) : g.moveTo(px(t), py(Y)); st = true; } g.stroke();
      tr.forEach(([x, y]) => { g.fillStyle = '#1d3fbb'; g.beginPath(); g.arc(px(x), py(y), 5, 0, 7); g.fill(); });
      const a = mse(w, tr), b = mse(w, te), s2 = sn.get() ** 2;
      const verdict = b > 1.8 * a + 0.03 ? '<b>Overfitting</b>: great on training data, much worse on new data.' : a > s2 * 1.8 + 0.06 ? '<b>Underfitting</b>: too simple; errors are high everywhere.' : '<b>Good fit</b>: training and test errors are similar and close to the noise level.';
      ro.innerHTML = `degree ${d}   training error (MSE) = <b>${fmt(a, 3)}</b>   test error (MSE) = <b>${fmt(b, 3)}</b>   (noise floor ≈ ${fmt(s2, 3)})\n${verdict}`;
    }
    gen(); draw();
  };

  /* ───────────── 7. Neuron / XOR ───────────── */
  D.neuron = function (root) {
    const cv = canvas(root, 440, 400, 'Decision regions of one neuron over two inputs with four data points');
    cv.c.style.maxWidth = '440px'; cv.c.style.margin = '0 auto';
    const data = { AND: [0, 0, 0, 1], OR: [0, 1, 1, 1], XOR: [0, 1, 1, 0] }, pts = [[0, 0], [0, 1], [1, 0], [1, 1]];
    let ds = 'OR', hidden = false;
    const ctl = controls(root);
    const sel = $('<label>Dataset <select><option>AND</option><option selected>OR</option><option>XOR</option></select></label>'); ctl.appendChild(sel);
    sel.querySelector('select').addEventListener('change', (e) => { ds = e.target.value; hidden = false; draw(); });
    const act = $('<label>Activation <select><option value="step">step (0/1)</option><option value="sig">sigmoid</option></select></label>'); ctl.appendChild(act); act.querySelector('select').addEventListener('change', draw);
    const c2 = controls(root);
    const w1 = slider(c2, { label: 'Weight w₁', min: -10, max: 10, step: 0.1, value: 4 }, () => { hidden = false; draw(); });
    const w2 = slider(c2, { label: 'Weight w₂', min: -10, max: 10, step: 0.1, value: 4 }, () => { hidden = false; draw(); });
    const bb = slider(c2, { label: 'Bias b', min: -15, max: 15, step: 0.1, value: -2 }, () => { hidden = false; draw(); });
    const c3 = controls(root); button(c3, 'Reveal: add a hidden layer', () => { ds = 'XOR'; sel.querySelector('select').value = 'XOR'; hidden = true; draw(); }, 'ghost');
    const ro = readout(root);
    const out = (x1, x2) => { if (hidden) { const h1 = x1 + x2 - 0.5 > 0 ? 1 : 0, h2 = 1.5 - x1 - x2 > 0 ? 1 : 0; return h1 && h2 ? 1 : 0; } const z = w1.get() * x1 + w2.get() * x2 + bb.get(); return act.querySelector('select').value === 'step' ? (z > 0 ? 1 : 0) : 1 / (1 + Math.exp(-z)); };
    function draw() {
      const C = colors(), g = cv.ctx, lo = -0.3, hi = 1.3, N = 80; g.clearRect(0, 0, cv.w, cv.h);
      const px = (v) => (v - lo) / (hi - lo) * cv.w, py = (v) => cv.h - (v - lo) / (hi - lo) * cv.h;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const x1 = lo + (i + .5) / N * (hi - lo), x2 = lo + (j + .5) / N * (hi - lo), o = out(x1, x2); g.fillStyle = `rgba(${o > .5 ? '227,6,19' : '29,63,187'},${0.12 + 0.28 * Math.abs(o - .5) * 2})`; g.fillRect(i * cv.w / N, cv.h - (j + 1) * cv.h / N, cv.w / N + 1, cv.h / N + 1); }
      g.strokeStyle = C.line; g.beginPath(); g.moveTo(px(0), 0); g.lineTo(px(0), cv.h); g.moveTo(0, py(0)); g.lineTo(cv.w, py(0)); g.stroke();
      g.font = '12px system-ui'; g.fillStyle = C.ink3; g.fillText('x₁ →', cv.w - 36, py(0) - 6); g.fillText('x₂ ↑', px(0) + 6, 14);
      let right = 0; const lines = [];
      pts.forEach(([x1, x2], i) => { const y = data[ds][i], o = out(x1, x2), ok = (o > .5 ? 1 : 0) === y; if (ok) right++; g.fillStyle = y ? '#e30613' : '#1d3fbb'; g.beginPath(); g.arc(px(x1), py(x2), 12, 0, 7); g.fill(); g.strokeStyle = ok ? '#0a7a3d' : '#111'; g.lineWidth = 3; g.stroke(); g.fillStyle = '#fff'; g.font = 'bold 12px system-ui'; g.fillText(y, px(x1) - 4, py(x2) + 4); lines.push(`(${x1},${x2}) target ${y} → output ${fmt(o, 2)} ${ok ? '✓' : '✗'}`); });
      ro.innerHTML = lines.join('\n') + `\nAccuracy: <b>${right}/4</b>` + (hidden ? '\n<b>Two hidden neurons (OR and NAND) feeding an AND neuron</b> carve out the diagonal band XOR needs: a network with a hidden layer can do what no single neuron can.' : (ds === 'XOR' ? '\nTry for 4/4: you can’t. One neuron draws one straight line, and XOR needs two. Press “Reveal”.' : (right === 4 ? '\nSolved! Border circles turn green when a point is classified correctly.' : '')));
    }
    APP.onTheme(draw); draw();
  };

  /* ───────────── 8. Pixels + convolution ───────────── */
  D.pixels = function (root) {
    const N = 8, S = 44, grid = Array.from({ length: N }, () => new Array(N).fill(0));
    const wrap = $('<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px"></div>'); root.appendChild(wrap);
    const a = $('<div><b>Your image (0 = black … 9 = white)</b></div>'), b = $('<div><b>After the filter</b></div>'); wrap.append(a, b);
    const ca = canvas(a, N * S, N * S, 'Editable 8 by 8 pixel image with brightness numbers'), cb = canvas(b, N * S, N * S, 'Result of applying a 3 by 3 filter');
    const K = { 'Blur (average)': [[1, 1, 1], [1, 1, 1], [1, 1, 1]].map((r) => r.map((v) => v / 9)), 'Edges (all directions)': [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]], 'Vertical edges (Sobel)': [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], 'Horizontal edges (Sobel)': [[-1, -2, -1], [0, 0, 0], [1, 2, 1]], 'Sharpen': [[0, -1, 0], [-1, 5, -1], [0, -1, 0]], 'Identity (no change)': [[0, 0, 0], [0, 1, 0], [0, 0, 0]] };
    const ctl = controls(root);
    const sel = $(`<label>Filter (3×3 kernel) <select>${Object.keys(K).map((k, i) => `<option ${i === 1 ? 'selected' : ''}>${k}</option>`).join('')}</select></label>`); ctl.appendChild(sel); sel.querySelector('select').addEventListener('change', draw);
    const preset = (fn) => () => { for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) grid[r][c] = fn(r, c) ? 9 : 0; draw(); };
    button(ctl, 'Square', preset((r, c) => r >= 2 && r <= 5 && c >= 2 && c <= 5), 'ghost'); button(ctl, 'Diagonal', preset((r, c) => r === c), 'ghost'); button(ctl, 'Plus', preset((r, c) => r === 3 || c === 3), 'ghost'); button(ctl, 'Clear', preset(() => false), 'ghost');
    const ro = readout(root); ro.innerHTML = 'Each output pixel = the sum of (3×3 neighbourhood × kernel). Edge filters light up where brightness <b>changes</b>: a CNN learns many such filters by itself.';
    function show(cvs, vals, signed) { const C = colors(), g = cvs.ctx, mx = Math.max(1, ...vals.flat().map(Math.abs)); g.clearRect(0, 0, cvs.w, cvs.h); for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const v = vals[r][c], t = signed ? Math.min(1, Math.abs(v) / mx) : v / 9, gray = Math.round(255 * t); g.fillStyle = `rgb(${gray},${gray},${gray})`; g.fillRect(c * S, r * S, S - 1, S - 1); g.fillStyle = gray > 130 ? '#111' : '#eee'; g.font = '13px ui-monospace,monospace'; g.textAlign = 'center'; g.fillText(Number.isInteger(v) ? v : v.toFixed(1), c * S + S / 2, r * S + S / 2 + 5); } g.textAlign = 'left'; }
    function draw() {
      const k = K[sel.querySelector('select').value], out = Array.from({ length: N }, () => new Array(N).fill(0));
      for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { let s = 0; for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const rr = r + i, cc = c + j; if (rr >= 0 && cc >= 0 && rr < N && cc < N) s += grid[rr][cc] * k[i + 1][j + 1]; } out[r][c] = Math.abs(s); }
      show(ca, grid, false); show(cb, out, true);
    }
    let down = false, val = 9; const cellAt = (e) => { const rc = ca.c.getBoundingClientRect(); return [Math.floor((e.clientY - rc.top) / rc.height * N), Math.floor((e.clientX - rc.left) / rc.width * N)]; };
    const put = (e) => { const [r, c] = cellAt(e); if (r >= 0 && c >= 0 && r < N && c < N && grid[r][c] !== val) { grid[r][c] = val; draw(); } };
    ca.c.style.touchAction = 'none'; ca.c.addEventListener('pointerdown', (e) => { down = true; val = e.shiftKey ? 0 : 9; ca.c.setPointerCapture(e.pointerId); put(e); }); ca.c.addEventListener('pointermove', (e) => { if (down) put(e); }); ca.c.addEventListener('pointerup', () => { down = false; });
    preset((r, c) => r >= 2 && r <= 5 && c >= 2 && c <= 5)(); APP.onTheme(draw);
  };

  /* ───────────── 9. MDP value iteration ───────────── */
  D.mdp = function (root) {
    const R = 3, Cn = 4, S = 110, cv = canvas(root, Cn * S, R * S, 'Grid world showing state values and best actions');
    cv.c.style.maxWidth = '480px';
    const wallAt = (r, c) => r === 1 && c === 1, term = { '0,3': 1, '1,3': -1 };
    const A = [[-1, 0, '▲'], [0, 1, '▶'], [1, 0, '▼'], [0, -1, '◀']];
    let V, it, pol, timer = null;
    const ctl = controls(root);
    const sg = slider(ctl, { label: 'Discount γ', min: 0.1, max: 1, step: 0.01, value: 0.9 }, reset);
    const sl = slider(ctl, { label: 'Living reward', min: -0.5, max: 0, step: 0.01, value: -0.04 }, reset);
    const sn = slider(ctl, { label: 'Slip chance', min: 0, max: 0.6, step: 0.05, value: 0.2, fmt: (v) => Math.round(v * 100) + '%' }, reset);
    const bt = controls(root); button(bt, 'Step (1 Bellman update)', step); button(bt, 'Run 30', () => { stop(); let n = 0; timer = setInterval(() => { step(); if (++n >= 30) stop(); }, 120); }); button(bt, 'Reset', reset, 'ghost');
    const ro = readout(root);
    const move = (r, c, a) => { const nr = r + A[a][0], nc = c + A[a][1]; return (nr < 0 || nc < 0 || nr >= R || nc >= Cn || wallAt(nr, nc)) ? [r, c] : [nr, nc]; };
    function q(r, c, a) { const p = sn.get(); let s = 0;[[a, 1 - p], [(a + 1) % 4, p / 2], [(a + 3) % 4, p / 2]].forEach(([aa, pp]) => { const [nr, nc] = move(r, c, aa); s += pp * (sl.get() + sg.get() * V[nr][nc]); }); return s; }
    function step() { const nv = V.map((r) => r.slice()); pol = pol.map((r) => r.slice()); for (let r = 0; r < R; r++) for (let c = 0; c < Cn; c++) { if (wallAt(r, c)) continue; const k = r + ',' + c; if (k in term) { nv[r][c] = term[k]; continue; } let best = -1e9, ba = 0; for (let a = 0; a < 4; a++) { const v = q(r, c, a); if (v > best + 1e-12) { best = v; ba = a; } } nv[r][c] = best; pol[r][c] = ba; } V = nv; it++; draw(); }
    function stop() { clearInterval(timer); timer = null; }
    function reset() { stop(); V = Array.from({ length: R }, () => new Array(Cn).fill(0)); pol = Array.from({ length: R }, () => new Array(Cn).fill(-1)); it = 0; draw(); }
    function draw() {
      const C = colors(), g = cv.ctx; g.clearRect(0, 0, cv.w, cv.h);
      for (let r = 0; r < R; r++) for (let c = 0; c < Cn; c++) {
        const x = c * S, y = r * S, k = r + ',' + c;
        if (wallAt(r, c)) { g.fillStyle = '#111111'; g.fillRect(x + 2, y + 2, S - 4, S - 4); continue; }
        const v = V[r][c], t = Math.min(1, Math.abs(v)); g.fillStyle = v >= 0 ? `rgba(15,138,95,${0.08 + 0.55 * t})` : `rgba(227,6,19,${0.08 + 0.55 * t})`; g.fillRect(x + 2, y + 2, S - 4, S - 4);
        g.fillStyle = C.ink; g.textAlign = 'center';
        if (k in term) { g.font = 'bold 22px system-ui'; g.fillText(term[k] > 0 ? '+1' : '−1', x + S / 2, y + S / 2 + 8); } else { g.font = '15px ui-monospace,monospace'; g.fillText(fmt(v, 2), x + S / 2, y + S / 2 + 18); if (pol[r][c] >= 0) { g.font = '30px system-ui'; g.fillStyle = C.brand; g.fillText(A[pol[r][c]][2], x + S / 2, y + S / 2 - 8); } }
      }
      g.textAlign = 'left'; ro.innerHTML = `Bellman updates so far: <b>${it}</b>. Values spread outward from the goal; arrows show the best action in each cell.\nTip: raise “slip chance” and watch the cell next to the red −1: the policy stops hugging the danger. Lower γ and distant cells care less about the goal.`;
    }
    APP.onCleanup(stop); APP.onTheme(draw); reset();
  };

  /* ───────────── 10. Stakeholder lens ───────────── */
  D.lens = function (root) {
    const S = {
      'Hospital: AI ranks emergency patients by urgency': { Patient: ['Will it under-rate people whose symptoms present differently (e.g. by sex or age)?', 'Can I know an AI was involved, and ask for a human review?', 'Is my health data used for other purposes?'], Clinician: ['Do I trust it enough to use it, but not so much I stop thinking?', 'Can I override it quickly, and who is accountable if I do or don’t?', 'Does it fit our workflow or add to our burden?'], Administrator: ['Does it cut waiting time and cost, and how will we prove that?', 'Legal and reputational risk if it errs', 'Vendor lock-in, maintenance and monitoring costs'], Regulator: ['Is it a regulated medical device? Where is the clinical evidence?', 'Is performance audited across demographic groups?', 'Is there an incident-reporting process?'] },
      'Bank: model decides who gets a loan': { Applicant: ['Why was I refused, and how can I contest it?', 'Does postcode act as a proxy for ethnicity or income?', 'What data about me is being used?'], 'Loan officer': ['When should I override the model?', 'Can I explain the decision to a customer?', 'Am I blamed for model errors?'], Bank: ['Does it lower default risk and operating cost?', 'Discrimination law and conduct obligations', 'Model drift when the economy changes'], Regulator: ['Is lending fair and non-discriminatory?', 'Are adverse decisions explainable?', 'Is there an audit trail?'] },
      'Stadium: face recognition at the gate': { Fan: ['Am I tracked without consent? Where is my face data stored?', 'What happens if I’m wrongly flagged?', 'Is the system equally accurate for everyone?'], 'Security staff': ['How to act on an alert that may be a false match?', 'Training for handling errors respectfully', 'Does it genuinely improve safety?'], 'Venue operator': ['Cost, queue times and crowd flow', 'Liability for wrongful ejection', 'Public backlash and brand trust'], 'Privacy regulator': ['Is biometric collection necessary and proportionate?', 'Retention limits and secondary use', 'Is notice and consent meaningful?'] }
    };
    const ctl = controls(root);
    const sel = $(`<label>Scenario <select>${Object.keys(S).map((k) => `<option>${k}</option>`).join('')}</select></label>`); ctl.appendChild(sel);
    const chips = $('<div class="chips" role="tablist" aria-label="Stakeholders"></div>'), out = $('<div class="card" style="margin:0" aria-live="polite"></div>'); root.append(chips, out);
    let cur = 0;
    function render() { const sc = S[sel.querySelector('select').value], names = Object.keys(sc); chips.innerHTML = ''; names.forEach((n, i) => { const b = $(`<button class="btn small ${i === cur ? '' : 'ghost'}" role="tab" aria-selected="${i === cur}" type="button">${n}</button>`); b.addEventListener('click', () => { cur = i; render(); }); chips.appendChild(b); }); out.innerHTML = `<h3 style="margin-bottom:.4em">${names[cur]}: typical concerns</h3><ul>${sc[names[cur]].map((x) => `<li>${x}</li>`).join('')}</ul><p style="margin:0;color:var(--ink-2)"><em>Now ask: whose concerns did the designers probably hear first? Whose might they have missed?</em></p>`; }
    sel.querySelector('select').addEventListener('change', () => { cur = 0; render(); }); render();
  };

  /* ───────────── 11. Thermostat control ───────────── */
  D.ctrl = function (root) {
    const cv = canvas(root, 720, 320, 'Room temperature over time under a PI controller with setpoint line');
    const ctl = controls(root);
    const kp = slider(ctl, { label: 'Kp (proportional gain)', min: 0, max: 8, step: 0.1, value: 1 }, draw);
    const ki = slider(ctl, { label: 'Ki (integral gain)', min: 0, max: 0.3, step: 0.01, value: 0 }, draw);
    const dl = slider(ctl, { label: 'Sensor delay (steps)', min: 0, max: 8, step: 1, value: 0 }, draw);
    const ro = readout(root);
    root.appendChild($('<div class="legend"><span><i style="background:#1d3fbb"></i>room temperature</span><span><i style="background:#9aa3bd"></i>target 22°</span><span><i style="background:#e8890c"></i>heater power (scaled)</span><span>At step 80 a door opens and the outside gets colder.</span></div>'));
    function sim() {
      const SP = 22, N = 150, T = [10], U = [0]; let I = 0, amb = 10;
      for (let k = 0; k < N; k++) {
        if (k === 80) amb = 0;
        const meas = T[Math.max(0, k - dl.get())], e = SP - meas; I += ki.get() * e; I = Math.max(-10, Math.min(10, I));
        const u = Math.max(0, Math.min(10, kp.get() * e + I)); U.push(u);
        T.push(T[k] + (-0.1 * (T[k] - amb) + 0.5 * u));
      }
      return { T, U, SP, N };
    }
    function draw() {
      const C = colors(), g = cv.ctx, { T, U, SP, N } = sim(); g.clearRect(0, 0, cv.w, cv.h);
      const L = 44, Bm = 28, pw = cv.w - L - 12, ph = cv.h - Bm - 12, lo = -5, hi = 40;
      const px = (k) => L + k / N * pw, py = (v) => 12 + (1 - (v - lo) / (hi - lo)) * ph;
      g.strokeStyle = C.line; g.beginPath(); g.moveTo(L, 12); g.lineTo(L, cv.h - Bm); g.lineTo(cv.w - 12, cv.h - Bm); g.stroke();
      g.fillStyle = C.ink3; g.font = '12px system-ui'; [0, 10, 20, 30, 40].forEach((v) => g.fillText(v + '°', 8, py(v) + 4)); g.fillText('time →', cv.w - 54, cv.h - 8);
      g.setLineDash([6, 5]); g.strokeStyle = '#9aa3bd'; g.lineWidth = 2; g.beginPath(); g.moveTo(L, py(SP)); g.lineTo(cv.w - 12, py(SP)); g.stroke(); g.setLineDash([]);
      g.strokeStyle = C.line; g.beginPath(); g.moveTo(px(80), 12); g.lineTo(px(80), cv.h - Bm); g.stroke();
      g.strokeStyle = '#e8890c'; g.lineWidth = 2; g.beginPath(); U.forEach((u, k) => { const X = px(k), Y = py(u * 3); k ? g.lineTo(X, Y) : g.moveTo(X, Y); }); g.stroke();
      g.strokeStyle = '#1d3fbb'; g.lineWidth = 3; g.beginPath(); T.forEach((t, k) => { const X = px(k), Y = py(Math.max(lo, Math.min(hi, t))); k ? g.lineTo(X, Y) : g.moveTo(X, Y); }); g.stroke();
      const e1 = SP - T[79], e2 = SP - T[150], over = Math.max(...T.slice(0, 80)) - SP, osc = T.slice(120).reduce((m, v) => Math.max(m, Math.abs(v - SP)), 0);
      ro.innerHTML = `before the door opens (step 79): error = <b>${fmt(e1, 2)}°</b>   max overshoot = <b>${fmt(Math.max(0, over), 2)}°</b>\nat the end (step 150): error = <b>${fmt(e2, 2)}°</b>\n` + (osc > 6 ? '<b>Unstable / oscillating</b>: too much gain (or delay) for this system.' : Math.abs(e2) > 0.5 ? '<b>Steady-state error</b>: P alone can’t fully reach the target. Try adding some Ki.' : Math.abs(e2) <= 0.5 ? '<b>Tracks the target</b> after the disturbance. Notice how the integral term wins back the lost degrees.' : '');
    }
    APP.onTheme(draw); draw();
  };

  /* ───────────── 12. Iterated prisoner's dilemma ───────────── */
  D.ipd = function (root) {
    const STR = {
      'Always cooperate': () => 'C', 'Always defect': () => 'D',
      'Tit-for-Tat': (me, op) => op.length ? op[op.length - 1] : 'C',
      'Grim trigger': (me, op) => op.includes('D') ? 'D' : 'C',
      'Random (50/50)': (me, op, r) => r() < 0.5 ? 'C' : 'D'
    };
    const PAY = { CC: [3, 3], CD: [0, 5], DC: [5, 0], DD: [1, 1] };
    const names = Object.keys(STR);
    root.appendChild($('<table style="max-width:420px"><thead><tr><th></th><th>Opponent cooperates</th><th>Opponent defects</th></tr></thead><tbody><tr><th>You cooperate</th><td>3 , 3</td><td>0 , 5</td></tr><tr><th>You defect</th><td>5 , 0</td><td>1 , 1</td></tr></tbody></table>'));
    const ctl = controls(root);
    const sel = $(`<label>Opponent strategy <select>${names.map((n) => `<option ${n === 'Tit-for-Tat' ? 'selected' : ''}>${n}</option>`).join('')}</select></label>`); ctl.appendChild(sel);
    const play = controls(root), ro = readout(root); let me, op, sm, so, r;
    function newGame() { me = []; op = []; sm = so = 0; r = rng(Date.now() & 0xffff); upd(); }
    sel.querySelector('select').addEventListener('change', newGame);
    const bC = button(play, 'Cooperate', () => go('C')), bD = button(play, 'Defect', () => go('D')), bN = button(play, 'New game', newGame, 'ghost');
    function go(m) { if (me.length >= 10) return; const o = STR[sel.querySelector('select').value](op, me, r); me.push(m); op.push(o); const p = PAY[m + o]; sm += p[0]; so += p[1]; upd(); }
    function upd() {
      const done = me.length >= 10; bC.disabled = bD.disabled = done;
      ro.innerHTML = `Round ${Math.min(me.length + 1, 10)}/10   You: <b>${sm}</b>   Opponent: <b>${so}</b>\nYou:      ${me.join(' ') || '·'}\nOpponent: ${op.join(' ') || '·'}` + (done ? `\n<b>Game over.</b> Mutual cooperation would have scored 30 each. ${sm >= 25 ? 'You found a cooperative groove.' : sm <= 12 ? 'Lots of defection costs both sides.' : 'A mix of cooperation and defection.'}` : '');
    }
    const tour = controls(root); button(tour, 'Run a tournament (200 rounds each)', () => {
      const rr = rng(42), res = names.map((n) => ({ n, tot: 0, games: 0 }));
      names.forEach((a, i) => names.forEach((b, j) => { const ha = [], hb = []; let s = 0; for (let k = 0; k < 200; k++) { const x = STR[a](ha, hb, rr), y = STR[b](hb, ha, rr); s += PAY[x + y][0]; ha.push(x); hb.push(y); } res[i].tot += s; res[i].games++; }));
      res.sort((x, y) => y.tot - x.tot); out.innerHTML = `<table><thead><tr><th>Rank</th><th>Strategy</th><th class="num">Avg points / round</th></tr></thead><tbody>${res.map((x, i) => `<tr><td>${i + 1}</td><td>${x.n}</td><td class="num">${fmt(x.tot / x.games / 200, 2)}</td></tr>`).join('')}</tbody></table><p>Each strategy plays every strategy (including itself). Cooperative-but-retaliatory strategies tend to do well overall; pure defectors thrive only against suckers.</p>`;
    });
    const out = $('<div></div>'); root.appendChild(out); newGame();
  };

  /* ───────────── 13. Confidence → interaction pattern ───────────── */
  D.confux = function (root) {
    const ctl = controls(root);
    const sc = slider(ctl, { label: 'Model confidence', min: 0, max: 100, step: 1, value: 75, fmt: (v) => v + '%' }, draw);
    const sr = slider(ctl, { label: 'Cost of a wrong action', min: 0, max: 100, step: 1, value: 30, fmt: (v) => v < 34 ? 'low' : v < 67 ? 'medium' : 'high' }, draw);
    const out = $('<div class="card" style="margin:0" aria-live="polite"></div>'); root.appendChild(out);
    function draw() {
      const c = sc.get(), k = sr.get(); let t, d, ex;
      if (c >= 90 && k < 34) { t = 'Act automatically, and make it undoable'; d = 'Confidence is high and mistakes are cheap. Reduce friction, but show what happened and offer a one-tap undo.'; ex = 'e.g. auto-sorting an email into a folder'; }
      else if (c >= 70 && k < 67) { t = 'Suggest with one-tap accept; show confidence'; d = 'Let the user stay in charge. Present the suggestion clearly, signal how sure the system is, and learn from accept / reject.'; ex = 'e.g. smart reply suggestions; autocomplete'; }
      else if (c >= 70) { t = 'Recommend, but require explicit confirmation with reasons'; d = 'Even a confident model needs a deliberate human check when errors are costly. Show the evidence behind the suggestion.'; ex = 'e.g. flagging a large payment as fraud'; }
      else if (k < 67) { t = 'Offer several options or ask a clarifying question'; d = 'Low confidence, tolerable risk. Don’t pretend to know: present alternatives or ask the user what they meant.'; ex = 'e.g. a voice assistant asking “Did you mean…?”'; }
      else { t = 'Defer to a human; explain why the AI is unsure'; d = 'Low confidence and high stakes. Don’t auto-suggest as if certain. Hand off, and say why. Log it for review.'; ex = 'e.g. a medical triage tool escalating an ambiguous case'; }
      out.innerHTML = `<h3 style="margin:0 0 .3em">${t}</h3><p>${d}</p><p style="margin:0;color:var(--ink-2)"><em>${ex}</em></p>`;
    }
    draw();
  };

  /* ───────────── 14. Fairness thresholds ───────────── */
  D.fair = function (root) {
    const r = rng(11), G = { A: [], B: [] };
    const par = { A: { base: 0.5, q: 0.70, u: 0.35 }, B: { base: 0.4, q: 0.58, u: 0.30 } };
    ['A', 'B'].forEach((g) => { for (let i = 0; i < 300; i++) { const qual = r() < par[g].base, s = Math.max(0, Math.min(1, (qual ? par[g].q : par[g].u) + 0.15 * gauss(r))); G[g].push({ qual, s }); } });
    const cv = canvas(root, 720, 260, 'Score histograms for group A and group B with threshold lines');
    const ctl = controls(root);
    const ta = slider(ctl, { label: 'Threshold (group A)', min: 0, max: 1, step: 0.01, value: 0.5 }, draw);
    const tb = slider(ctl, { label: 'Threshold (group B)', min: 0, max: 1, step: 0.01, value: 0.5 }, draw);
    const lk = $('<label class="row"><input type="checkbox" checked> Use one shared threshold</label>'); ctl.appendChild(lk); lk.querySelector('input').addEventListener('change', draw);
    const out = $('<div></div>'); root.appendChild(out);
    root.appendChild($('<div class="legend"><span><i style="background:#0a7a3d"></i>qualified</span><span><i style="background:#9aa3bd"></i>not qualified</span><span>Everyone to the right of the line is approved.</span></div>'));
    const ro = readout(root);
    function stats(g, t) { const a = G[g]; const sel = a.filter((x) => x.s >= t), q = a.filter((x) => x.qual), tp = q.filter((x) => x.s >= t).length, nq = a.length - q.length, fp = a.filter((x) => !x.qual && x.s >= t).length; return { sr: sel.length / a.length, tpr: q.length ? tp / q.length : 0, fpr: nq ? fp / nq : 0 }; }
    function draw() {
      const C = colors(), g = cv.ctx, shared = lk.querySelector('input').checked; if (shared) tb.set(ta.get());
      tb.input.disabled = shared; g.clearRect(0, 0, cv.w, cv.h);
      const th = { A: ta.get(), B: shared ? ta.get() : tb.get() };
      ['A', 'B'].forEach((grp, pi) => {
        const ox = pi * (cv.w / 2) + 14, w = cv.w / 2 - 28, bins = 20, hq = new Array(bins).fill(0), hu = new Array(bins).fill(0);
        G[grp].forEach((x) => { const b = Math.min(bins - 1, Math.floor(x.s * bins)); (x.qual ? hq : hu)[b]++; });
        const mx = Math.max(...hq.map((v, i) => v + hu[i])), bw = w / bins;
        for (let i = 0; i < bins; i++) { const hU = hu[i] / mx * 180, hQ = hq[i] / mx * 180; g.fillStyle = '#9aa3bd'; g.fillRect(ox + i * bw + 1, 220 - hU, bw - 2, hU); g.fillStyle = '#0a7a3d'; g.fillRect(ox + i * bw + 1, 220 - hU - hQ, bw - 2, hQ); }
        g.strokeStyle = C.bad; g.lineWidth = 3; g.beginPath(); g.moveTo(ox + th[grp] * w, 20); g.lineTo(ox + th[grp] * w, 225); g.stroke();
        g.fillStyle = C.ink; g.font = 'bold 14px system-ui'; g.fillText('Group ' + grp, ox, 16); g.fillStyle = C.ink3; g.font = '12px system-ui'; g.fillText('model score 0 → 1', ox, 246);
      });
      const A = stats('A', th.A), B = stats('B', th.B), pc = (v) => (v * 100).toFixed(0) + '%';
      out.innerHTML = `<table><thead><tr><th>Group</th><th class="num">Approved (selection rate)</th><th class="num">Qualified approved (TPR)</th><th class="num">Unqualified approved (FPR)</th></tr></thead><tbody><tr><td>A</td><td class="num">${pc(A.sr)}</td><td class="num">${pc(A.tpr)}</td><td class="num">${pc(A.fpr)}</td></tr><tr><td>B</td><td class="num">${pc(B.sr)}</td><td class="num">${pc(B.tpr)}</td><td class="num">${pc(B.fpr)}</td></tr></tbody></table>`;
      ro.innerHTML = `Demographic-parity gap (difference in selection rate): <b>${pc(Math.abs(A.sr - B.sr))}</b>\nEqual-opportunity gap (difference in TPR): <b>${pc(Math.abs(A.tpr - B.tpr))}</b>   FPR gap: <b>${pc(Math.abs(A.fpr - B.fpr))}</b>\nTry lowering B’s threshold until the TPR gap closes: the FPR gap and selection-rate gap move too. Because the groups’ base rates and score quality differ, you can’t zero all three at once: choosing which to prioritise is a value judgement.`;
    }
    APP.onTheme(draw); draw();
  };

  /* ───────────── 15. Project canvas ───────────── */
  D.canvas = function (root) {
    const F = [['user', 'Who is the user, and what decision or task are you helping?'], ['problem', 'The problem, in one sentence (as a question you can answer with data)'], ['data', 'What data exists? Where from? Any privacy or bias concerns?'], ['metric', 'How will you measure success? (and what is a “good enough” number?)'], ['baseline', 'What is the simplest baseline you must beat?'], ['method', 'Candidate approach(es) and why'], ['risks', 'What could go wrong, and for whom? How would you notice?']];
    let st = {}; try { st = JSON.parse(localStorage.getItem('mai-primer-canvas') || '{}'); } catch (e) { }
    F.forEach(([k, label]) => { const w = $(`<div style="margin:0 0 10px"><label style="font-weight:600;font-size:.9rem" for="cv-${k}">${label}</label><textarea id="cv-${k}" rows="2" style="width:100%;font:inherit;padding:8px 10px;border-radius:8px;border:1px solid var(--line);background:var(--surface);color:var(--ink)"></textarea></div>`); const t = w.querySelector('textarea'); t.value = st[k] || ''; t.addEventListener('input', () => { st[k] = t.value; localStorage.setItem('mai-primer-canvas', JSON.stringify(st)); }); root.appendChild(w); });
    const c = controls(root); button(c, 'Copy as text', () => { const txt = F.map(([k, l]) => l + '\n' + (st[k] || '') + '\n').join('\n'); navigator.clipboard && navigator.clipboard.writeText(txt); }); button(c, 'Clear', () => { st = {}; localStorage.removeItem('mai-primer-canvas'); root.querySelectorAll('textarea').forEach((t) => t.value = ''); }, 'ghost');
  };
})();
