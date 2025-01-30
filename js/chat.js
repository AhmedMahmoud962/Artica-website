const form = document.getElementById("chat-form");
const textarea = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatContainer = document.getElementById("chat-container");
const fileInput = document.getElementById("file-input");
const uploadTrigger = document.getElementById("upload-trigger");
const filePreviewContainer = document.getElementById("file-preview-container");
const noData = document.querySelector(".no-data");

let uploadedFiles = new Set();

function adjustTextareaHeight() {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
}

function updateButtonState() {
    sendButton.disabled = !textarea.value.trim() && uploadedFiles.size === 0;
}

// function addMessage(content, isHuman = true) {
//   if (noData) {
//     noData.style.display = "none";
//   }

//   const messageDiv = document.createElement("div");
//   messageDiv.className = `message ${
//     isHuman ? "human-message" : "assistant-message"
//   }`;

//   const avatar = document.createElement("div");
//   avatar.className = `avatar ${isHuman ? "human-avatar" : "assistant-avatar"}`;
//   avatar.textContent = isHuman ? "U" : "AI";

//   const messageContent = document.createElement("div");
//   messageContent.className = "message-content";
//   messageContent.textContent = content;

//   messageDiv.appendChild(avatar);
//   messageDiv.appendChild(messageContent);
//   chatContainer.appendChild(messageDiv);

//   chatContainer.scrollTop = chatContainer.scrollHeight;
// }

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
}

function createFilePreview(file) {
    const previewDiv = document.createElement("div");
    previewDiv.className = "file-preview";
    previewDiv.innerHTML = `
  <i class="fas fa-file"></i>
  <span>${file.name} (${formatFileSize(file.size)})</span>
  <button type="button" title="Remove file">
    <i class="fas fa-times"></i>
  </button>
  <div class="upload-progress">
    <div class="upload-progress-bar" style="width: 0%"></div>
  </div>
`;

    const removeButton = previewDiv.querySelector("button");
    removeButton.onclick = () => {
        uploadedFiles.delete(file);
        previewDiv.remove();
        updateButtonState();
    };

    // Simulate upload progress
    const progressBar = previewDiv.querySelector(".upload-progress-bar");
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            progressBar.parentElement.style.display = "none";
        }
        progressBar.style.width = `${progress}%`;
    }, 500);

    return previewDiv;
}

uploadTrigger.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    Array.from(fileInput.files).forEach((file) => {
        uploadedFiles.add(file);
        filePreviewContainer.appendChild(createFilePreview(file));
    });
    fileInput.value = "";
    updateButtonState();
});

textarea.addEventListener("input", () => {
    adjustTextareaHeight();
    updateButtonState();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = textarea.value.trim();
    const files = Array.from(uploadedFiles);

    if (message || files.length > 0) {
        let content = message;
        if (files.length > 0) {
            content +=
                "\nUploaded files: " + files.map((f) => f.name).join(", ");
        }

        addMessage(content, true);
        textarea.value = "";
        textarea.style.height = "auto";
        uploadedFiles.clear();
        filePreviewContainer.innerHTML = "";
        updateButtonState();

        // Simulate Claude's response
        setTimeout(() => {
            addMessage(
                "I've received your message" +
                    (files.length ? " and files" : "") +
                    ". How can I help you further?",
                false
            );
        }, 1000);
    }
});

// Handle Ctrl/Cmd + Enter to submit
textarea.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        form.dispatchEvent(new Event("submit"));
    }
});

// Handle drag and drop
document.addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
        Array.from(e.dataTransfer.files).forEach((file) => {
            uploadedFiles.add(file);
            filePreviewContainer.appendChild(createFilePreview(file));
        });
        updateButtonState();
    }
});

// // Add new function to handle message sending
// function sendMessage() {
//   const message = textarea.value.trim();
//   const files = Array.from(uploadedFiles);

//   if (message || files.length > 0) {
//     let content = message;
//     if (files.length > 0) {
//       content += "\nUploaded files: " + files.map((f) => f.name).join(", ");
//     }

//     addMessage(content, true);
//     textarea.value = "";
//     textarea.style.height = "auto";
//     uploadedFiles.clear();
//     filePreviewContainer.innerHTML = "";
//     updateButtonState();

//     // Simulate Claude's response
//     setTimeout(() => {
//       addMessage(
//         "I've received your message" +
//           (files.length ? " and files" : "") +
//           ". How can I help you further?",
//         false
//       );
//     }, 1000);
//   }
// }

// Update the textarea keydown event listener
textarea.addEventListener("keydown", (e) => {
    // Handle Enter key
    if (e.key === "Enter") {
        // If Shift key is not pressed, send the message
        if (!e.shiftKey) {
            e.preventDefault();
        }
    }
    // Keep the existing Ctrl/Cmd + Enter handler
    else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
    }
});

// Update form submit handler to use the new sendMessage function
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
