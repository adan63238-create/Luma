const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatArea = document.getElementById("chatArea");
const welcomeScreen = document.getElementById("welcomeScreen");

const newChatBtn = document.getElementById("newChatBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

const suggestions = document.querySelectorAll(".suggestion");

function createMessage(text, type) {
    const message = document.createElement("div");

    message.className = `message ${type}`;
    message.textContent = text;

    return message;
}

function addMessage(text, type) {
    const message = createMessage(text, type);

    chatArea.appendChild(message);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function sendMessage(text) {
    const cleanText = text.trim();

    if (!cleanText) return;

    welcomeScreen.style.display = "none";

    addMessage(cleanText, "user");

    messageInput.value = "";
    messageInput.style.height = "auto";

    setTimeout(() => {
        addMessage(
            "I'm currently running in demo mode. The AI backend will be connected later.",
            "assistant"
        );
    }, 500);
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    sendMessage(messageInput.value);
});

messageInput.addEventListener("input", () => {
    messageInput.style.height = "auto";
    messageInput.style.height =
        Math.min(messageInput.scrollHeight, 150) + "px";
});

messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

suggestions.forEach((button) => {
    button.addEventListener("click", () => {
        sendMessage(button.textContent);
    });
});

newChatBtn.addEventListener("click", () => {
    chatArea.innerHTML = "";
    chatArea.appendChild(welcomeScreen);

    welcomeScreen.style.display = "block";

    messageInput.value = "";
    messageInput.style.height = "auto";

    sidebar.classList.remove("open");
});

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (
        window.innerWidth <= 700 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        sidebar.classList.remove("open");
    }
});
