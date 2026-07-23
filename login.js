const ACCOUNTS = {
    "1": {
        usernameHash: "899e468e1413205f093af31d33be5862e59509e7994ec7051e53b69caaf5632c",
        passwordHash: "280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02"
    },
};

async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

async function login() {

    document.getElementById("error").style.display = "none";
    document.getElementById("loading").style.display = "block";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const usernameHash = await sha256(username.toLowerCase());
    const passwordHash = await sha256(password);

    const account = Object.values(ACCOUNTS).find(acc =>
        acc.usernameHash === usernameHash &&
        acc.passwordHash === passwordHash
    );

    if (account) {

        const expires = Date.now() + (24 * 60 * 60 * 1000);
        localStorage.setItem("enterprise_session", expires);

        location.href = "dashboard.html";
        return;
    }

    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
}

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        login();
    }
});