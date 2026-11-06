/* Diagnostic: 24 questions, 6 areas × 4. Each question maps to the module that teaches it. */
window.DIAG_AREAS = [
  { id: 'alg',  name: 'Algebra & functions',        blurb: 'Equations, functions, sums, logarithms' },
  { id: 'lac',  name: 'Linear algebra & calculus',  blurb: 'Vectors, matrices, derivatives, gradients' },
  { id: 'ps',   name: 'Probability & statistics',   blurb: 'Chance, Bayes, averages, independence' },
  { id: 'prog', name: 'Programming & logic',        blurb: 'Python basics, data structures, booleans' },
  { id: 'algo', name: 'Algorithms & complexity',    blurb: 'Big-O, recursion, search, hashing' },
  { id: 'ai',   name: 'AI concepts & society',      blurb: 'ML ideas, evaluation, fairness' }
];

window.DIAG = [
  // ── Algebra & functions (m1)
  { area: 'alg', mod: 'm1', q: 'Solve for x: 3x + 7 = 22', o: ['x = 3', 'x = 5', 'x = 7', 'x = 29/3'], a: 1, why: 'Subtract 7 → 3x = 15 → x = 5.' },
  { area: 'alg', mod: 'm1', q: 'If f(x) = x² − 4, what is f(3)?', o: ['2', '5', '9', '−1'], a: 1, why: '3² − 4 = 9 − 4 = 5.' },
  { area: 'alg', mod: 'm1', q: 'What is Σ<sub>i=1</sub><sup>4</sup> i² (the sum of i squared for i = 1 to 4)?', o: ['10', '16', '30', '100'], a: 2, why: '1 + 4 + 9 + 16 = 30.' },
  { area: 'alg', mod: 'm1', q: 'What is log₂(8)?', o: ['2', '3', '4', '16'], a: 1, why: '2³ = 8, so log₂(8) = 3.' },
  // ── Linear algebra & calculus
  { area: 'lac', mod: 'm2', q: 'What is the dot product [1, 2, 3] · [4, 0, −1]?', o: ['1', '3', '7', '[4, 0, −3]'], a: 0, why: '1×4 + 2×0 + 3×(−1) = 4 + 0 − 3 = 1.' },
  { area: 'lac', mod: 'm2', q: 'A (2×3) matrix is multiplied by a (3×4) matrix. The result has shape…', o: ['3×3', '2×4', '2×3', 'Undefined'], a: 1, why: 'Inner sizes (3, 3) match and vanish; the outer sizes give 2×4.' },
  { area: 'lac', mod: 'm1', q: 'The derivative of x³ is…', o: ['x²', '3x²', '3x', 'x⁴/4'], a: 1, why: 'Power rule: 3x².' },
  { area: 'lac', mod: 'm1', q: 'The gradient of a loss function points in the direction of…', o: ['Steepest decrease', 'Steepest increase', 'The minimum', 'Zero change'], a: 1, why: 'The gradient points uphill. Gradient descent steps the opposite way.' },
  // ── Probability & statistics (m3)
  { area: 'ps', mod: 'm3', q: 'A fair die is rolled. What is P(even OR greater than 4)?', o: ['1/2', '2/3', '5/6', '1/3'], a: 1, why: 'Outcomes {2,4,5,6}: 4 of 6 = 2/3.' },
  { area: 'ps', mod: 'm3', q: 'For the data [1, 2, 2, 3, 100], which summary best represents a “typical” value?', o: ['Mean (21.6)', 'Median (2)', 'Sum (108)', 'Maximum (100)'], a: 1, why: 'The median is robust to the outlier; the mean is dragged up by it.' },
  { area: 'ps', mod: 'm3', q: 'A condition affects 1% of people. A test catches 90% of cases but also wrongly flags 10% of healthy people. If you test positive, roughly how likely is it you have the condition?', o: ['About 90%', 'About 50%', 'About 8%', 'About 1%'], a: 2, why: 'Per 1,000 people: 9 true positives vs. ~99 false positives, so 9/108 ≈ 8%. This is base-rate neglect.' },
  { area: 'ps', mod: 'm3', q: 'Events A and B are independent, P(A) = 0.5 and P(B) = 0.2. What is P(A and B)?', o: ['0.7', '0.3', '0.1', '0.25'], a: 2, why: 'Independent: multiply. 0.5 × 0.2 = 0.1.' },
  // ── Programming & logic (m4)
  { area: 'prog', mod: 'm4', q: 'What does this print?<pre><code>print(len([x for x in range(10) if x % 3 == 0]))</code></pre>', o: ['3', '4', '9', '10'], a: 1, why: 'x ∈ {0, 3, 6, 9}: four values.' },
  { area: 'prog', mod: 'm4', q: 'What does this print?<pre><code>a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)</code></pre>', o: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'An error'], a: 1, why: 'b and a refer to the same list, so appending through b changes what a sees.' },
  { area: 'prog', mod: 'm4', q: 'What does <code>not (True and False) or False</code> evaluate to?', o: ['True', 'False', 'None', 'An error'], a: 0, why: '(True and False) = False; not False = True; True or False = True.' },
  { area: 'prog', mod: 'm4', q: 'What does this print?<pre><code>def f(x):\n    x * 2\nprint(f(3))</code></pre>', o: ['6', '3', 'None', 'An error'], a: 2, why: 'No return statement, so the function returns None.' },
  // ── Algorithms & complexity (m5)
  { area: 'algo', mod: 'm5', q: 'A sorted list has 1,000,000 items. Binary search needs at most about how many comparisons?', o: ['20', '1,000', '500,000', '1,000,000'], a: 0, why: 'Halving 1,000,000 takes about 20 steps: O(log n).' },
  { area: 'algo', mod: 'm5', q: 'Two nested loops each run over all n items. The running time grows like…', o: ['n', 'log n', 'n²', '2ⁿ'], a: 2, why: 'n iterations of n iterations = n² operations.' },
  { area: 'algo', mod: 'm5', q: 'Which structure gives fast average-case lookup of a value by its key?', o: ['Linked list', 'Hash table (dictionary)', 'Unsorted array', 'Stack'], a: 1, why: 'Hash tables give O(1) average lookup.' },
  { area: 'algo', mod: 'm5', q: 'A recursive function runs forever. What is most likely missing?', o: ['A base case', 'A return type', 'A global variable', 'A loop'], a: 0, why: 'A base case tells recursion when to stop.' },
  // ── AI concepts & society (m7 / m11)
  { area: 'ai', mod: 'm7', q: 'Grouping customers into segments with no pre-existing labels is an example of…', o: ['Supervised classification', 'Regression', 'Unsupervised learning (clustering)', 'Reinforcement learning'], a: 2, why: 'No labels are provided; the algorithm finds structure itself.' },
  { area: 'ai', mod: 'm7', q: 'A model scores 99% on its training data but 62% on new data. This is called…', o: ['Underfitting', 'Overfitting', 'Regularisation', 'Cross-validation'], a: 1, why: 'It has memorised the training data rather than learning the pattern.' },
  { area: 'ai', mod: 'm7', q: 'Only 1% of transactions are fraud. A model that always predicts “not fraud” has…', o: ['1% accuracy', '50% accuracy', '99% accuracy but catches no fraud', '0% accuracy'], a: 2, why: 'Accuracy is misleading on imbalanced data. Recall would be 0.' },
  { area: 'ai', mod: 'm11', q: 'A hiring model trained on past decisions rates equally qualified women lower. The most likely cause is…', o: ['A bug in the code', 'Historical bias in the training data', 'The model is too small', 'The learning rate'], a: 1, why: 'The model learned the patterns, including unfair ones, in the historical decisions.' }
];

/* Thresholds for per-area / per-module feedback */
window.diagLevel = function (correct, total) {
  const f = correct / total;
  if (f >= 1) return { key: 'strong', label: 'Strong' };
  if (f >= 0.5) return { key: 'refresh', label: 'Refresh' };
  return { key: 'start', label: 'Start here' };
};
