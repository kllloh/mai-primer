/* Modules 0–5: Orientation + Bridge skills */
window.MODS = window.MODS || [];
window.PARTS = {
  0: { name: 'Orientation', cls: 'p0' },
  1: { name: 'Bridge skills', cls: 'p1' },
  2: { name: 'Core subjects', cls: 'p2' },
  3: { name: 'Technology stream', cls: 'p3' },
  4: { name: 'Application stream', cls: 'p4' },
  5: { name: 'Capstone & research', cls: 'p5' }
};

window.MODS.push(

/* ───────────────────────── M0 ───────────────────────── */
{
  id: 'm0', part: 0, title: 'What is AI, really?', subject: 'Foundations of AI (orientation)', time: '≈ 2 hours', level: 'Beginner',
  intro: `<p>“AI” is used for everything from a spam filter to a chatbot to a self-driving car. This module gives you a map so every later topic has somewhere to live. You do <strong>not</strong> need any maths or code here.</p>`,
  covers: `Sets up the vocabulary used from the very first subject, <em>Foundations of AI</em>: agents, environments, search, learning, and what “intelligent” means in practice.`,
  prereq: [],
  concepts: [
    { h: 'AI is a field, not a single technology',
      p: `<p>Artificial intelligence is the study of building systems that <strong>perceive, reason, learn, decide and act</strong>. The standard university textbook (Russell &amp; Norvig, <em>Artificial Intelligence: A Modern Approach</em>) frames the goal as building <strong>rational agents</strong>: systems that pick the action expected to best achieve their goals, given what they know.</p><p>Notice what this definition leaves out: it does not require a system to think “like a human” or to be conscious. It asks whether the system behaves effectively.</p>`,
      analogy: 'A thermostat, a chess engine and a delivery drone are all “agents”. They differ enormously in how smart their decision-making is, but they share the same basic shape.' },
    { h: 'AI ⊃ Machine learning ⊃ Deep learning ⊃ Foundation models',
      p: `<p>These terms nest like Russian dolls. <strong>AI</strong> is the broad goal. <strong>Machine learning (ML)</strong> is the sub-field where systems <em>learn patterns from data</em> instead of being given explicit rules. <strong>Deep learning</strong> is ML using many-layered neural networks. <strong>Foundation models</strong> (such as large language models) are very large deep-learning models pre-trained on broad data and adapted to many tasks.</p><p>Importantly, not all AI is ML. Route planning, logical reasoning and scheduling are classical AI and are still widely used. Your degree covers both traditions.</p>`,
      html: `<div class="nest" role="img" aria-label="Nested circles: AI contains machine learning, which contains deep learning, which contains foundation models">
        <div style="width:380px;height:380px;border-color:var(--c2);background:color-mix(in srgb,var(--c2) 8%,transparent)">Artificial Intelligence</div>
        <div style="width:290px;height:290px;border-color:var(--c1);background:color-mix(in srgb,var(--c1) 10%,transparent)">Machine Learning</div>
        <div style="width:200px;height:200px;border-color:var(--c5);background:color-mix(in srgb,var(--c5) 12%,transparent)">Deep Learning</div>
        <div style="width:110px;height:110px;border-color:var(--c6);background:color-mix(in srgb,var(--c6) 14%,transparent);font-size:.7rem;padding-top:22px">Foundation models</div></div>` },
    { h: 'Two big traditions: reasoning over models vs. learning from data',
      p: `<p><strong>Model-based / symbolic AI</strong> starts with an explicit description of the world (states, actions, rules) and <em>searches or reasons</em> to find a good answer. Examples: GPS routing, scheduling, planning, logic. <strong>Learning-based AI</strong> starts with <em>examples</em> and fits a model that generalises. Examples: image recognition, translation, recommendation.</p><p>Modern systems often combine both: a learned model perceives the world, and a planner decides what to do about it.</p>` },
    { h: 'The agent loop: perceive → decide → act',
      p: `<p>Almost every subject in the degree is a variation on this loop. An agent receives <strong>percepts</strong> from its <strong>environment</strong> through sensors, chooses an <strong>action</strong>, and affects the environment through actuators. Then the loop repeats.</p><p>Environments differ in useful ways: fully or partially observable? Deterministic or random? Static or changing while the agent thinks? One agent or many? These properties decide which techniques will work, and you will see them again in <em>Planning</em>, <em>Autonomy</em> and <em>Multi-Agent Systems</em>.</p>`,
      html: `<div class="loop" role="img" aria-label="Loop: Environment to Sensors to Decision to Actuators and back to Environment"><span class="node">Environment</span><span class="arrow">→</span><span class="node">Sensors (percepts)</span><span class="arrow">→</span><span class="node">Agent decides</span><span class="arrow">→</span><span class="node">Actuators (actions)</span><span class="arrow">↺</span></div>` },
    { h: 'What kinds of problems does AI solve?',
      p: `<ul><li><strong>Predict a number</strong> (regression): house price, energy demand.</li><li><strong>Predict a category</strong> (classification): spam or not, tumour or not.</li><li><strong>Find structure</strong> (clustering, anomaly detection): customer segments, fraud.</li><li><strong>Generate content</strong>: text, images, code, audio.</li><li><strong>Choose a sequence of actions</strong> (planning, control, reinforcement learning): robot navigation, logistics.</li></ul><p>When you meet a new problem, asking “which of these is it?” is the first step of every AI project.</p>` }
  ],
  demo: null,
  quiz: [
    { q: 'Which statement best describes the relationship between AI and machine learning?', o: ['They are the same thing', 'ML is one approach within the broader field of AI', 'AI is a type of machine learning', 'ML only applies to chatbots'], a: 1, why: 'ML is a (very successful) subset of AI. Search, planning and logical reasoning are AI techniques that do not require learning from data.' },
    { q: 'A robot vacuum senses a wall, chooses to turn, and turns. In agent terms, “the wall” is part of the…', o: ['Actuator', 'Environment (observed via a sensor)', 'Reward', 'Training data'], a: 1, why: 'The wall is in the environment. The bump sensor produces a percept; the wheels are the actuators.' },
    { q: 'Predicting tomorrow’s electricity demand in MWh is best described as…', o: ['Classification', 'Clustering', 'Regression', 'Planning'], a: 2, why: 'The output is a continuous number, which is regression.' }
  ],
  can: ['I can explain AI, ML and deep learning to a friend without jargon', 'I can describe the perceive → decide → act loop with an example', 'I can tell classification, regression, clustering and planning problems apart', 'I know the difference between model-based and learning-based AI'],
  links: [
    { t: 'Elements of AI', u: 'https://www.elementsofai.com/', k: 'Course', l: 'Beginner', n: 'Free, non-technical course from the University of Helsinki. The best gentle start.' },
    { t: 'Artificial Intelligence: A Modern Approach (AIMA)', u: 'https://aima.cs.berkeley.edu/', k: 'Book', l: 'Intermediate', n: 'The standard AI textbook. Read chapters 1–2 (agents and environments) now; return to it throughout the degree.' },
    { t: 'Machine Learning Crash Course (Google)', u: 'https://developers.google.com/machine-learning/crash-course', k: 'Course', l: 'Beginner', n: 'Free, practical, with interactive exercises. Good for the “what is ML” question.' },
    { t: 'But what is a neural network? (3Blue1Brown)', u: 'https://www.3blue1brown.com/topics/neural-networks', k: 'Video', l: 'Beginner', n: 'Beautiful visual introduction to the idea behind deep learning.' },
    { t: 'AI Index Report (Stanford HAI)', u: 'https://aiindex.stanford.edu/report/', k: 'Report', l: 'Beginner', n: 'Annual, data-driven snapshot of where AI capability, investment and policy stand.' }
  ]
},

/* ───────────────────────── M1 ───────────────────────── */
{
  id: 'm1', part: 1, title: 'Maths language & calculus', subject: 'Machine Learning · Deep Learning · Autonomy & Optimisation', time: '≈ 5 hours', level: 'Beginner',
  intro: `<p>The degree asks for “confidence in problem-solving and a willingness to learn… mathematical reasoning”. You do not need to be a mathematician. You need to be able to <strong>read</strong> mathematical notation and understand a handful of ideas: functions, logarithms, slopes (derivatives) and what “following a slope downhill” means. That last idea, <em>gradient descent</em>, trains almost every modern AI model.</p>`,
  covers: `Underpins <em>Machine Learning</em> (loss functions and optimisation), <em>Deep Learning and Foundation Models</em> (the “mathematical and algorithmic basis” of neural networks) and <em>Autonomy and Optimisation Agents</em> (optimisation algorithms).`,
  prereq: [],
  concepts: [
    { h: 'Reading notation is like reading code',
      p: `<p>Symbols are shorthand. <code>f(x) = 2x + 1</code> is a function: a machine that takes <code>x</code> and returns <code>2x + 1</code>. <code>Σ</code> (sigma) means “add these up”, which is just a <code>for</code> loop: <code>Σ<sub>i=1</sub><sup>4</sup> i²</code> means 1² + 2² + 3² + 4² = 30. <code>x<sub>i</sub></code> is the i-th item in a list. <code>argmin<sub>w</sub> L(w)</code> means “the value of w that makes L smallest”, the goal of training.</p><p>When you meet an unfamiliar symbol, translate it into a sentence or a few lines of Python. Doing so removes most of the fear.</p>`,
      analogy: 'A function is a vending machine: put something in, get something out, same every time.' },
    { h: 'Functions you will see constantly: linear, quadratic, exponential, logarithm',
      p: `<p><strong>Linear</strong> (<code>y = wx + b</code>) is the building block of most models. <strong>Quadratic</strong> (<code>x²</code>) is the “squared error” used to measure mistakes. <strong>Exponential</strong> (<code>eˣ</code>) grows explosively and appears in probabilities (softmax, sigmoid). <strong>Logarithm</strong> is the inverse: <code>log₂(8) = 3</code> because 2³ = 8. Think of it as “how many times can I halve this?”, which is why <code>log n</code> shows up in algorithm speed and <code>−log p</code> shows up in loss functions and information theory.</p>` },
    { h: 'Derivatives: how steep is the curve here?',
      p: `<p>The <strong>derivative</strong> of a function at a point is its <em>slope</em> there: if you nudge the input slightly, how much does the output change? For <code>f(x) = x²</code> the derivative is <code>2x</code>: at x = 3 the curve rises 6 units per unit step; at x = 0 it is flat.</p><p>Rules you will use: power rule (<code>xⁿ → n·xⁿ⁻¹</code>), sum rule, and the <strong>chain rule</strong> (<code>d/dx f(g(x)) = f′(g(x))·g′(x)</code>). The chain rule, applied repeatedly through the layers of a network, <em>is</em> backpropagation.</p>`,
      analogy: 'Standing on a hillside in fog: the derivative tells you which way is downhill and how steeply, without seeing the whole mountain.' },
    { h: 'Gradients and gradient descent',
      p: `<p>Real models have millions of inputs (weights). The <strong>gradient</strong> is the list of partial derivatives, one per weight, pointing in the direction of <em>steepest increase</em> of the loss. To reduce the loss, step the <em>opposite</em> way:</p><pre><code>w  ←  w − learning_rate × gradient</code></pre><p>The <strong>learning rate</strong> sets the step size. Too small and training crawls; too large and it overshoots or diverges. Try it in the demo below.</p>` }
  ],
  demo: { id: 'gd', title: 'Play: gradient descent on a bumpy curve', intro: 'The ball wants to roll to a minimum. Change the starting point and the learning rate. Notice: some starts end in a different valley (a <em>local</em> minimum), and a learning rate that is too large makes it diverge.' },
  quiz: [
    { q: 'What is Σ<sub>i=1</sub><sup>3</sup> (2i)?', o: ['6', '12', '14', '18'], a: 1, why: '2 + 4 + 6 = 12.' },
    { q: 'The derivative of f(x) = x³ is…', o: ['x²', '3x²', '3x', 'x³/3'], a: 1, why: 'Power rule: bring the exponent down and subtract one: 3x².' },
    { q: 'In gradient descent, why do we subtract the gradient?', o: ['The gradient points toward the minimum', 'The gradient points toward steepest increase, so we go the other way', 'Because learning rates are negative', 'To make the weights positive'], a: 1, why: 'The gradient is the uphill direction. Moving against it reduces the loss.' },
    { q: 'log₂(1024) equals…', o: ['5', '10', '32', '512'], a: 1, why: '2¹⁰ = 1024, so you can halve 1024 ten times to get to 1.' }
  ],
  can: ['I can read Σ, subscripts and function notation and translate them to plain English or Python', 'I can explain what a derivative means as a slope', 'I can describe gradient descent and the effect of the learning rate', 'I know what a logarithm tells me'],
  links: [
    { t: 'Khan Academy: Algebra', u: 'https://www.khanacademy.org/math/algebra', k: 'Course', l: 'Beginner', n: 'Free refresher on equations, functions and graphs. Skip what you know.' },
    { t: 'Khan Academy: Differential calculus', u: 'https://www.khanacademy.org/math/differential-calculus', k: 'Course', l: 'Beginner', n: 'Derivatives from scratch, with practice problems.' },
    { t: 'Essence of Calculus (3Blue1Brown)', u: 'https://www.3blue1brown.com/topics/calculus', k: 'Video', l: 'Beginner', n: 'Builds the intuition behind derivatives better than almost any textbook.' },
    { t: 'Mathematics for Machine Learning (book)', u: 'https://mml-book.github.io/', k: 'Book', l: 'Intermediate', n: 'Free PDF by Deisenroth, Faisal &amp; Ong. The maths you need, aimed at ML. Use as a reference.' },
    { t: 'Better Explained', u: 'https://betterexplained.com/', k: 'Articles', l: 'Beginner', n: 'Plain-language intuition for e, logs, and more.' }
  ]
},

/* ───────────────────────── M2 ───────────────────────── */
{
  id: 'm2', part: 1, title: 'Linear algebra: vectors & matrices', subject: 'Machine Learning · Deep Learning · Multiple Modalities', time: '≈ 4 hours', level: 'Beginner',
  intro: `<p>Linear algebra is the language in which data and models are written. A photo, a sentence, a customer, a song: once turned into numbers, each is a <strong>vector</strong> or a <strong>matrix</strong>. A neural network is, at heart, a stack of matrix multiplications. If you grasp the dot product, you have the core idea.</p>`,
  covers: `Shows up in <em>Machine Learning</em> (features, distances, PCA), <em>Deep Learning and Foundation Models</em> (every layer is a matrix operation; attention is built from dot products) and <em>Learning in Multiple Modalities</em> (embeddings for text, images and audio).`,
  prereq: ['m1'],
  concepts: [
    { h: 'Vectors: a list of numbers that means something',
      p: `<p>A <strong>vector</strong> is an ordered list of numbers, e.g. a house described as <code>[3 bedrooms, 120 m², 15 years old]</code>. You can picture it as a point in space, or an arrow from the origin. Machine learning calls each such list a <strong>feature vector</strong>. Vectors can be added, scaled, and compared, and the length of a vector (its <strong>norm</strong>) measures its size. The distance between two vectors measures how different two items are.</p>` },
    { h: 'The dot product: the single most important operation',
      p: `<p>Multiply matching entries and add: <code>[1,2,3]·[4,0,−1] = 1×4 + 2×0 + 3×(−1) = 1</code>. It does two jobs:</p><ul><li><strong>Weighted sum.</strong> A neuron computes <code>w·x + b</code>: each input times a weight, summed.</li><li><strong>Similarity.</strong> The dot product is large when vectors point the same way, zero when perpendicular, negative when opposed. Divided by the lengths, it is the <strong>cosine similarity</strong>, which is how AI compares the “meaning” of two embeddings.</li></ul>` },
    { h: 'Matrices: tables of numbers that transform vectors',
      p: `<p>A <strong>matrix</strong> is a grid of numbers. A dataset is a matrix (rows = examples, columns = features). A layer of a neural network is a matrix too: multiplying it by an input vector turns one vector into another, often of a different size. <strong>Shape rules matter:</strong> an <code>(m×n)</code> matrix times an <code>(n×p)</code> matrix gives an <code>(m×p)</code> matrix; the inner sizes must match. Most bugs in deep-learning code are shape mismatches, so get comfortable with this early.</p>`,
      analogy: 'A matrix is a recipe for mixing ingredients: each output is a different weighted blend of the same inputs.' },
    { h: 'Dimensions, projections and PCA (a taste)',
      p: `<p>Real data can have thousands of dimensions. <strong>Dimensionality reduction</strong> (e.g. PCA) finds a few directions that capture most of the variation, built on eigenvectors and the SVD. You do not need to do these by hand; you need to know <em>why</em> they exist: to compress, visualise and de-noise data.</p>` }
  ],
  demo: { id: 'cos', title: 'Play: dot product and cosine similarity', intro: 'Rotate two vectors. Watch the dot product and the cosine similarity change. At 90° they are “unrelated”; at 0° they are “identical in direction”. Embedding-based search works on exactly this signal.' },
  quiz: [
    { q: 'What is [2, 3] · [4, −1]?', o: ['5', '8', '−3', '11'], a: 0, why: '2×4 + 3×(−1) = 8 − 3 = 5.' },
    { q: 'You multiply a (5×3) matrix by a (3×2) matrix. The result has shape…', o: ['3×3', '5×2', '5×3', 'It is undefined'], a: 1, why: 'Inner dimensions (3 and 3) match and disappear; the outer ones give 5×2.' },
    { q: 'Two embedding vectors have cosine similarity close to 1. This suggests the items are…', o: ['Very different in meaning', 'Unrelated', 'Very similar in meaning', 'Identical in length'], a: 2, why: 'Cosine near 1 means the vectors point in nearly the same direction.' }
  ],
  can: ['I can compute a dot product by hand', 'I can check whether two matrices can be multiplied and what shape the result has', 'I can explain a neuron as “weighted sum + bias”', 'I understand why cosine similarity measures “sameness of direction”'],
  links: [
    { t: 'Essence of Linear Algebra (3Blue1Brown)', u: 'https://www.3blue1brown.com/topics/linear-algebra', k: 'Video', l: 'Beginner', n: 'The definitive visual introduction. Watch chapters 1–4 and 9 first.' },
    { t: 'Khan Academy: Linear algebra', u: 'https://www.khanacademy.org/math/linear-algebra', k: 'Course', l: 'Beginner', n: 'Practice problems with immediate feedback.' },
    { t: 'Eigenvectors and Eigenvalues, explained visually', u: 'https://setosa.io/ev/', k: 'Interactive', l: 'Beginner', n: 'Interactive essays on eigenvectors and PCA.' },
    { t: 'NumPy: absolute beginners’ guide', u: 'https://numpy.org/doc/stable/user/absolute_beginners.html', k: 'Docs', l: 'Beginner', n: 'Do linear algebra in code. Connects this module to the Python module.' },
    { t: 'Mathematics for Machine Learning, Ch. 2–3', u: 'https://mml-book.github.io/', k: 'Book', l: 'Intermediate', n: 'Linear algebra and analytic geometry, when you want rigour.' }
  ]
},

/* ───────────────────────── M3 ───────────────────────── */
{
  id: 'm3', part: 1, title: 'Probability & statistics', subject: 'Machine Learning · Foundations of AI · Assurance & Trust', time: '≈ 5 hours', level: 'Beginner',
  intro: `<p>AI systems work with uncertain information: noisy sensors, incomplete data, unpredictable people. Probability is the language for reasoning under uncertainty, and statistics is how we learn from samples and decide whether a result is real. Evaluating a model honestly is a statistics problem.</p>`,
  covers: `Used in <em>Machine Learning</em> (data analysis, model comparison), <em>Foundations of AI</em> (probabilistic reasoning), <em>AI Planning</em> (stochastic outcomes) and <em>AI Assurance and Trust</em> (managing uncertainty, out-of-distribution detection).`,
  prereq: ['m1'],
  concepts: [
    { h: 'Probability basics',
      p: `<p>A probability is a number from 0 (impossible) to 1 (certain). For equally likely outcomes, <code>P(event) = favourable ÷ total</code>. A fair die: <code>P(even) = 3/6</code>. Key rules: <strong>complement</strong> <code>P(not A) = 1 − P(A)</code>; <strong>OR</strong> <code>P(A or B) = P(A) + P(B) − P(A and B)</code>; <strong>AND for independent events</strong> <code>P(A and B) = P(A)·P(B)</code>.</p>` },
    { h: 'Conditional probability and Bayes’ theorem',
      p: `<p><code>P(A | B)</code> means “probability of A <em>given</em> B is true”. <strong>Bayes’ theorem</strong> flips it around:</p><pre><code>P(disease | positive) = P(positive | disease) × P(disease) / P(positive)</code></pre><p>It is how a system <strong>updates beliefs when it sees evidence</strong>. It also reveals a classic trap, <em>base-rate neglect</em>: a 90%-accurate test for a rare condition is usually wrong when it says “positive”. The demo makes this vivid.</p>`,
      analogy: 'A smoke alarm that goes off is evidence of fire, but if it goes off every time you make toast, it is weak evidence.' },
    { h: 'Distributions, mean, variance',
      p: `<p>A <strong>distribution</strong> describes how likely each value is. The <strong>mean</strong> is the average; the <strong>median</strong> is the middle value (robust to outliers: the mean of [1,2,2,3,100] is 21.6, the median is 2). <strong>Variance</strong> and <strong>standard deviation</strong> measure spread. The <strong>normal (bell-curve) distribution</strong> appears everywhere, and <strong>Bernoulli</strong> (yes/no) underlies classification. Models often output a probability distribution rather than one answer.</p>` },
    { h: 'Samples, correlation and honesty about evidence',
      p: `<p>We rarely see all the data, only a <strong>sample</strong>. Statistics asks how far we can trust conclusions from it. Two cautions to carry through the degree: <strong>correlation is not causation</strong> (ice-cream sales and drownings both rise in summer), and <strong>you must test on data the model has not seen</strong>, otherwise your accuracy estimate is optimistic.</p>` }
  ],
  demo: { id: 'bayes', title: 'Play: why a “90% accurate” test can still be wrong most of the time', intro: 'Adjust how rare the condition is and how good the test is. The grid shows 1,000 people: see how many positives are true.' },
  quiz: [
    { q: 'A fair die is rolled. P(even or greater than 4) is…', o: ['1/2', '2/3', '5/6', '1/3'], a: 1, why: '{2,4,5,6} is 4 of 6 outcomes, so 4/6 = 2/3.' },
    { q: 'Which summary is most robust to a single extreme outlier?', o: ['Mean', 'Median', 'Variance', 'Sum'], a: 1, why: 'The median depends on the middle value, not extremes.' },
    { q: 'Two independent events have P(A)=0.5 and P(B)=0.2. P(A and B) is…', o: ['0.7', '0.3', '0.1', '0.25'], a: 2, why: 'For independent events, multiply: 0.5 × 0.2 = 0.1.' },
    { q: 'A rare condition affects 1 in 1000 people. A test is 99% sensitive with a 5% false-positive rate. Roughly, what fraction of positive results are true?', o: ['99%', '50%', 'About 2%', 'About 20%'], a: 2, why: 'Per 1000 people: ~1 true positive vs ~50 false positives, so ≈ 1/51 ≈ 2%.' }
  ],
  can: ['I can compute simple probabilities, including OR and AND', 'I can explain conditional probability and use Bayes’ theorem with natural frequencies', 'I know when to use the median instead of the mean', 'I can explain why we evaluate on unseen data'],
  links: [
    { t: 'Seeing Theory (Brown University)', u: 'https://seeing-theory.brown.edu/', k: 'Interactive', l: 'Beginner', n: 'A visual introduction to probability and statistics. Great for intuition.' },
    { t: 'Khan Academy: Statistics and probability', u: 'https://www.khanacademy.org/math/statistics-probability', k: 'Course', l: 'Beginner', n: 'Full course with exercises.' },
    { t: 'StatQuest with Josh Starmer', u: 'https://statquest.org/', k: 'Video', l: 'Beginner', n: 'Friendly, step-by-step explanations of statistics and ML concepts.' },
    { t: 'Think Stats (Allen Downey)', u: 'https://greenteapress.com/wp/think-stats-2e/', k: 'Book', l: 'Intermediate', n: 'Free book teaching statistics through Python code.' },
    { t: 'An Introduction to Statistical Learning (ISLP)', u: 'https://www.statlearning.com/', k: 'Book', l: 'Intermediate', n: 'Free PDF. Statistics meets machine learning; revisit during the ML subject.' }
  ]
},

/* ───────────────────────── M4 ───────────────────────── */
{
  id: 'm4', part: 1, title: 'Python for AI', subject: 'AI Programming Fundamentals', time: '≈ 8–12 hours', level: 'Beginner',
  intro: `<p>Python is the working language of AI. <em>AI Programming Fundamentals</em> teaches you to “create algorithms, work with large datasets and apply AI techniques using a modern programming language”. The more comfortable you are with the basics before it starts, the more attention you can give to the AI ideas themselves. Programming is a skill learned by <strong>typing code and breaking things</strong>, so use the links here to practise.</p>`,
  covers: `Directly prepares you for <em>AI Programming Fundamentals</em>, and every later subject that has you implement models, algorithms or simulations in code.`,
  prereq: [],
  concepts: [
    { h: 'The core building blocks',
      p: `<p>Every program is made from: <strong>variables</strong> (named values), <strong>types</strong> (int, float, str, bool), <strong>conditionals</strong> (<code>if</code>), <strong>loops</strong> (<code>for</code>, <code>while</code>) and <strong>functions</strong> (reusable named steps).</p><pre><code>def average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)

print(average([2, 4, 9]))   # 5.0</code></pre><p>Read it aloud: “define a function that adds up each number, then divides by how many there are”. Python is designed to read nearly like English.</p>` },
    { h: 'Data structures: lists, dictionaries, sets, tuples',
      p: `<pre><code>scores = [72, 85, 90]              # list: ordered, changeable
point  = (3, 4)                    # tuple: ordered, fixed
ages   = {"Ana": 31, "Bo": 27}     # dict: look up value by key
tags   = {"ai", "ml", "ai"}        # set: unique items only (-> 2 items)

evens = [x for x in range(10) if x % 2 == 0]   # list comprehension</code></pre><p>Pick the structure by what you need to do: keep order (list), look things up quickly by name (dict), remove duplicates (set). This links directly to the next module on efficiency.</p>`,
      analogy: 'A list is a numbered shelf; a dictionary is a phone book (look up by name, not position).' },
    { h: 'The AI toolkit: NumPy, pandas, matplotlib',
      p: `<p><strong>NumPy</strong> gives fast arrays and vector/matrix maths (<code>a @ b</code> is a matrix product). <strong>pandas</strong> handles tables of data (load a CSV, filter rows, group and summarise). <strong>matplotlib</strong> draws charts. Later you will add <strong>scikit-learn</strong> (classic ML) and <strong>PyTorch</strong> (deep learning).</p><pre><code>import numpy as np, pandas as pd

x = np.array([1.0, 2.0, 3.0])
w = np.array([0.5, -1.0, 2.0])
print(x @ w)                       # dot product -> 4.5

df = pd.read_csv("houses.csv")
print(df.groupby("suburb")["price"].mean())</code></pre><p><strong>Vectorise:</strong> operate on whole arrays at once instead of writing loops; it is cleaner and often 100× faster.</p>` },
    { h: 'Working like a programmer: notebooks, errors, debugging',
      p: `<p>Most AI work happens in <strong>Jupyter notebooks</strong> (such as Google Colab): code, output and notes together. When something breaks, <strong>read the error message from the bottom up</strong>; the last line names the problem, the lines above show where. Debug by printing intermediate values, shrinking the problem, and changing one thing at a time. Using version control (Git) and writing small tests will save you hours.</p><div class="callout"><strong>Tip</strong>A good habit from day one: write a few lines, run them, check the output, repeat. Don’t write 100 lines and then run.</div>` }
  ],
  demo: null,
  quiz: [
    { q: 'What does this print?<br><code>print(len([x for x in range(10) if x % 3 == 0]))</code>', o: ['3', '4', '9', '10'], a: 1, why: 'x is 0, 3, 6 or 9: four values.' },
    { q: 'After <code>a = [1,2,3]; b = a; b.append(4)</code>, what is <code>a</code>?', o: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'An error'], a: 1, why: '<code>b = a</code> does not copy the list; both names point at the same list object. Use <code>a.copy()</code> for an independent copy.' },
    { q: 'You need fast lookups of a student’s grade by their ID. Which structure fits best?', o: ['list', 'tuple', 'dict', 'str'], a: 2, why: 'A dictionary (hash table) maps keys to values with fast average lookup.' },
    { q: '<code>def f(x): x * 2</code> then <code>print(f(3))</code> prints…', o: ['6', '3', 'None', 'An error'], a: 2, why: 'The function computes x*2 but never returns it, so it returns None. Add <code>return</code>.' }
  ],
  can: ['I can write a function with a loop and a conditional', 'I can choose between a list, dict and set', 'I can load a CSV with pandas and compute a summary', 'I can run code in Jupyter/Colab and read an error message', 'I can explain why vectorised NumPy code is preferred over loops'],
  links: [
    { t: 'CS50’s Introduction to Programming with Python (Harvard)', u: 'https://cs50.harvard.edu/python/', k: 'Course', l: 'Beginner', n: 'Free, excellent lectures and problem sets. The best structured start for total beginners.' },
    { t: 'Automate the Boring Stuff with Python', u: 'https://automatetheboringstuff.com/', k: 'Book', l: 'Beginner', n: 'Free online. Practical, project-driven Python.' },
    { t: 'Think Python (3rd ed.)', u: 'https://allendowney.github.io/ThinkPython/', k: 'Book', l: 'Beginner', n: 'Free. Teaches how to think like a programmer.' },
    { t: 'The Python Tutorial (official)', u: 'https://docs.python.org/3/tutorial/', k: 'Docs', l: 'Beginner', n: 'Authoritative reference once you know the basics.' },
    { t: 'Kaggle Learn: Python, Pandas', u: 'https://www.kaggle.com/learn', k: 'Course', l: 'Beginner', n: 'Short hands-on lessons that run in your browser, with data-science focus.' },
    { t: 'pandas: 10 minutes to pandas', u: 'https://pandas.pydata.org/docs/user_guide/10min.html', k: 'Docs', l: 'Beginner', n: 'Quick tour of tables of data.' },
    { t: 'Google Colab', u: 'https://colab.research.google.com/', k: 'Tool', l: 'Beginner', n: 'Free in-browser notebooks, with nothing to install.' },
    { t: 'MIT OCW 6.0001: Intro to CS and Programming in Python', u: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/', k: 'Course', l: 'Intermediate', n: 'University-level course with videos and problem sets, for a deeper foundation.' }
  ]
},

/* ───────────────────────── M5 ───────────────────────── */
{
  id: 'm5', part: 1, title: 'Algorithmic thinking', subject: 'Algorithmic Thinking', time: '≈ 6 hours', level: 'Beginner–Intermediate',
  intro: `<p>An <strong>algorithm</strong> is a precise, step-by-step procedure for solving a problem. <em>Algorithmic Thinking</em> is about two questions: <strong>is it correct?</strong> and <strong>how does the work grow as the problem gets bigger?</strong> AI is full of problems that look easy at small scale and become impossible at large scale, so efficiency is not an afterthought.</p>`,
  covers: `Prepares for <em>Algorithmic Thinking</em> (“computational efficiency and… classical algorithms and data structures”), and for search and planning in <em>Foundations of AI</em> and <em>AI Planning for Autonomy</em>.`,
  prereq: ['m4'],
  concepts: [
    { h: 'Big-O: how does the work grow?',
      p: `<p><strong>Big-O notation</strong> describes how an algorithm’s running time (or memory) scales with input size <em>n</em>, ignoring constant factors. <code>O(1)</code> constant; <code>O(log n)</code> halving each step (binary search); <code>O(n)</code> one pass; <code>O(n log n)</code> good sorting; <code>O(n²)</code> nested loops; <code>O(2ⁿ)</code> trying every subset. The difference is dramatic: with n = 50, an <code>O(n²)</code> algorithm does 2,500 steps while an <code>O(2ⁿ)</code> one does over a quadrillion. See the demo.</p>`,
      analogy: 'Finding a name in a phone book: scanning every page is O(n); opening in the middle and halving is O(log n).' },
    { h: 'Data structures: choosing how to store things',
      p: `<p>How you organise data decides how fast operations are. <strong>Arrays/lists</strong>: fast by position. <strong>Hash tables (dicts)</strong>: fast average lookup by key. <strong>Stacks</strong> (last-in, first-out) and <strong>queues</strong> (first-in, first-out). <strong>Trees</strong>: hierarchies, and fast search when balanced. <strong>Graphs</strong>: nodes and edges for maps, networks and state spaces. <strong>Heaps / priority queues</strong>: always give the smallest item next, which is key for shortest-path and A* search.</p>` },
    { h: 'Classic algorithm patterns',
      p: `<ul><li><strong>Divide and conquer</strong>: split, solve halves, combine (merge sort, binary search).</li><li><strong>Greedy</strong>: take the best-looking choice each step (works for some problems, e.g. making change with standard coins).</li><li><strong>Dynamic programming</strong>: store sub-answers so you never recompute them (Fibonacci, shortest paths, edit distance).</li><li><strong>Graph traversal</strong>: BFS (explore level by level, finds fewest-step paths) and DFS (go deep first); <strong>Dijkstra</strong> for weighted shortest paths.</li><li><strong>Recursion</strong>: a function that calls itself on a smaller problem; always needs a <em>base case</em> to stop.</li></ul>` },
    { h: 'Correctness and the habit of proof-thinking',
      p: `<p>A fast wrong answer is useless. You will learn to argue that an algorithm is correct using ideas like <strong>invariants</strong> (a statement that stays true each loop) and <strong>induction</strong> (it works for the base case, and if it works for k it works for k+1). Practise by asking of any algorithm: “what is true at the start, at each step, and at the end?”</p><pre><code>def binary_search(sorted_list, target):
    lo, hi = 0, len(sorted_list) - 1
    while lo &lt;= hi:
        mid = (lo + hi) // 2
        if sorted_list[mid] == target: return mid
        if sorted_list[mid] &lt; target: lo = mid + 1
        else: hi = mid - 1
    return -1      # invariant: target, if present, is in [lo, hi]</code></pre>` }
  ],
  demo: { id: 'bigo', title: 'Play: how fast do the curves grow?', intro: 'Drag <em>n</em>. The table assumes a computer doing 1 billion simple steps per second.' },
  quiz: [
    { q: 'Binary search on a sorted list of 1,000,000 items needs at most about how many comparisons?', o: ['20', '1,000', '500,000', '1,000,000'], a: 0, why: 'You can halve 1,000,000 about 20 times (2²⁰ ≈ 1,048,576). That is O(log n).' },
    { q: 'Two nested loops each running over all n items give a running time of…', o: ['O(n)', 'O(log n)', 'O(n²)', 'O(2ⁿ)'], a: 2, why: 'n × n = n² operations.' },
    { q: 'A recursive function never stops. What is most likely missing?', o: ['A return type', 'A base case', 'A global variable', 'A loop'], a: 1, why: 'A base case is the condition under which recursion stops.' },
    { q: 'BFS (breadth-first search) on an unweighted graph is guaranteed to find…', o: ['The path with fewest edges', 'The cheapest weighted path', 'Any path, but not necessarily short', 'The longest path'], a: 0, why: 'BFS explores level by level, so the first time it reaches the goal is via a fewest-edge path.' }
  ],
  can: ['I can say whether a simple piece of code is O(1), O(n), O(n²) or O(log n)', 'I can choose a sensible data structure for a task', 'I can describe BFS, DFS and binary search in plain language', 'I can explain what a base case and an invariant are'],
  links: [
    { t: 'VisuAlgo', u: 'https://visualgo.net/', k: 'Interactive', l: 'Beginner', n: 'Animated visualisations of sorting, graphs, trees and more, from the National University of Singapore.' },
    { t: 'Python TimeComplexity (python.org wiki)', u: 'https://wiki.python.org/moin/TimeComplexity', k: 'Reference', l: 'Intermediate', n: 'Big-O of the operations on Python lists, dicts and sets.' },
    { t: 'MIT 6.006: Introduction to Algorithms', u: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/', k: 'Course', l: 'Intermediate', n: 'Full lectures, notes and problem sets. Free.' },
    { t: 'Algorithms (Jeff Erickson)', u: 'https://jeffe.cs.illinois.edu/teaching/algorithms/', k: 'Book', l: 'Advanced', n: 'Free, rigorous and well written. For the proof-thinking side.' },
    { t: 'Algorithms, 4th ed. (Sedgewick &amp; Wayne)', u: 'https://algs4.cs.princeton.edu/home/', k: 'Book', l: 'Intermediate', n: 'Free companion site with code and visual explanations.' }
  ]
}
);
