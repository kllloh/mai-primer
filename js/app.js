/* App shell: hash router, sidebar, progress (localStorage), pages. */
(function () {
  const KEY = 'mai-primer-v1';
  const $main = document.getElementById('main'), $side = document.getElementById('sidebar');
  const MODS = window.MODS, PARTS = window.PARTS, byId = Object.fromEntries(MODS.map((m, i) => [m.id, Object.assign(m, { n: i })]));

  /* ---------- state ---------- */
  let S = { diag: { answers: [], done: false, pos: 0 }, mods: {} };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };
  const ms = (id) => (S.mods[id] = S.mods[id] || { can: [], quiz: {} });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- APP hooks used by demos ---------- */
  const cleanups = [], themeCbs = [];
  window.APP = { onCleanup: (f) => cleanups.push(f), onTheme: (f) => themeCbs.push(f) };
  function runCleanups() { while (cleanups.length) { try { cleanups.pop()(); } catch (e) { } } themeCbs.length = 0; }

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('mai-primer-theme');
  root.dataset.theme = savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.getElementById('themeBtn').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mai-primer-theme', root.dataset.theme);
    setTimeout(() => themeCbs.forEach((f) => f()), 30);
  });

  /* ---------- diagnostic scoring ---------- */
  function diagResult() {
    const A = S.diag.answers, DG = window.DIAG;
    const correct = DG.map((q, i) => A[i] === q.a);
    const areas = window.DIAG_AREAS.map((a) => { const idx = DG.map((q, i) => q.area === a.id ? i : -1).filter((i) => i >= 0); const c = idx.filter((i) => correct[i]).length; return Object.assign({}, a, { c, t: idx.length, lvl: window.diagLevel(c, idx.length) }); });
    const mods = {};
    DG.forEach((q, i) => { const m = (mods[q.mod] = mods[q.mod] || { c: 0, t: 0 }); m.t++; if (correct[i]) m.c++; });
    Object.keys(mods).forEach((k) => (mods[k].lvl = window.diagLevel(mods[k].c, mods[k].t)));
    const ai = areas.find((a) => a.id === 'ai'); mods.m0 = { c: ai.c, t: ai.t, lvl: ai.lvl };
    return { correct, areas, mods, total: correct.filter(Boolean).length };
  }
  const modBadge = (id) => { if (!S.diag.done) return ''; const r = diagResult().mods[id]; return r ? `<span class="badge ${r.lvl.key}">${r.lvl.label}</span>` : ''; };

  /* ---------- progress ---------- */
  function overall() { let t = 0, d = 0; MODS.forEach((m) => { t += m.can.length; d += (ms(m.id).can || []).filter(Boolean).length; }); return t ? Math.round(d / t * 100) : 0; }
  function modDone(m) { const c = ms(m.id).can || []; return m.can.length && m.can.every((_, i) => c[i]); }
  function refreshProgress() { const p = overall(); document.getElementById('overallBar').style.width = p + '%'; document.getElementById('overallPct').textContent = p + '%'; }

  /* ---------- sidebar ---------- */
  function renderSide(cur) {
    const link = (h, inner, id) => `<a href="#/${h}" ${cur === id ? 'aria-current="page"' : ''}>${inner}</a>`;
    let h = '<h4>Start</h4>' + link('home', '<span class="num">—</span>Welcome', 'home') + link('map', '<span class="num">○</span>Course map', 'map') +
      link('diagnostic', `<span class="num">□</span>Diagnostic ${S.diag.done ? '<span class="tick">✓</span>' : ''}`, 'diagnostic');
    [0, 1, 2, 3, 4, 5].forEach((p) => {
      h += `<h4>${p === 1 ? '1 · ' : p === 2 ? '2 · ' : p === 3 ? '3a · ' : p === 4 ? '3b · ' : p === 5 ? '4 · ' : ''}${PARTS[p].name}</h4>`;
      MODS.filter((m) => m.part === p).forEach((m) => { h += link('m/' + m.id, `<span class="num">${m.n}</span><span>${esc(m.title)}</span>${modDone(m) ? '<span class="tick">✓</span>' : modBadge(m.id)}`, m.id); });
    });
    h += '<h4>Reference</h4>' + link('glossary', '<span class="num">A</span>Glossary', 'glossary') + link('resources', '<span class="num">↗</span>Resource library', 'resources');
    $side.innerHTML = h;
  }

  /* ---------- helpers for pages ---------- */
  const modLink = (id, label) => `<a class="chip" href="#/m/${id}">${label || `${byId[id].n} · ${esc(byId[id].title)}`}</a>`;
  const kindIcon = {};
  const resItem = (l, extra) => `<a class="item" href="${l.u}" target="_blank" rel="noopener noreferrer"><span class="t">${l.t}</span><span class="tags"><span class="tag">${l.k}</span><span class="tag ${l.l.split('–')[0]}">${l.l}</span></span><span class="n">${l.n}</span>${extra || ''}</a>`;

  /* ---------- pages ---------- */
  function home() {
    const d = S.diag;
    return `<div class="page">
      <div class="eyebrow">Unofficial primer · University of Melbourne online Master of AI</div>
      <h1>Get ready for the Master of Artificial Intelligence</h1>
      <p class="lead">A guided, plain-language path from “I’m curious about AI” to “I’m ready for subject one”. No prior knowledge assumed: just curiosity and willingness to practise.</p>
      <div class="chips"><a class="btn" href="#/diagnostic">${d.done ? 'Review your diagnostic' : d.answers.length ? 'Continue the diagnostic' : 'Take the 15-minute diagnostic'}</a><a class="btn ghost" href="#/map">See the course map</a></div>

      <h2>How this primer works</h2>
      <div class="grid cols2">
        <div class="card"><h3>1 · Diagnose</h3><p>24 questions across six areas find what you already know. No grades: the result is a personalised order of study, with each module tagged <span class="badge start" >Start here</span> <span class="badge refresh" >Refresh</span> or <span class="badge strong" >Strong</span>.</p></div>
        <div class="card"><h3>2 · Build the bridge</h3><p>Modules 1–5: the maths, Python and algorithm skills that every later subject quietly assumes. Short, visual, with interactive demos.</p></div>
        <div class="card"><h3>3 · Meet each subject</h3><p>Modules 6–11 mirror the compulsory subjects (the Graduate Certificate and Diploma). Modules 12–15 cover your chosen stream; module 16 prepares you for the capstone or research project.</p></div>
        <div class="card"><h3>4 · Go deeper, your way</h3><p>Every module ends with hand-picked links to <strong>free, reputable sources</strong> (university courses, textbooks, standards bodies) graded Beginner → Advanced.</p></div>
      </div>

      <h2>Every module has the same shape</h2>
      <ol>
        <li><strong>In plain language</strong>: what it is and why it matters.</li>
        <li><strong>Where it shows up in the course</strong>: tied to the official subject outline.</li>
        <li><strong>Big ideas</strong>: 4–5 concepts, building from simple to harder, with analogies.</li>
        <li><strong>Try it</strong>: an interactive demo you can poke at.</li>
        <li><strong>Check yourself</strong>: a short quiz with explanations.</li>
        <li><strong>You’re ready when…</strong>: a can-do checklist. Tick items honestly; the progress bar tracks them.</li>
        <li><strong>Go deeper</strong>: curated links.</li>
      </ol>

      <h2>Suggested pacing</h2>
      <div class="card"><p>The course is taught one subject at a time, so your primer time is best spent before your first intake. A realistic plan if you are starting from scratch (≈ 4–6 hours a week):</p>
      <table><thead><tr><th>Weeks</th><th>Focus</th></tr></thead><tbody>
        <tr><td>1</td><td>Diagnostic · Module 0 (what is AI) · start Python (module 4), and keep practising it every week</td></tr>
        <tr><td>2–3</td><td>Modules 1–2 (maths language, calculus, linear algebra)</td></tr>
        <tr><td>4</td><td>Module 3 (probability &amp; statistics)</td></tr>
        <tr><td>5</td><td>Module 5 (algorithmic thinking) · skim modules 6–7 to preview the first subjects</td></tr>
        <tr><td>After</td><td>Browse the other modules as your subjects arrive; return to the glossary any time</td></tr>
      </tbody></table><p style="margin:0;color:var(--ink-2)">Short, regular sessions beat long cramming. Programming especially is learned by doing: type the code, break it, fix it.</p></div>

      <h2>Study habits that work</h2>
      <div class="grid cols3">
        <div class="card"><h3>Test yourself</h3><p style="margin:0">Recalling an answer beats re-reading it. Use the quizzes, then close the page and explain the idea aloud.</p></div>
        <div class="card"><h3>Build small things</h3><p style="margin:0">Replicate every demo in Python. Understanding grows from running code, not just reading it.</p></div>
        <div class="card"><h3>Ask “why?” and “what if?”</h3><p style="margin:0">Change the learning rate, the threshold, the walls. Predict, then observe. That is how experts build intuition.</p></div>
      </div>

      <div class="callout" style="margin-top:28px"><strong>About this primer</strong>This is an independent study aid, not an official University of Melbourne resource. Subject descriptions are paraphrased from the <em>Master of Artificial Intelligence course guide</em>; subject content, order and assessments may change, so always check the University’s Handbook and your subject guides. External links go to third-party sites. Their availability and pricing can change.</div>
    </div>`;
  }

  function map() {
    const sub = (title, mods, tone, note) => `<a class="sub" style="border-left-color:var(--${tone})" href="#/m/${mods[0]}"><strong>${title}</strong><small>${note || ''} Primer: ${mods.map((i) => 'module ' + byId[i].n).join(', ')}</small></a>`;
    return `<div class="page">
      <div class="eyebrow">Course map</div><h1>What you’re preparing for</h1>
      <p class="lead">12 subjects (150 credit points), studied one at a time, or exit early with a Graduate Certificate (4 subjects) or Graduate Diploma (8 subjects). Click any subject to open the matching primer module.</p>
      <div class="stage-label">Graduate Certificate · 4 compulsory subjects (≈ 8 months)</div>
      <div class="stage">${sub('Foundations of AI', ['m6', 'm0'], 'c1', 'Agents, search, reasoning.')}${sub('AI Programming Fundamentals', ['m4'], 'c1', 'Python for algorithms and data.')}${sub('Machine Learning', ['m7', 'm1', 'm2', 'm3'], 'c1', 'Supervised &amp; unsupervised learning.')}${sub('Algorithmic Thinking', ['m5'], 'c1', 'Efficiency, classic algorithms.')}</div>
      <div class="stage-label">Graduate Diploma · adds 4 compulsory subjects</div>
      <div class="stage">${sub('Deep Learning and Foundation Models', ['m8'], 'c2', 'Neural networks, transformers.')}${sub('Learning in Multiple Modalities', ['m9'], 'c2', 'Text, images, audio.')}${sub('AI Planning for Autonomy', ['m10'], 'c2', 'Planning, MDPs, decisions.')}${sub('AI in Society', ['m11'], 'c2', 'Risks, ethics, governance.')}</div>
      <div class="stage-label">Master of AI · choose a stream (2 subjects)</div>
      <div class="grid cols2">
        <div><strong style="color:var(--c4)">Technology stream</strong><div class="stage" style="margin-top:8px">${sub('Autonomy and Optimisation Agents', ['m12'], 'c4', 'Control, optimisation.')}${sub('Multi-Agent Systems', ['m13'], 'c4', 'Game theory, simulation.')}</div></div>
        <div><strong style="color:var(--c5)">Application stream</strong><div class="stage" style="margin-top:8px">${sub('Interactive AI', ['m14'], 'c5', 'Human-centred AI.')}${sub('AI Assurance and Trust', ['m15'], 'c5', 'Robust, fair, trustworthy AI.')}</div></div>
      </div>
      <div class="stage-label">Master of AI · capstone or research (2 subjects)</div>
      <div class="stage">${sub('Coursework: AI Research and Development → AI Implementation and Deployment', ['m16'], 'c6', 'Two-part capstone project.')}${sub('Research: AI Research Project Part A → Part B', ['m16'], 'c6', 'Supervised; pathway to a PhD.')}</div>

      <h2>How the pieces depend on each other</h2>
      <div class="card"><pre style="background:var(--surface-2);color:var(--ink)"><code>Maths (1,2,3) ─┐
               ├─► Machine Learning (7) ─► Deep Learning (8) ─► Multiple Modalities (9)
Python (4) ────┤                                  │
               │                                  └────────► Assurance &amp; Trust (15)
Algorithms (5) ─► Foundations of AI (6) ─► Planning (10) ─► Autonomy (12) / Multi-Agent (13)
                                      └─► AI in Society (11) ─► Interactive AI (14)
                                                                    All ─► Capstone (16)</code></pre></div>

      <h2>Course at a glance</h2>
      <div class="grid cols2">
        <div class="card"><h3>Format</h3><ul style="margin:0"><li>Fully online, one subject at a time</li><li>Intakes: January, March, May, July, August, October</li><li>Graduate Certificate ≈ 8 months · Master’s ≈ 24 months (≈ 16 with recognition of prior learning)</li></ul></div>
        <div class="card"><h3>Entry (from the guide)</h3><ul style="margin:0"><li>No technical experience required; confidence in problem-solving and a willingness to learn programming and mathematical reasoning is expected</li><li>The first four subjects build these skills from the ground up</li></ul></div>
      </div>
      <p style="color:var(--ink-2)">The teaching team spans AI planning (Assoc. Prof. Nir Lipovetzky, course director), trustworthy and robust AI (Prof. Sarah Erfani) and natural-language processing (Prof. Eduard Hovy), among others.</p>
    </div>`;
  }

  /* ----- diagnostic ----- */
  function diagnostic() {
    const d = S.diag, DG = window.DIAG;
    if (d.done) return diagResults();
    if (!d.started && !d.answers.length) {
      return `<div class="page"><div class="eyebrow">Diagnostic</div><h1>Where are you starting from?</h1>
      <p class="lead">24 short multiple-choice questions across six areas. It takes about 15 minutes.</p>
      <div class="card"><ul><li><strong>It’s not a test.</strong> Nothing is graded or recorded anywhere except in your own browser.</li><li><strong>“Not sure” is a great answer.</strong> Guessing blurs the picture. Honest answers give you a better study plan.</li><li><strong>No calculator, no searching.</strong> Just try.</li><li>At the end you’ll see a score per area, a personalised study order, and an explanation of every answer.</li></ul>
      <button class="btn" id="dStart" type="button">Start the diagnostic</button></div></div>`;
    }
    const i = Math.min(d.pos || 0, DG.length - 1), q = DG[i], sel = d.answers[i];
    const area = window.DIAG_AREAS.find((a) => a.id === q.area);
    return `<div class="page"><div class="eyebrow">Diagnostic · ${area.name}</div>
      <div class="dprog" role="progressbar" aria-valuemin="0" aria-valuemax="${DG.length}" aria-valuenow="${i}"><div style="width:${i / DG.length * 100}%"></div></div>
      <p style="color:var(--ink-3);margin:0 0 6px">Question ${i + 1} of ${DG.length}</p>
      <div class="card"><div class="q" style="font-size:1.1rem;font-weight:600;margin-bottom:12px">${q.q}</div>
      <div role="radiogroup" aria-label="Answer options">${q.o.map((o, k) => `<button class="opt ${sel === k ? 'sel' : ''}" role="radio" aria-checked="${sel === k}" data-k="${k}" type="button">${o}</button>`).join('')}
      <button class="opt ${sel === -1 ? 'sel' : ''}" role="radio" aria-checked="${sel === -1}" data-k="-1" type="button" style="color:var(--ink-2);border-style:dashed">I’m not sure</button></div>
      <div class="pager" style="margin-top:20px;padding-top:14px"><button class="btn ghost" id="dBack" type="button" ${i === 0 ? 'disabled' : ''}>← Back</button><button class="btn" id="dNext" type="button" ${sel === undefined ? 'disabled' : ''}>${i === DG.length - 1 ? 'Finish' : 'Next →'}</button></div></div></div>`;
  }
  function bindDiag() {
    const st = document.getElementById('dStart'); if (st) st.onclick = () => { S.diag.started = true; S.diag.pos = 0; save(); route(); };
    $main.querySelectorAll('.opt[data-k]').forEach((b) => b.addEventListener('click', () => { S.diag.answers[S.diag.pos] = +b.dataset.k; save(); route(true); }));
    const nx = document.getElementById('dNext'), bk = document.getElementById('dBack');
    if (nx) nx.onclick = () => { if (S.diag.pos >= window.DIAG.length - 1) { S.diag.done = true; } else S.diag.pos++; save(); route(); renderSide(cur()); refreshProgress(); };
    if (bk) bk.onclick = () => { S.diag.pos = Math.max(0, S.diag.pos - 1); save(); route(); };
    const rt = document.getElementById('dRetake'); if (rt) rt.onclick = () => { S.diag = { answers: [], done: false, pos: 0 }; save(); route(); renderSide(cur()); };
  }
  function diagResults() {
    const R = diagResult(), DG = window.DIAG, A = S.diag.answers;
    const unsure = A.filter((a) => a === -1).length;
    const order = MODS.filter((m) => m.part <= 1 || m.id === 'm6' || m.id === 'm7');
    const start = [], refresh = [], strong = [];
    MODS.filter((m) => m.part <= 1 || R.mods[m.id]).forEach((m) => { const r = R.mods[m.id]; (r ? (r.lvl.key === 'start' ? start : r.lvl.key === 'refresh' ? refresh : strong) : start).push(m); });
    const msg = R.total <= 8 ? 'You’re at the very start of the journey, which is exactly who this course is designed to welcome. Work through the modules in order; take your time with Python and the maths language.'
      : R.total <= 16 ? 'You have some solid foundations and a few gaps, which is the most common starting point. Focus on the “Start here” and “Refresh” modules first.'
        : 'You’re in strong shape. Skim the bridge modules for gaps, then preview the core subject modules (6–11).';
    return `<div class="page"><div class="eyebrow">Diagnostic results</div><h1>Your starting point</h1>
      <div class="card"><div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap"><div style="font-size:2.6rem;font-weight:800;color:var(--brand)">${R.total}<span style="font-size:1.1rem;color:var(--ink-3)"> / ${DG.length}</span></div><div style="flex:1;min-width:240px">${msg}${unsure ? `<br><small style="color:var(--ink-3)">You answered “not sure” ${unsure} time${unsure > 1 ? 's' : ''}; that is useful information, not a failure.</small>` : ''}</div></div></div>
      <h2 style="margin-top:1.4rem">By area</h2>
      <div class="card">${R.areas.map((a) => `<div class="areabar"><div><strong>${a.name}</strong><br><small style="color:var(--ink-3)">${a.blurb}</small></div><div class="track"><div class="fill ${a.lvl.key}" style="width:${a.c / a.t * 100}%"></div></div><div>${a.c}/${a.t}</div></div>`).join('')}</div>
      <h2>Your suggested path</h2>
      <p>Modules grouped by how much attention each needs. Click to open.</p>
      ${[['Start here', 'start', start], ['Refresh', 'refresh', refresh], ['Strong: skim, then move on', 'strong', strong]].filter((g) => g[2].length).map(([lab, key, arr]) => `<div class="card"><h3><span class="badge ${key}" >${lab}</span></h3><div class="chips" style="margin:0">${arr.map((m) => modLink(m.id)).join('')}</div></div>`).join('')}
      <div class="callout good"><strong>Next</strong>Work through the groups above, then continue with ${modLink('m6')} and the remaining core subjects (modules 8–10), then your chosen stream.</div>
      <h2>Review your answers</h2>
      <div class="card">${DG.map((q, i) => { const ok = R.correct[i], a = A[i]; return `<div class="review-item"><div>${ok ? '<span class="ok">✓</span>' : '<span class="no">✗</span>'} <strong>${i + 1}.</strong> ${q.q}</div><div style="color:var(--ink-2);margin-top:4px">Your answer: ${a === -1 || a === undefined ? '<em>not sure</em>' : q.o[a]}${ok ? '' : ` · Correct: <strong>${q.o[q.a]}</strong>`}</div><div class="explain">${q.why} ${modLink(q.mod, 'Review in module ' + byId[q.mod].n)}</div></div>`; }).join('')}</div>
      <button class="btn ghost" id="dRetake" type="button">Retake the diagnostic</button></div>`;
  }

  /* ----- module ----- */
  function modulePage(id) {
    const m = byId[id]; if (!m) return notFound();
    const st = ms(id), p = PARTS[m.part], prev = MODS[m.n - 1], next = MODS[m.n + 1];
    return `<div class="page">
      <div class="crumbs"><a href="#/home">Primer</a> › ${p.name}</div>
      <div class="eyebrow"><span class="part-tag ${p.cls}">${p.name}</span>Module ${m.n}</div>
      <h1>${m.title}</h1>
      <div class="meta"><span><b>Prepares for</b> ${m.subject}</span><span><b>Time</b> ${m.time}</span><span><b>Level</b> ${m.level}</span>${modBadge(m.id)}</div>
      <div class="toc" aria-label="On this page">${['Plain language', 'In the course', 'Big ideas', m.demo ? 'Try it' : '', 'Check yourself', 'Ready when', 'Go deeper'].filter(Boolean).map((t, i) => `<a class="chip" href="#sec-${i}" data-sec="${t}">${t}</a>`).join('')}</div>

      <h2 id="sec-0">In plain language</h2><div class="lead" style="font-size:1.06rem;color:var(--ink)">${m.intro}</div>
      ${m.prereq.length ? `<p><strong>Helpful first:</strong></p><div class="chips">${m.prereq.map((x) => modLink(x)).join('')}</div>` : '<p style="color:var(--ink-2)">No prerequisites: you can start here.</p>'}

      <h2 id="sec-1">Where this shows up in the course</h2>
      <div class="callout"><strong>From the course guide</strong>${m.covers}</div>

      <h2 id="sec-2">Big ideas</h2>
      ${m.concepts.map((c, i) => `<div class="card concept"><div class="n">${i + 1}</div><div><h3>${c.h}</h3>${c.p}${c.html || ''}${c.analogy ? `<div class="callout analogy"><strong>Analogy</strong>${c.analogy}</div>` : ''}</div></div>`).join('')}

      ${m.demo ? `<h2 id="sec-3">Try it</h2><div class="demo"><h3>${m.demo.title}</h3><p>${m.demo.intro}</p><div id="demoRoot"></div></div>` : ''}

      <h2 id="sec-${m.demo ? 4 : 3}">Check yourself</h2>
      <div class="card" id="quiz">${m.quiz.map((q, qi) => { const a = st.quiz[qi]; return `<div class="quiz-q" data-qi="${qi}"><p class="q">${qi + 1}. ${q.q}</p>${q.o.map((o, k) => `<button class="opt ${a !== undefined ? (k === q.a ? 'right' : (k === a ? 'wrong' : '')) : ''}" data-k="${k}" ${a !== undefined ? 'disabled' : ''} type="button">${o}</button>`).join('')}<div class="explain" ${a === undefined ? 'hidden' : ''}>${a !== undefined ? (a === q.a ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') + q.why : ''}</div></div>`; }).join('')}
        <button class="btn small ghost" id="quizReset" type="button" style="margin-top:8px">Reset quiz</button></div>

      <h2 id="sec-${m.demo ? 5 : 4}">You’re ready for the next step when…</h2>
      <div class="card checks">${m.can.map((c, i) => `<label><input type="checkbox" data-i="${i}" ${st.can[i] ? 'checked' : ''}><span>${c}</span></label>`).join('')}</div>

      <h2 id="sec-${m.demo ? 6 : 5}">Go deeper</h2>
      <p>Hand-picked, reputable, mostly free. Ordered roughly from gentlest to hardest. <a href="#/resources">Browse all resources →</a></p>
      <div class="res">${m.links.map((l) => resItem(l)).join('')}</div>

      <div class="pager">${prev ? `<a href="#/m/${prev.id}"><small>← Previous</small>${prev.title}</a>` : '<span></span>'}${next ? `<a class="next" href="#/m/${next.id}"><small>Next →</small>${next.title}</a>` : ''}</div>
    </div>`;
  }
  function bindModule(id) {
    const m = byId[id], st = ms(id);
    $main.querySelectorAll('.quiz-q').forEach((box) => { const qi = +box.dataset.qi, q = m.quiz[qi]; box.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => { const k = +b.dataset.k; st.quiz[qi] = k; save(); box.querySelectorAll('.opt').forEach((x) => { x.disabled = true; const kk = +x.dataset.k; if (kk === q.a) x.classList.add('right'); else if (kk === k) x.classList.add('wrong'); }); const ex = box.querySelector('.explain'); ex.hidden = false; ex.innerHTML = (k === q.a ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') + q.why; })); });
    const qr = document.getElementById('quizReset'); if (qr) qr.onclick = () => { st.quiz = {}; save(); route(true); };
    $main.querySelectorAll('.checks input').forEach((c) => c.addEventListener('change', () => { st.can[+c.dataset.i] = c.checked; save(); refreshProgress(); renderSide(id); }));
    if (m.demo && window.DEMOS[m.demo.id]) { const r = document.getElementById('demoRoot'); try { window.DEMOS[m.demo.id](r); } catch (e) { r.innerHTML = '<p>Sorry, this demo failed to load.</p>'; console.error(e); } }
  }

  /* ----- glossary ----- */
  function glossary() {
    return `<div class="page"><div class="eyebrow">Reference</div><h1>Glossary</h1><p class="lead">Plain-language definitions of ${window.GLOSSARY.length} terms you will meet. Each links to the module that teaches it.</p>
      <div class="filters"><input id="gq" type="search" placeholder="Search terms…" aria-label="Search the glossary"></div><dl class="gloss" id="gl"></dl></div>`;
  }
  function bindGlossary() {
    const list = [...window.GLOSSARY].sort((a, b) => a[0].localeCompare(b[0])), dl = document.getElementById('gl'), q = document.getElementById('gq');
    const hl = (t, s) => s ? t.replace(new RegExp('(' + s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>') : t;
    const draw = () => { const s = q.value.trim(), items = list.filter(([t, d]) => !s || (t + ' ' + d).toLowerCase().includes(s.toLowerCase())); dl.innerHTML = items.length ? items.map(([t, d, m]) => `<dt>${hl(esc(t), esc(s))}<small><a href="#/m/${m}">module ${byId[m].n}</a></small></dt><dd>${hl(esc(d), esc(s))}</dd>`).join('') : '<p>No matches.</p>'; };
    q.addEventListener('input', draw); draw();
  }

  /* ----- resources ----- */
  function resources() {
    const all = new Map(); MODS.forEach((m) => m.links.forEach((l) => { const k = l.u; if (!all.has(k)) all.set(k, Object.assign({}, l, { mods: [] })); all.get(k).mods.push(m.id); }));
    window.__RES = [...all.values()];
    const kinds = ['All', ...new Set(window.__RES.map((r) => r.k))], levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];
    return `<div class="page"><div class="eyebrow">Reference</div><h1>Resource library</h1><p class="lead">${window.__RES.length} curated links from universities, standards bodies, and respected educators. Filter by type or level.</p>
      <div class="filters" id="fk">${kinds.map((k, i) => `<button type="button" data-k="${k}" aria-pressed="${i === 0}">${k}</button>`).join('')}</div>
      <div class="filters" id="fl">${levels.map((k, i) => `<button type="button" data-l="${k}" aria-pressed="${i === 0}">${k}</button>`).join('')}<input id="rq" type="search" placeholder="Search…" aria-label="Search resources"></div>
      <div class="res" id="rl"></div><p style="color:var(--ink-3);font-size:.88rem;margin-top:18px">Links open third-party sites in a new tab. Availability, cost and content can change; “free” reflects the situation when this primer was written.</p></div>`;
  }
  function bindResources() {
    let k = 'All', l = 'All levels'; const rl = document.getElementById('rl'), rq = document.getElementById('rq');
    const draw = () => { const s = rq.value.trim().toLowerCase(); const items = window.__RES.filter((r) => (k === 'All' || r.k === k) && (l === 'All levels' || r.l.startsWith(l)) && (!s || (r.t + r.n).toLowerCase().includes(s))); rl.innerHTML = items.length ? items.map((r) => resItem(r, `<span class="n">Used in: ${r.mods.map((m) => `<span class="chip" style="font-size:.74rem">M${byId[m].n}</span>`).join(' ')}</span>`)).join('') : '<p>No matches.</p>'; };
    const wire = (id, attr, set) => document.querySelectorAll('#' + id + ' button').forEach((b) => b.addEventListener('click', () => { set(b.dataset[attr]); document.querySelectorAll('#' + id + ' button').forEach((x) => x.setAttribute('aria-pressed', x === b)); draw(); }));
    wire('fk', 'k', (v) => (k = v)); wire('fl', 'l', (v) => (l = v)); rq.addEventListener('input', draw); draw();
  }
  const notFound = () => '<div class="page"><h1>Page not found</h1><p><a href="#/home">Go home</a></p></div>';

  /* ---------- router ---------- */
  const cur = () => { const h = location.hash.replace(/^#\/?/, '') || 'home'; return h.startsWith('m/') ? h.slice(2) : h; };
  function route(keepScroll) {
    runCleanups();
    const h = location.hash.replace(/^#\/?/, '') || 'home', y = window.scrollY;
    let html, after = () => { };
    if (h === 'home') html = home();
    else if (h === 'map') html = map();
    else if (h === 'diagnostic') { html = diagnostic(); after = bindDiag; }
    else if (h === 'glossary') { html = glossary(); after = bindGlossary; }
    else if (h === 'resources') { html = resources(); after = bindResources; }
    else if (h.startsWith('m/')) { const id = h.slice(2); html = modulePage(id); after = () => bindModule(id); if (byId[id]) { ms(id).visited = true; save(); } }
    else html = notFound();
    $main.innerHTML = html;
    $main.querySelectorAll('pre').forEach((pre) => { if (pre.style.background) return; const b = document.createElement('button'); b.className = 'copy'; b.type = 'button'; b.textContent = 'Copy'; b.addEventListener('click', () => { navigator.clipboard && navigator.clipboard.writeText(pre.innerText.replace(/^Copy\n?/, '')); b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1200); }); pre.appendChild(b); });
    after();
    renderSide(cur()); refreshProgress();
    document.title = (h.startsWith('m/') && byId[h.slice(2)] ? byId[h.slice(2)].title + ' · ' : '') + 'M-AI Primer';
    closeMenu();
    if (keepScroll === true) window.scrollTo(0, y); else { window.scrollTo(0, 0); }
  }
  window.addEventListener('hashchange', () => route());

  /* in-page TOC links shouldn't be hijacked by the router */
  document.addEventListener('click', (e) => { const a = e.target.closest('a[href^="#sec-"]'); if (a) { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) { t.scrollIntoView({ behavior: 'smooth' }); } } });

  /* ---------- mobile menu ---------- */
  const mb = document.getElementById('menuBtn'), scrim = document.getElementById('scrim');
  function closeMenu() { $side.classList.remove('open'); scrim.hidden = true; mb.setAttribute('aria-expanded', 'false'); }
  mb.addEventListener('click', () => { const o = $side.classList.toggle('open'); scrim.hidden = !o; mb.setAttribute('aria-expanded', o); });
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  if (!location.hash) location.hash = '#/home'; else route();
})();
