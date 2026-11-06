/* Modules 6–11: Core subjects */
window.MODS = window.MODS || [];
window.MODS.push(

/* ───────────────────────── M6 ───────────────────────── */
{
  id: 'm6', part: 2, title: 'Foundations of AI: agents, search & reasoning', subject: 'Foundations of AI', time: '≈ 6 hours', level: 'Beginner–Intermediate',
  intro: `<p>This is the “classical” heart of AI: how a machine can <em>find</em> a good answer by searching through possibilities, reasoning with facts, and acting under uncertainty. These ideas come first in the course because they are the base for planning, autonomy and multi-agent systems later.</p>`,
  covers: `The course describes <em>Foundations of AI</em> as understanding “fundamental concepts, methodologies, and applications of artificial intelligence by applying them to solve real-world problems”.`,
  prereq: ['m0', 'm5'],
  concepts: [
    { h: 'Formulating a problem as search',
      p: `<p>Many AI problems reduce to: <strong>start</strong> from an initial state, apply <strong>actions</strong> that move to new states, until you reach a <strong>goal</strong>, ideally with minimum cost. The set of all reachable states is the <strong>state space</strong>, which is a graph. Route finding, puzzle solving (8-puzzle, Rubik’s cube), game moves and scheduling can all be framed this way. Deciding <em>what a state is</em> and <em>what actions are allowed</em> is half the work.</p>` },
    { h: 'Uninformed vs informed search; heuristics',
      p: `<p><strong>Uninformed</strong> search (BFS, DFS, uniform-cost) knows nothing about where the goal is, so it explores blindly. <strong>Informed</strong> search uses a <strong>heuristic</strong> <code>h(n)</code>: an estimate of the remaining cost to the goal. <strong>A*</strong> expands the node with the smallest <code>f(n) = g(n) + h(n)</code>, where <code>g</code> is the cost so far. If <code>h</code> never over-estimates (it is <em>admissible</em>) A* finds an optimal path while exploring far fewer nodes than blind search. Good heuristics are a central AI skill. Try the demo to see the difference.</p>`,
      analogy: 'Walking to a friend’s house: BFS checks every street in widening circles; A* keeps heading roughly toward their house.' },
    { h: 'Knowledge and logic',
      p: `<p>Agents can store knowledge as logical statements and <strong>infer</strong> new facts. <strong>Propositional logic</strong> uses true/false variables with AND, OR, NOT, IMPLIES. <strong>First-order logic</strong> adds objects and relations (<code>∀x Bird(x) → CanFly(x)</code>, which is false for penguins!). Logical inference is exact but brittle, which motivates both probabilistic reasoning and learning from data. <strong>Constraint satisfaction</strong> (Sudoku, timetabling) is a related, very practical sub-field.</p>` },
    { h: 'Reasoning under uncertainty',
      p: `<p>The world is not certain. <strong>Probabilistic reasoning</strong> represents beliefs as probabilities and updates them with evidence (Bayes’ theorem from the maths module). <strong>Bayesian networks</strong> draw the dependencies as a graph so you can compute things like “given the symptoms, how likely is the disease?”. These ideas lead naturally into machine learning, which is the topic of the next modules.</p>` }
  ],
  demo: { id: 'search', title: 'Play: BFS vs. greedy vs. A* on a grid', intro: 'Click or drag on the grid to draw walls. Pick an algorithm and press <em>Run</em>. Compare how many cells each explores and whether it finds the shortest path.' },
  quiz: [
    { q: 'In A* search, f(n) = g(n) + h(n). What does h(n) represent?', o: ['Cost already paid to reach n', 'Estimated remaining cost from n to the goal', 'Number of children of n', 'Depth of the tree'], a: 1, why: 'g is the cost so far; h is the heuristic estimate of what is left.' },
    { q: 'A heuristic is admissible if it…', o: ['Always over-estimates the remaining cost', 'Never over-estimates the true remaining cost', 'Is always zero', 'Equals the true cost for every state'], a: 1, why: 'Admissible means optimistic, never over-estimating, which keeps A* optimal.' },
    { q: 'Which is an example of a problem you can model as a state-space search?', o: ['Finding the quickest route between two stations', 'Calculating an average', 'Sorting a spreadsheet', 'Choosing a font'], a: 0, why: 'Stations are states, travel legs are actions, and time is the cost.' }
  ],
  can: ['I can frame a puzzle or routing task as states, actions, goal and cost', 'I can explain the difference between BFS and A*', 'I can say what a heuristic is and what “admissible” means', 'I can describe propositional logic and why we also need probability'],
  links: [
    { t: 'AIMA: Chapters 2–4 (agents, search)', u: 'https://aima.cs.berkeley.edu/', k: 'Book', l: 'Intermediate', n: 'The reference text. Companion site includes code in Python.' },
    { t: 'Introduction to A* (Red Blob Games)', u: 'https://www.redblobgames.com/pathfinding/a-star/introduction.html', k: 'Interactive', l: 'Beginner', n: 'Beautifully explained, with interactive diagrams, BFS → Dijkstra → A*.' },
    { t: 'UC Berkeley CS188: Intro to AI', u: 'http://ai.berkeley.edu/', k: 'Course', l: 'Intermediate', n: 'Lecture slides and the famous Pac-Man projects, widely used in AI courses.' },
    { t: 'VisuAlgo: graph traversal and shortest paths', u: 'https://visualgo.net/', k: 'Interactive', l: 'Beginner', n: 'Step through BFS, DFS and Dijkstra animations.' },
    { t: 'Elements of AI: Chapter 2 (problem solving)', u: 'https://www.elementsofai.com/', k: 'Course', l: 'Beginner', n: 'Gentle conceptual treatment of search and games.' }
  ]
},

/* ───────────────────────── M7 ───────────────────────── */
{
  id: 'm7', part: 2, title: 'Machine learning', subject: 'Machine Learning', time: '≈ 10 hours', level: 'Intermediate',
  intro: `<p>Instead of writing rules by hand, <strong>machine learning</strong> lets a program discover rules from examples. Give it thousands of labelled emails and it learns what spam looks like. The most important lesson of the field: <em>a model that scores well on the data it trained on may fail on new data</em>, so honest evaluation matters as much as clever algorithms.</p>`,
  covers: `<em>Machine Learning</em> explores “the core principles behind supervised and unsupervised learning and practical skills in data analysis”, so that you can “translate real-world challenges into machine learning tasks, comparing models by considering their strengths and limitations”.`,
  prereq: ['m1', 'm2', 'm3', 'm4'],
  concepts: [
    { h: 'Learning from data: supervised, unsupervised, reinforcement',
      p: `<ul><li><strong>Supervised</strong>: examples come with answers (labels). Learn to map inputs → outputs. <em>Regression</em> predicts a number; <em>classification</em> predicts a category.</li><li><strong>Unsupervised</strong>: no labels; find structure. <em>Clustering</em> (group similar items), <em>dimensionality reduction</em>, <em>anomaly detection</em>.</li><li><strong>Reinforcement</strong>: an agent learns by trial and error from rewards (covered in the planning and autonomy modules).</li></ul>` },
    { h: 'The ML workflow',
      p: `<ol><li><strong>Frame</strong> the problem: what is the input, the output, the cost of errors?</li><li><strong>Get and clean data</strong>; choose <strong>features</strong> (the input measurements).</li><li><strong>Split</strong> into <em>training</em>, <em>validation</em> and <em>test</em> sets. Never peek at the test set while building.</li><li><strong>Train</strong>: pick a model and minimise a <strong>loss function</strong> (a number measuring how wrong it is) with an optimiser such as gradient descent.</li><li><strong>Evaluate</strong> with suitable metrics; analyse errors; iterate.</li></ol><div class="callout warn"><strong>Common beginner error</strong>Data leakage: letting information from the test set sneak into training (e.g. scaling using all the data). It makes results look better than they will be in real life.</div>` },
    { h: 'Generalisation: overfitting, underfitting, bias–variance',
      p: `<p><strong>Underfitting</strong>: the model is too simple to capture the pattern (high <em>bias</em>). <strong>Overfitting</strong>: the model is so flexible that it memorises noise in the training data (high <em>variance</em>), scoring brilliantly in training but poorly on new data. The goal is the sweet spot in between. Tools to manage it: more data, simpler models, <strong>regularisation</strong>, and <strong>cross-validation</strong>. The demo shows this directly: raise the polynomial degree and watch training error fall while test error rises.</p>`,
      analogy: 'A student who memorises past exam answers (overfit) vs. one who understands the subject (generalises).' },
    { h: 'Measuring success honestly',
      p: `<p><strong>Accuracy</strong> alone can mislead. If 1% of transactions are fraud, a model that always says “not fraud” is 99% accurate and useless. Use a <strong>confusion matrix</strong> (true/false positives and negatives) and derive: <strong>precision</strong> (of the flagged, how many were right?), <strong>recall</strong> (of the real cases, how many did we catch?), and <strong>F1</strong> (their balance). Which matters more depends on the cost of each type of error: missing cancer vs. a false alarm are not equal.</p>` },
    { h: 'A starter set of models',
      p: `<p><strong>Linear / logistic regression</strong> (simple, interpretable baselines), <strong>k-nearest neighbours</strong> (classify by similar examples), <strong>decision trees and random forests</strong> (rules, strong on tables), <strong>support vector machines</strong>, <strong>k-means</strong> (clustering) and <strong>PCA</strong> (dimensionality reduction). Always start with a simple baseline: you need something to beat, and often the simple model wins.</p><pre><code>from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)
model = LogisticRegression().fit(X_tr, y_tr)
print(classification_report(y_te, model.predict(X_te)))</code></pre>` }
  ],
  demo: { id: 'fit', title: 'Play: underfitting vs. overfitting', intro: 'The dots are noisy samples of a smooth curve. Your model is a polynomial. Increase the <em>degree</em> (flexibility) and watch the training and test errors diverge. Use <em>New data</em> to see that the pattern holds.' },
  quiz: [
    { q: 'A model scores 99% on training data but 62% on unseen data. This is most likely…', o: ['Underfitting', 'Overfitting', 'Perfect generalisation', 'A data-format error'], a: 1, why: 'A large gap between training and test performance is the signature of overfitting.' },
    { q: 'Only 1% of cases are positive. A model predicts “negative” every time. Its accuracy is…', o: ['1%', '50%', '99%, but it is useless', '0%'], a: 2, why: 'It is right for the 99% negatives, yet never catches a single positive: accuracy hides this; recall exposes it.' },
    { q: 'Why keep a separate test set that you do not touch while building the model?', o: ['To make training faster', 'To get an unbiased estimate of performance on new data', 'Because libraries require it', 'To increase accuracy'], a: 1, why: 'If you tune on the test set it stops being “new” data, and your estimate becomes optimistic.' },
    { q: 'Grouping customers into segments without any pre-defined labels is…', o: ['Supervised classification', 'Regression', 'Unsupervised learning (clustering)', 'Reinforcement learning'], a: 2, why: 'No labels given; the algorithm finds structure on its own.' }
  ],
  can: ['I can classify a problem as supervised/unsupervised and regression/classification', 'I can describe the train/validation/test split and why it exists', 'I can explain overfitting and one way to reduce it', 'I can compute precision and recall from a confusion matrix', 'I can train and evaluate a simple scikit-learn model'],
  links: [
    { t: 'Machine Learning Specialization (Andrew Ng, Coursera)', u: 'https://www.coursera.org/specializations/machine-learning-introduction', k: 'Course', l: 'Beginner', n: 'The most popular first ML course, now in Python. Check Coursera for current audit/pricing options.' },
    { t: 'Machine Learning Crash Course (Google)', u: 'https://developers.google.com/machine-learning/crash-course', k: 'Course', l: 'Beginner', n: 'Free, concise, with interactive visualisations.' },
    { t: 'scikit-learn User Guide', u: 'https://scikit-learn.org/stable/user_guide.html', k: 'Docs', l: 'Intermediate', n: 'The reference for classic ML in Python. Read the “Getting started” and model-selection sections.' },
    { t: 'An Introduction to Statistical Learning with Python', u: 'https://www.statlearning.com/', k: 'Book', l: 'Intermediate', n: 'Free PDF. Clear and rigorous introduction to supervised and unsupervised learning.' },
    { t: 'StatQuest: Machine Learning playlist', u: 'https://statquest.org/', k: 'Video', l: 'Beginner', n: 'Bite-sized, friendly explanations of nearly every classic algorithm.' },
    { t: 'Kaggle Learn: Intro to Machine Learning', u: 'https://www.kaggle.com/learn', k: 'Course', l: 'Beginner', n: 'Short hands-on lessons you can complete in a browser.' },
    { t: 'Google: Rules of Machine Learning', u: 'https://developers.google.com/machine-learning/guides/rules-of-ml', k: 'Guide', l: 'Intermediate', n: 'Practical best practice from industry; skim now, return later.' }
  ]
},

/* ───────────────────────── M8 ───────────────────────── */
{
  id: 'm8', part: 2, title: 'Deep learning & foundation models', subject: 'Deep Learning and Foundation Models', time: '≈ 10 hours', level: 'Intermediate',
  intro: `<p>Deep learning is machine learning using <strong>neural networks</strong>: layered functions whose numbers (weights) are tuned by gradient descent. It powers modern image recognition, speech, translation and the large language models behind chatbots. The subject asks you to understand the maths <em>and</em> implement networks in Python, so it combines everything from the bridge modules.</p>`,
  covers: `<em>Deep Learning and Foundation Models</em>: “critically analyse the mathematical and algorithmic basis of these models… use Python to develop hands-on skills in implementing neural architectures… evaluate and select appropriate models”.`,
  prereq: ['m1', 'm2', 'm7'],
  concepts: [
    { h: 'The artificial neuron and the network',
      p: `<p>A neuron computes a weighted sum of its inputs, adds a bias, and passes the result through a non-linear <strong>activation function</strong>: <code>output = σ(w·x + b)</code>. One neuron can only draw a straight line through data. Stack neurons in <strong>layers</strong> and the network can approximate very complicated functions. Non-linear activations (ReLU, sigmoid, tanh) are essential: without them, any number of layers collapses into a single linear one. The demo shows exactly why one neuron fails on XOR.</p>` },
    { h: 'Training: loss, backpropagation, optimisers',
      p: `<p>Training repeats four steps: <strong>forward pass</strong> (compute predictions), <strong>loss</strong> (how wrong?), <strong>backward pass</strong> (backpropagation uses the chain rule to compute how each weight affected the loss), <strong>update</strong> (gradient descent or a smarter variant such as Adam). Data is fed in small <strong>batches</strong>; one pass through all data is an <strong>epoch</strong>. Training choices (learning rate, batch size, regularisation like dropout) strongly affect results.</p><pre><code>import torch, torch.nn as nn
model = nn.Sequential(nn.Linear(2, 8), nn.ReLU(), nn.Linear(8, 1))
opt = torch.optim.Adam(model.parameters(), lr=0.01)
for epoch in range(200):
    loss = nn.functional.mse_loss(model(X), y)
    opt.zero_grad(); loss.backward(); opt.step()</code></pre>` },
    { h: 'Architectures: MLP, CNN, RNN, Transformer',
      p: `<ul><li><strong>MLP</strong> (fully connected): general-purpose, for tables and small inputs.</li><li><strong>CNN</strong> (convolutional): slides small filters across an image to detect edges, then textures, then objects. Exploits spatial structure.</li><li><strong>RNN / LSTM</strong>: processes sequences step by step, passing memory forward; largely superseded for language.</li><li><strong>Transformer</strong>: uses <em>attention</em> to let every token in a sequence look at every other token in parallel. It is the architecture behind modern language, vision and multimodal models.</li></ul>` },
    { h: 'Transformers and foundation models in one page',
      p: `<p>Text is split into <strong>tokens</strong>, each mapped to an <strong>embedding</strong> vector. <strong>Self-attention</strong> computes, for each token, a weighted mix of all the other tokens’ vectors; the weights come from dot products (linear algebra!) between “query” and “key” vectors. Stacked layers refine the representation, and the model outputs a probability for the next token. A <strong>foundation model</strong> is pre-trained on huge, broad data (for example, predicting the next token across much of the internet), then <strong>adapted</strong> by fine-tuning, prompting, or human feedback. They are powerful and general, but can <strong>hallucinate</strong> confident falsehoods, absorb biases from data, and cost a lot to train: concerns that tie directly to the <em>AI in Society</em> and <em>Assurance</em> modules.</p>` }
  ],
  demo: { id: 'neuron', title: 'Play: a single neuron and the XOR problem', intro: 'Choose a dataset, then set the weights and bias so the colour regions separate the red and blue dots. AND and OR are solvable. XOR is not, with any weights, because no single straight line works. That is why we need hidden layers.' },
  quiz: [
    { q: 'Why do neural networks need non-linear activation functions?', o: ['To make numbers positive', 'Without them, stacked layers collapse to a single linear transformation', 'To reduce memory use', 'To speed up the dot product'], a: 1, why: 'Composition of linear maps is linear. Non-linearity lets deep networks model complex patterns.' },
    { q: 'Backpropagation is essentially an application of which idea?', o: ['The chain rule of calculus', 'Bayes’ theorem', 'Binary search', 'Matrix inversion'], a: 0, why: 'It computes gradients through the layers by repeatedly applying the chain rule.' },
    { q: 'In a transformer, “attention” lets each token…', o: ['Ignore all other tokens', 'Weigh and mix information from other tokens in the sequence', 'Only see the previous token', 'Be deleted'], a: 1, why: 'Self-attention computes a weighted combination over all tokens, with weights from query–key similarity.' },
    { q: 'A language model states a plausible but false fact with total confidence. This is called…', o: ['Overfitting', 'Hallucination', 'Regularisation', 'Backpropagation'], a: 1, why: 'Models generate likely text, not guaranteed-true text.' }
  ],
  can: ['I can describe a neuron and a layer in terms of dot products and activations', 'I can explain the four steps of a training loop', 'I know what CNNs, RNNs and transformers are each good at', 'I can explain what a foundation model is and name two of its limitations'],
  links: [
    { t: 'Neural networks (3Blue1Brown)', u: 'https://www.3blue1brown.com/topics/neural-networks', k: 'Video', l: 'Beginner', n: 'Start here: intuition for neurons, gradient descent, backprop and transformers.' },
    { t: 'TensorFlow Playground', u: 'https://playground.tensorflow.org/', k: 'Interactive', l: 'Beginner', n: 'Train a small neural network in your browser and watch it learn.' },
    { t: 'Neural Networks: Zero to Hero (Andrej Karpathy)', u: 'https://karpathy.ai/zero-to-hero.html', k: 'Video', l: 'Intermediate', n: 'Build neural nets and a GPT from scratch in code. Superb for hands-on understanding.' },
    { t: 'Dive into Deep Learning', u: 'https://d2l.ai/', k: 'Book', l: 'Intermediate', n: 'Free interactive textbook with code (PyTorch) and maths side by side. Used by many universities.' },
    { t: 'The Illustrated Transformer (Jay Alammar)', u: 'https://jalammar.github.io/illustrated-transformer/', k: 'Article', l: 'Intermediate', n: 'The clearest visual walk-through of transformers.' },
    { t: 'Practical Deep Learning for Coders (fast.ai)', u: 'https://course.fast.ai/', k: 'Course', l: 'Intermediate', n: 'Top-down, code-first approach; free.' },
    { t: 'PyTorch Tutorials', u: 'https://pytorch.org/tutorials/', k: 'Docs', l: 'Intermediate', n: '“Learn the basics” is a good first hour with the library.' },
    { t: 'Hugging Face LLM Course', u: 'https://huggingface.co/learn/llm-course', k: 'Course', l: 'Intermediate', n: 'Hands-on with transformers and pretrained models.' },
    { t: 'Attention Is All You Need (Vaswani et al., 2017)', u: 'https://arxiv.org/abs/1706.03762', k: 'Paper', l: 'Advanced', n: 'The paper that introduced the transformer. Read after the illustrated guide.' },
    { t: 'Deep Learning (Goodfellow, Bengio, Courville)', u: 'https://www.deeplearningbook.org/', k: 'Book', l: 'Advanced', n: 'Free online; the mathematical reference.' }
  ]
},

/* ───────────────────────── M9 ───────────────────────── */
{
  id: 'm9', part: 2, title: 'Learning in multiple modalities', subject: 'Learning in Multiple Modalities', time: '≈ 7 hours', level: 'Intermediate',
  intro: `<p>A “modality” is a type of data: text, images, audio, video, sensor readings. Each looks completely different to us, but to a computer, all are just arrays of numbers. This subject is about turning each modality into good numerical representations, and then combining them, for example, a model that can describe a photo or follow a spoken instruction.</p>`,
  covers: `<em>Learning in Multiple Modalities</em> focuses on “computational challenges and techniques associated with processing and analysing various data modalities, including text, images and audio”.`,
  prereq: ['m2', 'm8'],
  concepts: [
    { h: 'Everything is numbers',
      p: `<p><strong>Images</strong> are grids of pixel values (a colour image is height × width × 3 channels). <strong>Audio</strong> is a waveform: thousands of amplitude samples per second, often converted to a <strong>spectrogram</strong> (time × frequency picture) for analysis. <strong>Text</strong> is split into tokens (words or word-pieces), each mapped to an integer ID and then to an <strong>embedding</strong> vector. The first design question for any modality is: how do I represent it so a model can learn from it?</p>` },
    { h: 'Specialised architectures for each modality',
      p: `<p><strong>Images</strong>: convolutional networks (CNNs) detect local patterns using shared filters; Vision Transformers (ViT) cut an image into patches and treat them like tokens. <strong>Audio</strong>: spectrogram + CNN/transformer (e.g. Whisper for speech recognition). <strong>Text</strong>: transformers with token embeddings. Each architecture builds in a sensible assumption about the data: nearby pixels are related; words depend on context; sounds change over time.</p>` },
    { h: 'Embeddings and shared spaces',
      p: `<p>An <strong>embedding</strong> maps an item to a vector so that <em>similar items are close</em> (high cosine similarity). A powerful trick is to train text and image encoders together so the caption “a dog on a beach” and a photo of it land near each other: this is the idea behind <strong>CLIP</strong>. This lets you search images with words, or classify images into categories you never explicitly trained on (“zero-shot”).</p>` },
    { h: 'Fusion, evaluation and pitfalls',
      p: `<p>To combine modalities you can <strong>fuse early</strong> (merge raw features), <strong>late</strong> (combine each model’s predictions) or in the middle (cross-attention). Each modality has its own metrics: word error rate for speech, accuracy or mAP for vision, BLEU/ROUGE or human judgement for generated text. Be aware of <strong>missing modalities</strong> (no audio today), <strong>misalignment</strong> (caption doesn’t match the picture) and <strong>dataset bias</strong>, which multiplies across modalities.</p>` }
  ],
  demo: { id: 'pixels', title: 'Play: an image is just a grid of numbers', intro: 'Paint on the 8×8 grid (click or drag; shift-click to erase). The numbers are what the model sees. Then apply a 3×3 <em>convolution filter</em>: the same operation CNNs use to find edges.' },
  quiz: [
    { q: 'A 224 × 224 colour (RGB) image is stored as an array of shape…', o: ['224 × 224', '224 × 224 × 3', '3 × 3', '224 × 3'], a: 1, why: 'Height × width × 3 colour channels.' },
    { q: 'What is a spectrogram?', o: ['A picture of frequency content over time, made from audio', 'A type of image sensor', 'A text embedding', 'A compression format'], a: 0, why: 'It converts a waveform into a time-by-frequency image that image-style models can process.' },
    { q: 'In a CLIP-style model, a photo of a dog and the text “a dog” should have embeddings that are…', o: ['Orthogonal', 'Close together (high cosine similarity)', 'Identical in size', 'Opposite'], a: 1, why: 'Training pulls matching image–text pairs together and pushes mismatched pairs apart.' }
  ],
  can: ['I can describe how images, audio and text are represented as numbers', 'I can say what a CNN, a spectrogram and an embedding are for', 'I can explain how a shared embedding space enables image search by text', 'I can name two difficulties of combining modalities'],
  links: [
    { t: 'Stanford CS231n: Deep Learning for Computer Vision', u: 'http://cs231n.stanford.edu/', k: 'Course', l: 'Intermediate', n: 'Notes are an outstanding free resource on CNNs and image models.' },
    { t: 'Hugging Face Audio Course', u: 'https://huggingface.co/learn/audio-course', k: 'Course', l: 'Intermediate', n: 'Hands-on audio ML: waveforms, spectrograms, speech recognition.' },
    { t: 'Learning Transferable Visual Models From Natural Language Supervision (CLIP)', u: 'https://arxiv.org/abs/2103.00020', k: 'Paper', l: 'Advanced', n: 'The original CLIP paper. Read the intro and figures first.' },
    { t: 'Speech and Language Processing (Jurafsky &amp; Martin)', u: 'https://web.stanford.edu/~jurafsky/slp3/', k: 'Book', l: 'Intermediate', n: 'Free draft. The standard text on text and speech.' },
    { t: 'Dive into Deep Learning: Computer Vision', u: 'https://d2l.ai/', k: 'Book', l: 'Intermediate', n: 'Code-along chapters on CNNs and modern vision models.' },
    { t: 'Distill.pub', u: 'https://distill.pub/', k: 'Articles', l: 'Intermediate', n: 'Interactive, visual explanations of ML ideas (archive; still excellent).' }
  ]
},

/* ───────────────────────── M10 ───────────────────────── */
{
  id: 'm10', part: 2, title: 'AI planning for autonomy', subject: 'AI Planning for Autonomy', time: '≈ 8 hours', level: 'Intermediate',
  intro: `<p>An <strong>autonomous agent</strong> doesn’t just predict; it <em>chooses what to do</em>, over many steps, to reach a goal. Planning is how: figuring out the sequence of actions to get from here to there, and adapting when things don’t go to plan. This subject is taught by a leading planning researcher, so expect real depth.</p>`,
  covers: `<em>AI Planning for Autonomy</em> introduces “intelligent systems that perceive their environment, evaluate options and make decisions to act effectively over time”, in contexts such as “planning routes for travel, coordinating transport operations, or scheduling tasks in manufacturing”.`,
  prereq: ['m5', 'm6'],
  concepts: [
    { h: 'A planning problem: states, actions, goals',
      p: `<p>A <strong>classical planning</strong> problem has: a set of <strong>states</strong> (facts that are true), <strong>actions</strong> each with <em>preconditions</em> (what must be true to do it) and <em>effects</em> (what changes), an <strong>initial state</strong> and a <strong>goal</strong>. The planner outputs a sequence of actions that achieves the goal. This assumes a deterministic, fully observable world: a good first model. The standard language for describing such problems is <strong>PDDL</strong>:</p><pre><code>(:action move
  :parameters (?truck ?from ?to)
  :precondition (and (at ?truck ?from) (road ?from ?to))
  :effect (and (not (at ?truck ?from)) (at ?truck ?to)))</code></pre><p>“A truck can move from A to B if it is at A and a road connects them; afterwards it is at B and no longer at A.”</p>` },
    { h: 'Finding plans: search with smart heuristics',
      p: `<p>Planning is search through the state space (like the Foundations module), but the space is astronomically large, so everything depends on <strong>heuristics</strong> that estimate “how far is this state from the goal?”. A famous idea is <strong>relaxation</strong>: ignore the <em>negative</em> effects of actions (pretend nothing is ever undone) to get an easier problem whose solution gives a cheap, informative estimate. Modern planners (e.g. Fast Downward) combine A*-style search with such heuristics.</p>`,
      analogy: 'To estimate a road trip, first imagine every road is a straight line with no traffic, a simplified version that is still informative.' },
    { h: 'Planning when outcomes are uncertain: MDPs',
      p: `<p>If actions have random outcomes (a wheel slips, a package gets delayed), a fixed plan is fragile. A <strong>Markov Decision Process</strong> has states, actions, <strong>transition probabilities</strong>, <strong>rewards</strong> and a <strong>discount factor γ</strong> (how much we value the future). The solution is a <strong>policy</strong>: a rule saying what to do in <em>every</em> state. <strong>Value iteration</strong> repeatedly applies the Bellman update <code>V(s) ← max<sub>a</sub> Σ P(s′|s,a)[R + γV(s′)]</code> until values settle. Play with it in the demo.</p>` },
    { h: 'Learning to act: a first look at reinforcement learning',
      p: `<p>What if you don’t know the transition probabilities? <strong>Reinforcement learning (RL)</strong> learns a policy by trial and error. <strong>Q-learning</strong> maintains an estimate Q(s,a) of the long-run reward of taking action a in state s and updates it from experience. A central tension is <strong>exploration vs. exploitation</strong>: try new things, or use what already works? In practice real agents also <strong>monitor and replan</strong> as the world changes.</p>` }
  ],
  demo: { id: 'mdp', title: 'Play: value iteration in a grid world', intro: 'The agent wants the green +1 and avoids the red −1. Each move costs a little. Press <em>Step</em> to run one Bellman update; watch values spread outward from the goal and arrows show the best action. Raise the <em>slip</em> chance and see the policy become more cautious around the red cell.' },
  quiz: [
    { q: 'In classical planning, an action’s “preconditions” are…', o: ['What the action changes', 'Facts that must hold before the action can be applied', 'The cost of the action', 'The goal state'], a: 1, why: 'Preconditions must be true to apply an action; effects describe what changes afterwards.' },
    { q: 'What does an MDP “policy” specify?', o: ['A single fixed sequence of actions', 'What action to take in every state', 'The reward function', 'The discount factor'], a: 1, why: 'A policy maps each state to an action, which is robust to random outcomes, unlike a fixed plan.' },
    { q: 'A discount factor γ close to 0 means the agent…', o: ['Cares mostly about immediate rewards', 'Cares equally about all future rewards', 'Never learns', 'Ignores rewards'], a: 0, why: 'Small γ shrinks future rewards, so the agent is short-sighted.' }
  ],
  can: ['I can describe a planning problem as states, actions, preconditions, effects and goal', 'I can read a simple PDDL action', 'I can explain why heuristics matter for planning', 'I can explain what an MDP and a policy are', 'I can describe exploration vs. exploitation'],
  links: [
    { t: 'Planning.Wiki', u: 'https://planning.wiki/', k: 'Reference', l: 'Intermediate', n: 'Community guide to classical planning, PDDL and planners. Excellent starting point.' },
    { t: 'Fast Downward planning system', u: 'https://www.fast-downward.org/', k: 'Tool', l: 'Advanced', n: 'A state-of-the-art open-source planner you can run on your own PDDL problems.' },
    { t: 'UC Berkeley CS188: MDPs and Reinforcement Learning', u: 'http://ai.berkeley.edu/', k: 'Course', l: 'Intermediate', n: 'Lecture notes/slides on MDPs, value iteration and Q-learning, with Pac-Man projects.' },
    { t: 'Reinforcement Learning: An Introduction (Sutton &amp; Barto)', u: 'http://incompleteideas.net/book/the-book-2nd.html', k: 'Book', l: 'Intermediate', n: 'Free. The definitive RL text. Chapters 1–4 cover this module.' },
    { t: 'Automated Planning and Acting (Ghallab, Nau, Traverso)', u: 'https://projects.laas.fr/planning/', k: 'Book', l: 'Advanced', n: 'Free draft. Comprehensive text on planning and acting.' },
    { t: 'Spinning Up in Deep RL (OpenAI)', u: 'https://spinningup.openai.com/en/latest/', k: 'Guide', l: 'Intermediate', n: 'Clear intro to RL concepts, when you are ready to go beyond tabular methods.' },
    { t: 'AIMA: Chapters 11, 17 (planning, decision-making)', u: 'https://aima.cs.berkeley.edu/', k: 'Book', l: 'Intermediate', n: 'Textbook treatment of planning and MDPs.' }
  ]
},

/* ───────────────────────── M11 ───────────────────────── */
{
  id: 'm11', part: 2, title: 'AI in society', subject: 'AI in Society', time: '≈ 5 hours', level: 'Beginner',
  intro: `<p>AI systems affect real people: who gets a loan, a job interview, medical attention, or police scrutiny. This subject trains you to “identify potential risks and unintended consequences of AI, while also exploring the positive potential” and to “communicate thoughtfully in discussions on AI ethics”. The skill is not having a slogan; it is <strong>reasoning carefully, with evidence, about trade-offs</strong>.</p>`,
  covers: `<em>AI in Society</em> is the final compulsory subject in the diploma pathway and feeds directly into the application-stream subject <em>AI Assurance and Trust</em>.`,
  prereq: ['m0'],
  concepts: [
    { h: 'Where harm comes from: a map',
      p: `<p>Problems can enter at every stage: <strong>data</strong> (unrepresentative, historically biased, mislabelled), <strong>model</strong> (optimises the wrong objective, opaque, brittle), <strong>deployment</strong> (used where it wasn’t tested, no human oversight) and <strong>use</strong> (misuse, over-reliance, surveillance, manipulation). Asking “at which stage might this go wrong?” is a quick, powerful analysis habit.</p><div class="callout analogy"><strong>Example</strong>A hiring model trained on past decisions learns the past’s prejudices. The model isn’t “evil”; it faithfully learned a biased pattern in the data.</div>` },
    { h: 'Fairness, privacy, transparency, accountability',
      p: `<ul><li><strong>Fairness</strong>: there are several mathematical definitions (equal selection rates, equal error rates, calibration); they cannot all hold at once, so choosing is a value judgement, not a purely technical one.</li><li><strong>Privacy</strong>: training data can contain personal information, and models can leak it; consent and data minimisation matter.</li><li><strong>Transparency / explainability</strong>: can people understand why a decision was made, and challenge it?</li><li><strong>Accountability</strong>: when it goes wrong, who is responsible: developer, deployer, user?</li></ul>` },
    { h: 'Wider impacts: work, environment, information, power',
      p: `<p>Automation changes jobs (some tasks disappear, new ones appear). Large models consume energy and water. Generative AI makes persuasive misinformation and deepfakes cheap. A few organisations hold most of the compute and data. At the same time, AI is accelerating drug discovery, improving accessibility tools, and helping detect disease. A balanced view holds <em>both</em> columns in mind.</p>` },
    { h: 'The governance landscape',
      p: `<p>Rules are evolving quickly. Know the main reference points: <strong>Australia’s AI Ethics Principles</strong> (eight voluntary principles: wellbeing, human-centred values, fairness, privacy and security, reliability and safety, transparency and explainability, contestability, accountability); the <strong>Voluntary AI Safety Standard</strong>; the <strong>EU AI Act</strong> (a legal framework sorting AI uses into risk tiers, from banned to minimal); the <strong>NIST AI Risk Management Framework</strong>; and international statements by the <strong>OECD</strong> and <strong>UNESCO</strong>. Check current status of any regulation before citing it.</p>` },
    { h: 'A simple method for ethical analysis',
      p: `<ol><li><strong>Describe</strong> the system and decision it supports.</li><li><strong>Identify stakeholders</strong>: who benefits, who bears the risk, who has no voice?</li><li><strong>List benefits and harms</strong> for each, with likelihood and severity.</li><li><strong>Consider alternatives</strong> (including doing nothing, or keeping a human in the loop).</li><li><strong>Decide and justify</strong>, naming the trade-off and how you would monitor it.</li></ol>` }
  ],
  demo: { id: 'lens', title: 'Try: view one system through different stakeholders’ eyes', intro: 'Pick a scenario, then click each stakeholder to see typical concerns. Notice how the “right” design question changes depending on who you ask.' },
  quiz: [
    { q: 'A model trained on historical hiring data rates equally qualified women lower. The most likely root cause is…', o: ['A bug in the Python code', 'Historical bias reflected in the training data', 'The learning rate was too high', 'Too much data'], a: 1, why: 'Models learn patterns in their data, including unfair ones from past human decisions.' },
    { q: 'Why can’t a system simply be made “fair” by satisfying all fairness definitions at once?', o: ['Computers can’t do fairness maths', 'Several common definitions are mathematically incompatible when group base rates differ', 'Fairness is illegal to measure', 'Because accuracy is always more important'], a: 1, why: 'Known impossibility results show you must choose which notion of fairness to prioritise, a value judgement.' },
    { q: 'Under the EU AI Act, systems are regulated mainly according to…', o: ['Their programming language', 'Their level of risk', 'The size of the company', 'Their energy use'], a: 1, why: 'It is a risk-based framework: unacceptable, high, limited and minimal risk tiers.' }
  ],
  can: ['I can name at least four stages where AI harm can arise', 'I can explain why fairness has multiple, sometimes conflicting, definitions', 'I can name two governance frameworks and what they aim to do', 'I can apply the five-step ethical analysis to a new scenario'],
  links: [
    { t: 'Australia’s AI Ethics Principles', u: 'https://www.industry.gov.au/publications/australias-artificial-intelligence-ethics-framework/australias-ai-ethics-principles', k: 'Policy', l: 'Beginner', n: 'The eight principles from the Australian Government. Short and readable.' },
    { t: 'Voluntary AI Safety Standard (Australia)', u: 'https://www.industry.gov.au/publications/voluntary-ai-safety-standard', k: 'Policy', l: 'Intermediate', n: 'Practical guardrails for organisations deploying AI.' },
    { t: 'NIST AI Risk Management Framework', u: 'https://www.nist.gov/itl/ai-risk-management-framework', k: 'Policy', l: 'Intermediate', n: 'Widely used framework: Govern, Map, Measure, Manage.' },
    { t: 'EU AI Act: high-level summary', u: 'https://artificialintelligenceact.eu/high-level-summary/', k: 'Policy', l: 'Beginner', n: 'Plain-language summary of the risk-tier approach.' },
    { t: 'Recommendation on the Ethics of AI (UNESCO)', u: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics', k: 'Policy', l: 'Intermediate', n: 'First global standard-setting instrument on AI ethics.' },
    { t: 'OECD AI Principles', u: 'https://oecd.ai/en/ai-principles', k: 'Policy', l: 'Beginner', n: 'Intergovernmental principles adopted by many countries.' },
    { t: 'Fairness and Machine Learning (Barocas, Hardt, Narayanan)', u: 'https://fairmlbook.org/', k: 'Book', l: 'Intermediate', n: 'Free online. The standard text on fairness; start with the introduction.' },
    { t: 'AI Index Report (Stanford HAI)', u: 'https://aiindex.stanford.edu/report/', k: 'Report', l: 'Beginner', n: 'Evidence on AI’s economic, social and policy impact.' }
  ]
}
);
