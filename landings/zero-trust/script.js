// CLOCK FUNCTION
function updateClock() {
    const now = new Date();
    const time = now.toISOString().split('T')[1].split('.')[0] + " UTC";
    document.getElementById('clock').innerText = time;
}
setInterval(updateClock, 1000);

// TERMINAL SIMULATOR
const terminal = document.getElementById('terminal-output');
const messages = [
    "> Accessing repository audit logs...",
    "> Running Snyk vulnerability check: 0 Critical found.",
    "> Analyzing netlify.toml for security headers...",
    "> CSP Policy: RESTRICTIVE (Self-only)",
    "> Deployment status: SUCCESSFUL",
    "> Monitoring traffic via Traefik logs...",
    "> Baseline comparison: [OK]",
    "> Intrusion Detection System: ACTIVE",
];

let i = 0;
function typeTerminal() {
    if (i < messages.length) {
        const line = document.createElement('p');
        line.innerHTML = `<span class="text-green-800">[${new Date().toLocaleTimeString()}]</span> ${messages[i]}`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
        i++;
        setTimeout(typeTerminal, Math.random() * 2000 + 500);
    } else {
        i = 0; // Loop or stop
        setTimeout(typeTerminal, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setTimeout(typeTerminal, 1000);
});
