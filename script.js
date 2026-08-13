const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

const newChatBtn = document.getElementById("newChatBtn");
const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("modalBackdrop");
const closeSettings = document.getElementById("closeSettings");

const themeBtn = document.getElementById("themeBtn");
const appearanceControl = document.getElementById("appearanceControl");

const promptCards = document.querySelectorAll(".prompt-card");


/* =========================
   CHAT
========================= */

function createMessage(text, type) {
    const message = document.createElement("div");

    message.className = `message ${type}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = type === "user" ? "A" : "L";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = text;

    message.appendChild(avatar);
    message.appendChild(content);

    return message;
}


function addMessage(text, type) {
    const message = createMessage(text, type);

    messages.appendChild(message);

    requestAnimationFrame(() => {
        message.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    });
}


function sendMessage(text) {
    const cleanText = text.trim();

    if (!cleanText) return;

    welcome.style.display = "none";

    addMessage(cleanText, "user");

    messageInput.value = "";
    resizeInput();

    /*
     * Temporary local response.
     * The real AI backend will replace this later.
     */

    setTimeout(() => {
        addMessage(
            "I'm Luma. The interface is ready, but the AI engine hasn't been connected yet.",
            "assistant"
        );
    }, 650);
}


chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    sendMessage(messageInput.value);
});


/* =========================
   INPUT
========================= */

function resizeInput() {
    messageInput.style.height = "auto";

    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 150) + "px";
}


messageInput.addEventListener("input", resizeInput);


messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        chatForm.requestSubmit();
    }

});


/* =========================
   PROMPT CARDS
========================= */

promptCards.forEach((card) => {

    card.addEventListener("click", () => {

        const prompt = card.dataset.prompt;

        messageInput.value = prompt;

        resizeInput();

        messageInput.focus();

    });

});


/* =========================
   NEW CHAT
========================= */

newChatBtn.addEventListener("click", () => {

    messages.innerHTML = "";

    welcome.style.display = "";

    messageInput.value = "";

    resizeInput();

    closeSidebar();

    messageInput.focus();

});


/* =========================
   MOBILE SIDEBAR
========================= */

function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("open");

}


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("open");

}


mobileMenu.addEventListener("click", () => {

    if (sidebar.classList.contains("open")) {
        closeSidebar();
    } else {
        openSidebar();
    }

});


sidebarOverlay.addEventListener("click", closeSidebar);


/* =========================
   SETTINGS
========================= */

settingsBtn.addEventListener("click", () => {

    settingsModal.classList.add("open");

    closeSidebar();

});


closeSettings.addEventListener("click", () => {

    settingsModal.classList.remove("open");

});


settingsModal.addEventListener("click", (event) => {

    if (event.target === settingsModal) {

        settingsModal.classList.remove("open");

    }

});


/* =========================
   THEME
========================= */

let lightMode = false;


function updateTheme() {

    if (lightMode) {

        document.documentElement.style.setProperty(
            "--bg",
            "#f6f6f7"
        );

        document.documentElement.style.setProperty(
            "--surface",
            "#ffffff"
        );

        document.documentElement.style.setProperty(
            "--surface-2",
            "#f0f0f2"
        );

        document.documentElement.style.setProperty(
            "--surface-3",
            "#e6e6e9"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#151518"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#65656d"
        );

        document.documentElement.style.setProperty(
            "--dim",
            "#8a8a92"
        );

        appearanceControl.textContent = "Light";

    } else {

        document.documentElement.style.setProperty(
            "--bg",
            "#0c0c0f"
        );

        document.documentElement.style.setProperty(
            "--surface",
            "#111114"
        );

        document.documentElement.style.setProperty(
            "--surface-2",
            "#18181d"
        );

        document.documentElement.style.setProperty(
            "--surface-3",
            "#202027"
        );

        document.documentElement.style.setProperty(
            "--text",
            "#f4f4f5"
        );

        document.documentElement.style.setProperty(
            "--muted",
            "#8f8f99"
        );

        document.documentElement.style.setProperty(
            "--dim",
            "#62626b"
        );

        appearanceControl.textContent = "Dark";

    }

}


themeBtn.addEventListener("click", () => {

    lightMode = !lightMode;

    updateTheme();

});


appearanceControl.addEventListener("click", () => {

    lightMode = !lightMode;

    updateTheme();

});


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener("keydown", (event) => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        messageInput.focus();

    }

});


/* =========================
   INITIAL STATE
========================= */

updateTheme();
resizeInput();
