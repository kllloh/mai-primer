/* Modules 12–16: Streams + Capstone */
window.MODS = window.MODS || [];
window.MODS.push(

/* ───────────────────────── M12 ───────────────────────── */
{
  id: 'm12', part: 3, title: 'Autonomy & optimisation agents', subject: 'Autonomy and Optimisation Agents (Technology stream)', time: '≈ 8 hours', level: 'Advanced',
  intro: `<p>Planning (earlier) dealt with discrete choices: which road, which task. Real robots, vehicles and process controllers act in <strong>continuous</strong> worlds: speed, angle, temperature. This subject treats an agent as a dynamical system and asks: how do you steer it, keep it safe and make it perform best under constraints?</p>`,
  covers: `<em>Autonomy and Optimisation Agents</em> builds “a strong understanding of the mathematical principles underlying autonomous agents, including state-space representations, feedback control, optimisation algorithms”, and challenges such as “handling uncertainty, optimising performance under constraints and ensuring safe operation”.`,
  prereq: ['m1', 'm2', 'm10'],
  concepts: [
    { h: 'State-space representation',
      p: `<p>The <strong>state</strong> <code>x</code> is the minimal set of numbers describing the system now (a car’s position and speed). The <strong>input</strong> <code>u</code> is what you control (throttle). A model says how the state evolves: <code>x<sub>t+1</sub> = f(x<sub>t</sub>, u<sub>t</sub>)</code>; for linear systems, <code>x<sub>t+1</sub> = A·x<sub>t</sub> + B·u<sub>t</sub></code>, where A and B are matrices (linear algebra again). Once you have a model, you can simulate, predict, and design controllers.</p>` },
    { h: 'Feedback control',
      p: `<p>In <strong>feedback control</strong> the agent continually measures the system, compares it to a target (<code>error = target − measured</code>), and adjusts. The classic <strong>PID controller</strong> combines three terms: <strong>P</strong>roportional (react to the current error), <strong>I</strong>ntegral (react to accumulated past error; removes lingering offset) and <strong>D</strong>erivative (react to how fast the error is changing; damps overshoot). Tuning these gains is a balance between responding quickly and staying <strong>stable</strong>. Try it in the demo.</p>`,
      analogy: 'Steering a car: you look at how far you are from the lane centre and turn the wheel proportionally; too aggressive and you weave from side to side.' },
    { h: 'Optimisation: finding the best under constraints',
      p: `<p>An <strong>optimisation problem</strong> has an <em>objective</em> to minimise or maximise (cost, time, energy) and <em>constraints</em> (limits, safety). <strong>Convex</strong> problems have one global optimum and can be solved reliably; <strong>non-convex</strong> ones (like neural-network training) have many local optima. Methods include gradient descent (from the first module), linear programming, and <strong>model predictive control</strong>, where an agent repeatedly solves a short-horizon optimisation, applies the first action, then re-solves with fresh measurements.</p>` },
    { h: 'Uncertainty and safe operation',
      p: `<p>Real sensors are noisy and models are imperfect. Tools include <strong>state estimators</strong> (the Kalman filter blends a model prediction with noisy measurements to track the true state), <strong>robust control</strong> (guarantee performance despite model error) and <strong>safety constraints</strong> (hard limits the agent must never cross, e.g. maximum speed or minimum distance). “It works in simulation” is only the beginning: you must reason about what happens when things go wrong.</p>` }
  ],
  demo: { id: 'ctrl', title: 'Play: a thermostat controller (P and I terms)', intro: 'A room cools to the outside temperature. The controller sets heater power. With <strong>P only</strong>, notice the room settles <em>below</em> target: a steady-state offset. Add <strong>I</strong> to fix it. Crank gain or sensor delay up and see oscillation: the edge of instability.' },
  quiz: [
    { q: 'In a PID controller, the integral term mainly helps to…', o: ['Predict future error', 'Remove persistent steady-state error', 'Reduce sensor noise', 'Increase the sampling rate'], a: 1, why: 'Integrating accumulated error keeps pushing until the offset is gone.' },
    { q: 'The “state” of a dynamical system is…', o: ['Its history of every past input', 'The minimal information needed to predict its future given the inputs', 'The controller’s gain settings', 'The cost function'], a: 1, why: 'State summarises the present so that, with future inputs, the future follows.' },
    { q: 'Why is a convex optimisation problem easier than a non-convex one?', o: ['It has no constraints', 'Any local minimum is the global minimum', 'It has fewer variables', 'It never needs gradients'], a: 1, why: 'In convex problems there are no spurious local minima to get trapped in.' }
  ],
  can: ['I can write down a simple system in state-space form', 'I can explain P, I and D terms and what too much gain does', 'I can state an optimisation problem with objective and constraints', 'I can give two ways systems handle sensor noise or model error'],
  links: [
    { t: 'Control Systems Lectures (Brian Douglas)', u: 'https://www.youtube.com/playlist?list=PLUMWjy5jgHK1NC52DXXrriwihVrYZKqjk', k: 'Video', l: 'Beginner', n: 'Intuitive, visual lectures on feedback, PID and state-space control.' },
    { t: 'Convex Optimization (Boyd &amp; Vandenberghe)', u: 'https://web.stanford.edu/~boyd/cvxbook/', k: 'Book', l: 'Advanced', n: 'Free. The standard text; start with the early chapters on convex sets and functions.' },
    { t: 'Mathematics for Machine Learning, Ch. 5–7', u: 'https://mml-book.github.io/', k: 'Book', l: 'Intermediate', n: 'Vector calculus and continuous optimisation, aimed at ML readers.' },
    { t: 'Reinforcement Learning: An Introduction', u: 'http://incompleteideas.net/book/the-book-2nd.html', k: 'Book', l: 'Intermediate', n: 'Control meets learning: the adaptive side of autonomy.' },
    { t: 'Essence of Linear Algebra (3Blue1Brown)', u: 'https://www.3blue1brown.com/topics/linear-algebra', k: 'Video', l: 'Beginner', n: 'Refresh matrices as transformations before state-space models.' }
  ]
},

/* ───────────────────────── M13 ───────────────────────── */
{
  id: 'm13', part: 3, title: 'Multi-agent systems', subject: 'Multi-Agent Systems (Technology stream)', time: '≈ 7 hours', level: 'Advanced',
  intro: `<p>What happens when many agents, each with its own goals, act in the same world? Traffic, markets, power grids, ecosystems and fleets of warehouse robots are all multi-agent systems. The surprise is that simple rules at the individual level can create complex, unplanned group behaviour, and that individually rational choices can leave everyone worse off.</p>`,
  covers: `<em>Multi-Agent Systems</em> teaches you to “analyse, model and simulate intricate real-world scenarios using computational techniques”, identify “key features of complex systems”, and “create and validate computational models”.`,
  prereq: ['m3', 'm10'],
  concepts: [
    { h: 'Game theory: strategic choices',
      p: `<p>A <strong>game</strong> specifies players, their available actions, and <strong>payoffs</strong> for each combination of choices. A <strong>Nash equilibrium</strong> is a set of choices where no player can do better by changing alone. The <strong>Prisoner’s Dilemma</strong> shows the tension: defection is each player’s best reply no matter what the other does, yet mutual cooperation would leave both better off. It models arms races, over-fishing, and climate negotiations.</p>` },
    { h: 'Repeated interaction and the evolution of cooperation',
      p: `<p>When agents meet <em>repeatedly</em>, cooperation can emerge. In Robert Axelrod’s famous tournaments, the winning strategy was the simple <strong>Tit-for-Tat</strong>: cooperate first, then copy the other’s last move. It is <em>nice</em>, <em>retaliatory</em>, <em>forgiving</em> and <em>clear</em>. The demo lets you play and run a mini-tournament.</p>` },
    { h: 'Emergence and agent-based modelling',
      p: `<p><strong>Emergence</strong> is when global patterns arise from local interactions that no individual intends: bird flocks from three simple steering rules; neighbourhood segregation from mild individual preferences (Schelling’s model); traffic jams from drivers’ braking. <strong>Agent-based models</strong> simulate many such agents on a computer so you can experiment (“what if we change this rule?”) and compare outputs with real-world data to <strong>validate</strong> the model.</p>`,
      analogy: 'A Mexican wave: no one is in charge, yet the pattern travels around the stadium.' },
    { h: 'Coordination, negotiation and multi-agent learning',
      p: `<p>Agents can coordinate through <strong>auctions</strong> (allocate tasks or resources), <strong>voting</strong> (aggregate preferences), <strong>negotiation</strong> and <strong>contracts</strong>. When agents also <em>learn</em> (multi-agent reinforcement learning), each agent’s environment includes other learners, so what is optimal keeps shifting. Modern systems of cooperating language-model “agents” raise the same questions about coordination, incentives and safety.</p>` }
  ],
  demo: { id: 'ipd', title: 'Play: the iterated Prisoner’s Dilemma', intro: 'Choose an opponent strategy and play 10 rounds. Then run a round-robin tournament between the strategies. Payoffs: both cooperate = 3 each; both defect = 1 each; defect vs. cooperate = 5 for the defector, 0 for the sucker.' },
  quiz: [
    { q: 'In a one-shot Prisoner’s Dilemma, the Nash equilibrium is…', o: ['Both cooperate', 'Both defect', 'One cooperates, one defects', 'There is none'], a: 1, why: 'Defecting is the best reply whatever the other does, so (defect, defect) is the equilibrium, even though both would prefer (cooperate, cooperate).' },
    { q: 'What is “emergence”?', o: ['A bug in simulation code', 'Global patterns arising from simple local interactions', 'An agent’s hidden goal', 'A way to speed up training'], a: 1, why: 'Complex group behaviour can come from simple individual rules without central control.' },
    { q: 'Tit-for-Tat plays…', o: ['Defect always', 'Cooperate first, then repeat the opponent’s previous move', 'Random moves', 'Cooperate until the first defection, then defect forever'], a: 1, why: 'That description is Tit-for-Tat. The last option is the “Grim Trigger” strategy.' }
  ],
  can: ['I can read a payoff matrix and find a Nash equilibrium in a small game', 'I can explain why repetition makes cooperation possible', 'I can give an example of emergence', 'I can describe what an agent-based model is and how I might validate one'],
  links: [
    { t: 'The Evolution of Trust (Nicky Case)', u: 'https://ncase.me/trust/', k: 'Interactive', l: 'Beginner', n: 'A lovely interactive guide to game theory and cooperation. Start here.' },
    { t: 'Multiagent Systems: Algorithmic, Game-Theoretic, and Logical Foundations', u: 'http://www.masfoundations.org/', k: 'Book', l: 'Advanced', n: 'Shoham &amp; Leyton-Brown; free PDF. The standard graduate text.' },
    { t: 'An Introduction to MultiAgent Systems (Wooldridge)', u: 'https://www.cs.ox.ac.uk/people/michael.wooldridge/pubs/imas/IMAS2e.html', k: 'Book', l: 'Intermediate', n: 'A more accessible textbook introduction.' },
    { t: 'NetLogo', u: 'https://ccl.northwestern.edu/netlogo/', k: 'Tool', l: 'Beginner', n: 'Free agent-based modelling environment with a large library of example models (flocking, segregation, traffic).' },
    { t: 'Mesa: agent-based modelling in Python', u: 'https://mesa.readthedocs.io/', k: 'Docs', l: 'Intermediate', n: 'Build and visualise agent-based models in Python.' },
    { t: 'Complexity Explorer (Santa Fe Institute)', u: 'https://www.complexityexplorer.org/', k: 'Course', l: 'Beginner', n: 'Free courses on complex systems and agent-based modelling.' }
  ]
},

/* ───────────────────────── M14 ───────────────────────── */
{
  id: 'm14', part: 4, title: 'Interactive AI', subject: 'Interactive AI (Application stream)', time: '≈ 5 hours', level: 'Intermediate',
  intro: `<p>A technically excellent model can still make a terrible product if people can’t understand, steer or trust it. Interactive AI is the craft of designing the <em>human side</em> of AI systems: how people give input, how results are shown, how errors are handled, and how users stay in control.</p>`,
  covers: `<em>Interactive AI</em> covers “the role of AI in enhancing user experiences and designing intelligent interactive systems”, and building “AI-driven Human-Computer Interaction (HCI) solutions that meet user needs and preferences”.`,
  prereq: ['m7', 'm11'],
  concepts: [
    { h: 'Start from people, not from the model',
      p: `<p>Human-centred design begins with <strong>who the users are, what they are trying to do, and in what context</strong>. Before asking “can we use AI?”, ask “what problem does the user have, and is AI the right fix?”. Methods include interviews, observing real use, personas, and quick paper prototypes. A <strong>usability heuristic</strong> list such as Nielsen’s ten (visibility of system status, user control and freedom, error prevention…) remains the baseline for any interface.</p>` },
    { h: 'Designing for AI’s special problems',
      p: `<p>AI differs from ordinary software because it is <strong>probabilistic</strong>: it can be wrong in surprising ways. Good practice from Microsoft’s <em>Guidelines for Human-AI Interaction</em> and Google’s <em>People + AI Guidebook</em>: <strong>set expectations</strong> about what it can do; <strong>show confidence or uncertainty</strong> appropriately; make it easy to <strong>correct or undo</strong>; <strong>explain</strong> why it did something; <strong>learn from feedback</strong> visibly; and <strong>fail gracefully</strong> with sensible fallbacks.</p>` },
    { h: 'Common interactive AI patterns',
      p: `<ul><li><strong>Recommenders / personalisation</strong> (collaborative filtering: “people like you also liked…”) and the filter-bubble risk.</li><li><strong>Conversational interfaces</strong> (chatbots, voice assistants): turn-taking, clarification questions, handling out-of-scope requests.</li><li><strong>Assistive / co-creative tools</strong>: autocomplete, suggestion, drafting; the human stays the author.</li><li><strong>Adaptive systems</strong> that change with the user’s behaviour.</li></ul>` },
    { h: 'Trust, over-reliance and evaluation',
      p: `<p>The goal is <strong>calibrated trust</strong>: users should rely on the AI when it’s good and doubt it when it’s not. Too little trust wastes its value; too much causes <strong>automation bias</strong> (accepting wrong output). Evaluate with real users: <strong>usability tests</strong>, <strong>A/B tests</strong>, satisfaction and task-success measures, not just model accuracy. A model improvement that users can’t perceive, or that confuses them, is not an improvement.</p>` }
  ],
  demo: { id: 'confux', title: 'Try: matching interaction style to confidence and risk', intro: 'The right UI depends on how sure the model is <em>and</em> how costly a mistake would be. Move the sliders and see the suggested pattern.' },
  quiz: [
    { q: 'Which is a good human–AI interaction practice?', o: ['Hide uncertainty so users aren’t confused', 'Make it easy to correct or undo AI actions', 'Never explain decisions', 'Remove manual controls once accuracy is high'], a: 1, why: 'Recoverability and user control are core principles in both Microsoft and Google guidance.' },
    { q: '“Automation bias” is…', o: ['A bias in the training data', 'People over-trusting automated suggestions even when wrong', 'A model preferring automation tasks', 'A UI colour scheme'], a: 1, why: 'Users can defer to the machine even when they have evidence it’s wrong. Design should encourage calibrated trust.' },
    { q: 'The best way to know whether an AI feature actually helps users is to…', o: ['Check the model’s test accuracy only', 'Test with real users on real tasks', 'Add more parameters', 'Ask the engineers'], a: 1, why: 'Offline model metrics don’t capture whether users can use and benefit from the feature.' }
  ],
  can: ['I can name several of Nielsen’s heuristics', 'I can list three design principles specific to AI interfaces', 'I can explain automation bias and calibrated trust', 'I can propose how I’d evaluate an AI feature with users'],
  links: [
    { t: 'People + AI Guidebook (Google PAIR)', u: 'https://pair.withgoogle.com/guidebook/', k: 'Guide', l: 'Beginner', n: 'Practical patterns and worksheets for designing AI products around people.' },
    { t: 'Guidelines for Human-AI Interaction (Microsoft Research)', u: 'https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/', k: 'Guide', l: 'Intermediate', n: '18 research-backed guidelines with examples.' },
    { t: '10 Usability Heuristics (Nielsen Norman Group)', u: 'https://www.nngroup.com/articles/ten-usability-heuristics/', k: 'Article', l: 'Beginner', n: 'The classic checklist for interface design.' },
    { t: 'Interpretable Machine Learning (Christoph Molnar)', u: 'https://christophm.github.io/interpretable-ml-book/', k: 'Book', l: 'Intermediate', n: 'Free online. Explaining model decisions to users.' },
    { t: 'Rules of Machine Learning (Google)', u: 'https://developers.google.com/machine-learning/guides/rules-of-ml', k: 'Guide', l: 'Intermediate', n: 'Section on product metrics and human-in-the-loop practice.' }
  ]
},

/* ───────────────────────── M15 ───────────────────────── */
{
  id: 'm15', part: 4, title: 'AI assurance & trust', subject: 'AI Assurance and Trust (Application stream)', time: '≈ 7 hours', level: 'Advanced',
  intro: `<p>Is this AI system safe to rely on? <strong>Assurance</strong> is the discipline of gathering evidence that an AI system is robust, understandable, fair and aligned with the expectations of the people it affects. It turns the abstract values from the <em>AI in Society</em> module into concrete tests, metrics and documents.</p>`,
  covers: `<em>AI Assurance and Trust</em> examines whether systems are “robust, interpretable, fair, and aligned with societal expectations”: “detection and mitigation of vulnerabilities (e.g. adversarial attacks and backdoors)”, “management of uncertainty (e.g. out-of-distribution detection)” and “responsible AI governance, standards, and regulation”.`,
  prereq: ['m7', 'm8', 'm11'],
  concepts: [
    { h: 'Robustness: adversarial examples and backdoors',
      p: `<p>Tiny, carefully chosen changes to an input, imperceptible to humans, can make a neural network confidently misclassify it. These are <strong>adversarial examples</strong> (Goodfellow et al., 2014); a crafted sticker can fool a vision model. <strong>Data poisoning</strong> and <strong>backdoors</strong> are attacks during training: the attacker plants a hidden trigger so the model behaves normally until the trigger appears. Defences include adversarial training, input checks and careful data provenance. NIST maintains a standard taxonomy of these attacks.</p>` },
    { h: 'Uncertainty and out-of-distribution (OOD) inputs',
      p: `<p>Models are trained on one distribution of data but deployed in a messy world. An <strong>out-of-distribution</strong> input, something unlike anything in training, will still get a confident-looking answer unless the system is designed to notice. <strong>Uncertainty estimation</strong> and <strong>OOD detection</strong> let a system say “I don’t know”, defer to a human, or fall back to a safe action. <strong>Calibration</strong> asks: when the model says 80% confident, is it right 80% of the time?</p>` },
    { h: 'Interpretability and fairness evidence',
      p: `<p><strong>Interpretability</strong> methods help show <em>why</em> a model decided: feature-importance scores (e.g. SHAP, LIME), saliency maps for images, and inherently interpretable models (linear models, small trees). <strong>Fairness auditing</strong> compares outcomes across groups using metrics such as <em>selection rate</em> (demographic parity), <em>true-positive rate</em> (equal opportunity) and <em>calibration</em>. The demo shows that adjusting a threshold shifts these measures in different directions.</p>` },
    { h: 'Governance, standards and documentation',
      p: `<p>Assurance also means process: <strong>documentation</strong> such as <em>model cards</em> and <em>datasheets for datasets</em>; <strong>risk assessment</strong> aligned to frameworks (NIST AI RMF; ISO/IEC 42001 for AI management systems; the EU AI Act’s obligations for high-risk systems; Australia’s Voluntary AI Safety Standard); independent <strong>audits</strong>; <strong>monitoring</strong> after deployment; and clear lines of <strong>accountability</strong>. Trust is earned through evidence you can show others.</p>` }
  ],
  demo: { id: 'fair', title: 'Play: one threshold, two groups', intro: 'A model scores people in two groups; those above the threshold are approved. Group B’s scores for qualified people are systematically lower (e.g. because of noisier data). Try one shared threshold, then per-group thresholds, and compare selection rate, true-positive rate and false-positive rate. Notice that you cannot equalise everything at once.' },
  quiz: [
    { q: 'Adversarial examples are…', o: ['Inputs with tiny crafted changes that cause confident misclassification', 'Examples used only for training', 'Data from competing companies', 'Test cases that always pass'], a: 0, why: 'Small, often imperceptible perturbations can flip a model’s prediction.' },
    { q: 'An OOD (out-of-distribution) detector is designed to…', o: ['Compress the model', 'Flag inputs unlike the training data so the system can defer or abstain', 'Speed up inference', 'Increase accuracy on training data'], a: 1, why: 'It helps the system recognise when it is outside its competence.' },
    { q: '“Equal opportunity” as a fairness criterion asks that…', o: ['Everyone gets the same outcome', 'Qualified people in each group are approved at the same rate (equal TPR)', 'Both groups have the same average score', 'The model is not used'], a: 1, why: 'Equal opportunity equalises true-positive rates across groups.' },
    { q: 'A model card is…', o: ['A hardware component', 'Documentation describing a model’s intended use, data, performance and limitations', 'A licensing fee', 'A type of neural network layer'], a: 1, why: 'Model cards support transparency and accountability.' }
  ],
  can: ['I can describe an adversarial attack and a backdoor attack', 'I can explain why OOD detection and calibration matter', 'I can compute selection rate and TPR for two groups', 'I can name two standards or frameworks used for AI governance'],
  links: [
    { t: 'Adversarial Machine Learning: Taxonomy and Terminology (NIST AI 100-2)', u: 'https://csrc.nist.gov/pubs/ai/100/2/e2025/final', k: 'Report', l: 'Advanced', n: 'Authoritative overview of attacks and mitigations; read the executive summary and attack taxonomy.' },
    { t: 'Explaining and Harnessing Adversarial Examples (Goodfellow et al.)', u: 'https://arxiv.org/abs/1412.6572', k: 'Paper', l: 'Advanced', n: 'The classic paper introducing the fast gradient sign method.' },
    { t: 'Interpretable Machine Learning (Christoph Molnar)', u: 'https://christophm.github.io/interpretable-ml-book/', k: 'Book', l: 'Intermediate', n: 'Free online guide to explanation methods like SHAP and LIME.' },
    { t: 'Fairness and Machine Learning', u: 'https://fairmlbook.org/', k: 'Book', l: 'Intermediate', n: 'Free online. The textbook treatment of fairness criteria and their trade-offs.' },
    { t: 'NIST AI Risk Management Framework', u: 'https://www.nist.gov/itl/ai-risk-management-framework', k: 'Policy', l: 'Intermediate', n: 'Govern / Map / Measure / Manage, with a Playbook.' },
    { t: 'Voluntary AI Safety Standard (Australia)', u: 'https://www.industry.gov.au/publications/voluntary-ai-safety-standard', k: 'Policy', l: 'Intermediate', n: 'Ten guardrails for safe and responsible AI.' },
    { t: 'EU AI Act: high-level summary', u: 'https://artificialintelligenceact.eu/high-level-summary/', k: 'Policy', l: 'Beginner', n: 'Risk tiers and obligations in plain language.' }
  ]
},

/* ───────────────────────── M16 ───────────────────────── */
{
  id: 'm16', part: 5, title: 'Capstone & research skills', subject: 'AI Research and Development · AI Implementation and Deployment · AI Research Project A/B', time: '≈ 4 hours', level: 'Intermediate',
  intro: `<p>The end of the Master’s is a two-subject project: either a <strong>coursework capstone</strong> (<em>AI Research and Development</em> then <em>AI Implementation and Deployment</em>: plan a solution with stakeholders, then build, deploy and evaluate it) or a <strong>research project</strong> (<em>AI Research Project Parts A and B</em>, under an academic supervisor, and a pathway to a PhD). You can start building the habits now.</p>`,
  covers: `The capstone has you “identify and analyse AI-related problems, design and justify appropriate research methodologies, develop implementation plans… engage with relevant stakeholders” and then “iteratively improve… systems and evaluate their performance using appropriate metrics”.`,
  prereq: ['m7', 'm11'],
  concepts: [
    { h: 'Framing a good problem',
      p: `<p>Strong projects start with a <strong>sharp question</strong>, not a technique. Use a one-page canvas (below): who is the user, what decision does the system support, what data exists, how will success be measured, what would a <em>simple baseline</em> do, and what could go wrong? A narrow, measurable problem that you can finish beats an ambitious vague one.</p>` },
    { h: 'Research method: hypotheses, baselines, ablations',
      p: `<p>Treat your project as an experiment. State a <strong>hypothesis</strong> (“adding feature X improves recall by at least 5 points”). Compare against a <strong>baseline</strong> (the simplest reasonable method) and against any published results. Run <strong>ablations</strong> (remove one component at a time to see what mattered). Fix random seeds and record settings so results are <strong>reproducible</strong>. Report uncertainty (run several times), and do <strong>error analysis</strong>: look at the cases it gets wrong to understand why.</p>` },
    { h: 'Reading papers without drowning',
      p: `<p>Use the “three-pass” approach: <strong>(1)</strong> read the title, abstract, introduction, headings, and conclusions (5–10 min) to decide if it’s relevant; <strong>(2)</strong> read carefully, but skip proofs and heavy detail, studying the figures and tables; <strong>(3)</strong> only for key papers, try to mentally re-implement it. Keep notes: problem, method, evidence, limitations, and how it connects to your project. Start with surveys and well-cited papers, and follow their references.</p>` },
    { h: 'From notebook to deployment',
      p: `<p>Deploying means making a model <em>work reliably for real users</em>: packaging code and data pipelines, <strong>versioning</strong> data, models and code, <strong>testing</strong>, <strong>monitoring</strong> for performance drop and <strong>data drift</strong>, handling failure, and complying with privacy and governance requirements (links to the Society and Assurance modules). Choose metrics that reflect real-world cost, and communicate limitations honestly to stakeholders.</p>` },
    { h: 'Communicating your work',
      p: `<p>Write for your reader. A good report: states the problem and why it matters; summarises related work; describes method and data precisely enough to reproduce; presents results honestly (including negatives); discusses ethics and limitations; and ends with clear recommendations. Visuals should make one point each.</p>` }
  ],
  demo: { id: 'canvas', title: 'Try: your project canvas', intro: 'Sketch a project idea. Your answers are saved in your browser only. Use it again when you start the capstone or research subjects.' },
  quiz: [
    { q: 'What is the purpose of a baseline in a project?', o: ['To make the project look more complex', 'To give a simple reference point that your method must beat', 'To replace testing', 'To reduce dataset size'], a: 1, why: 'Without a baseline you can’t tell whether added complexity is worth it.' },
    { q: 'An ablation study…', o: ['Removes parts of a system one at a time to measure their contribution', 'Adds noise to the data', 'Compresses the model', 'Collects more users'], a: 0, why: 'It shows which components actually matter.' },
    { q: '“Data drift” after deployment means…', o: ['The data distribution changes over time so the model gets worse', 'Files are moved to another server', 'The model is retrained automatically', 'Labels are always wrong'], a: 0, why: 'Real-world data changes; monitoring is needed to catch the drop in performance.' }
  ],
  can: ['I can describe a problem with user, decision, data, metric and baseline', 'I can explain baselines, ablations and reproducibility', 'I can read a paper using the three-pass approach', 'I can list three things to monitor in a deployed model'],
  links: [
    { t: 'How to Read a Paper (S. Keshav)', u: 'https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf', k: 'Guide', l: 'Beginner', n: 'Two pages on the three-pass method. Read this before your first paper.' },
    { t: 'Made With ML', u: 'https://madewithml.com/', k: 'Course', l: 'Intermediate', n: 'Free course on taking ML from experiment to production.' },
    { t: 'Rules of Machine Learning (Google)', u: 'https://developers.google.com/machine-learning/guides/rules-of-ml', k: 'Guide', l: 'Intermediate', n: 'Practical lessons from building ML products at scale.' },
    { t: 'Model cards and datasheets, via NIST AI RMF Playbook', u: 'https://www.nist.gov/itl/ai-risk-management-framework', k: 'Policy', l: 'Intermediate', n: 'Frameworks for documenting and governing deployed AI.' },
    { t: 'People + AI Guidebook: stakeholder and user needs', u: 'https://pair.withgoogle.com/guidebook/', k: 'Guide', l: 'Beginner', n: 'Worksheets for defining user needs and success criteria.' }
  ]
}
);
