(function () {
  const body = document.body;
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const themeToggle = document.getElementById('themeToggle');
  const jumpButtons = document.querySelectorAll('[data-tab-jump]');
  const theoryLinks = document.querySelectorAll('.theory-link');
  const theorySections = document.querySelectorAll('.theory-section');

  // Tabs
  function activateTab(id) {
    tabButtons.forEach((btn) => {
      const active = btn.dataset.tab === id;
      btn.classList.toggle('active', active);
    });
    tabPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === `tab-${id}`);
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  jumpButtons.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tabJump));
  });

  // Theory nav
  theoryLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.section;
      theoryLinks.forEach((l) => l.classList.toggle('active', l === link));
      theorySections.forEach((section) => {
        section.classList.toggle('active', section.dataset.sectionId === target);
      });
    });
  });

  // Theme
  const storedTheme = window.localStorage.getItem('js-async-theme');
  if (storedTheme === 'light') {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('theme-dark');
    body.classList.toggle('theme-dark', !isDark);
    body.classList.toggle('theme-light', isDark);
    window.localStorage.setItem('js-async-theme', isDark ? 'light' : 'dark');
  });

  // Simple, illustrative visualizer model (not a full JS engine)
  const codeInput = document.getElementById('codeInput');
  const runBtn = document.getElementById('runBtn');
  const stepBtn = document.getElementById('stepBtn');
  const resetBtn = document.getElementById('resetBtn');
  const speedRange = document.getElementById('speedRange');

  const callStackEl = document.querySelector('#callStack .viz-list');
  const webApisEl = document.querySelector('#webApis .viz-list');
  const callbackQueueEl = document.querySelector('#callbackQueue .viz-list');
  const consoleEl = document.querySelector('#consolePanel .viz-list');

  // Simple in-memory model of the call stack so we can re-render it each step
  let stackFrames = [];

  function renderStack() {
    callStackEl.innerHTML = '';
    // Render top-of-stack at the top of the list
    for (let i = stackFrames.length - 1; i >= 0; i--) {
      const li = document.createElement('li');
      li.textContent = stackFrames[i];
      callStackEl.appendChild(li);
    }
  }

  function clearLists() {
    [callStackEl, webApisEl, callbackQueueEl, consoleEl].forEach((el) => {
      el.innerHTML = '';
    });
    stackFrames = [];
  }

  function pushItem(container, label) {
    const li = document.createElement('li');
    li.textContent = label;
    container.prepend(li);
    return li;
  }

  function logConsole(msg) {
    const li = document.createElement('li');
    li.textContent = msg;
    consoleEl.appendChild(li);
  }

  let running = false;
  let stepIndex = 0;
  let cachedSteps = null;

  // Generic step builder that inspects the current code input
  function buildSteps() {
    const src = codeInput.value || '';
    const hasPromise = src.includes('Promise.resolve') || src.includes('new Promise') || src.includes('.then(');

    // If the snippet uses Promises, fall back to the curated default sequence
    if (hasPromise) {
      return buildDefaultPromiseSteps();
    }

    const steps = [];
    const timeouts = [];

    // Enter global
    steps.push(() => {
      stackFrames = ['global()'];
      renderStack();
    });

    const lines = src.split('\n');

    lines.forEach((raw, idx) => {
      const lineNo = idx + 1;
      const line = raw.trim();
      if (!line) return;

      // Synchronous console.log
      if (line.startsWith('console.log')) {
        steps.push(() => {
          renderStack();
          logConsole(`(line ${lineNo}) console.log(...)`);
        });
      }

      // setTimeout scheduling
      if (line.includes('setTimeout(')) {
        const label = `timeout@L${lineNo}`;
        timeouts.push({ label, lineNo });
        steps.push(() => {
          stackFrames.push(`setTimeout@L${lineNo}`);
          renderStack();
          pushItem(webApisEl, `Timer from line ${lineNo}`);
          // return from setTimeout
          stackFrames.pop();
          renderStack();
        });
      }
    });

    // After global code "finishes", simulate callbacks running in registration order
    timeouts.forEach((t) => {
      // First, the callback becomes ready and is placed in the callback queue
      steps.push(() => {
        pushItem(callbackQueueEl, `timeout callback from line ${t.lineNo}`);
      });

      // Then the event loop moves it from the queue to the call stack
      steps.push(() => {
        callbackQueueEl.innerHTML = '';
        stackFrames = [t.label];
        renderStack();
        logConsole(`timeout callback from line ${t.lineNo}`);
      });

      // Finally, the callback returns and the stack is empty again
      steps.push(() => {
        stackFrames = [];
        renderStack();
      });
    });

    return steps;
  }

  // Curated sequence used when Promises are involved (default sample)
  function buildDefaultPromiseSteps() {
    const steps = [];

    // Simulate execution of the default sample code in small, named steps
    // 1) Enter global and run first log
    steps.push(() => {
      stackFrames = ['global()'];
      renderStack();
      logConsole('Start');
    });

    // 2) Call setTimeout(handler, 0)
    steps.push(() => {
      stackFrames.push('setTimeout(handler, 0)');
      renderStack();
      pushItem(webApisEl, 'Timer: handler (0ms)');
    });

    // 3) Return from setTimeout (pop it off stack)
    steps.push(() => {
      stackFrames.pop();
      renderStack();
    });

    // 4) Schedule Promise microtask
    steps.push(() => {
      stackFrames.push('Promise.resolve().then(handler)');
      renderStack();
      pushItem(callbackQueueEl, 'Promise.then microtask');
    });

    // 5) Return from Promise setup
    steps.push(() => {
      stackFrames.pop();
      renderStack();
    });

    // 6) Run final synchronous log from global
    steps.push(() => {
      renderStack();
      logConsole('End');
    });

    // 7) Move Promise microtask from queue to stack and execute
    steps.push(() => {
      // microtask was queued earlier, now the event loop takes it
      callbackQueueEl.innerHTML = '';
      stackFrames = ['then handler'];
      renderStack();
      logConsole('Promise microtask');
      // after the microtask, the timer callback becomes ready and is queued
      pushItem(callbackQueueEl, 'Timer: handler (ready)');
    });

    // 8) Run setTimeout callback from callback queue
    steps.push(() => {
      // move timer callback from queue onto the call stack
      callbackQueueEl.innerHTML = '';
      stackFrames = ['timeout handler'];
      renderStack();
      logConsole('Timeout callback');
    });

    // 9) Clear call stack (back to idle)
    steps.push(() => {
      stackFrames = [];
      renderStack();
    });

    return steps;
  }

  function resetSimulation() {
    running = false;
    stepIndex = 0;
    cachedSteps = null;
    clearLists();
  }

  function stepOnce() {
    if (!cachedSteps) {
      cachedSteps = buildSteps();
    }
    if (stepIndex >= cachedSteps.length) {
      running = false;
      return;
    }
    cachedSteps[stepIndex++]();
  }

  function runSimulation() {
    if (running) return;
    resetSimulation();
    running = true;

    const speedFactor = Number(speedRange.value) || 1;
    const delay = 600 / speedFactor;

    function loop() {
      if (!running) return;
      if (!cachedSteps) {
        cachedSteps = buildSteps();
      }
      if (stepIndex >= cachedSteps.length) {
        running = false;
        return;
      }
      cachedSteps[stepIndex++]();
      setTimeout(loop, delay);
    }

    loop();
  }

  runBtn.addEventListener('click', runSimulation);
  stepBtn.addEventListener('click', stepOnce);
  resetBtn.addEventListener('click', resetSimulation);
})();
