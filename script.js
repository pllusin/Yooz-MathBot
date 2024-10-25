let youzParser = new YouzParser();
let inputCode = ''; 

function loadFile(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'number.yooz', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            inputCode = xhr.responseText;
            callback(inputCode);
        }
    };
    xhr.send();
}

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className} d-flex align-items-center p-2`;
    messageElement.innerText = message;

    // اضافه کردن پیام به چت‌باکس و انیمیشن
    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

document.getElementById("btn").addEventListener("click", (event) => {
    event.preventDefault();
    const userMessage = document.getElementById("txt-input").value.trim();
    if (userMessage === '') return;

    addMessage(userMessage, 'user-message');
    document.getElementById("txt-input").value = '';

    loadFile((data) => {
        youzParser.parse(data);
        const response = youzParser.getResponse(userMessage);
        addMessage(response, 'bot-message');
    });
});
