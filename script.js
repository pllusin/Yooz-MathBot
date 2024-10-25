let youzParser = new YoozParser();
let inputCode = `
( + حاصل جمع *1 و *2 چیست؟ - *1 + *2 نتیجه می‌دهد: _ جمع اعداد برابر است با *1 + *2 )
( + حاصل تفریق *1 از *2 چقدر است؟ - *2 - *1 نتیجه می‌دهد: _ تفریق برابر است با *2 - *1 )
( + حاصل ضرب *1 و *2 چقدر می‌شود؟ - *1 * *2 نتیجه می‌دهد: _ ضرب اعداد برابر است با *1 * *2 )
( + حاصل تقسیم *1 بر *2 چیست؟ - *2 !== 0 ? (*1 / *2).toFixed(2) : 'تقسیم بر صفر ممکن نیست!' )
`;

youzParser.parse(inputCode);

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className} d-flex align-items-center p-2`;
    messageElement.innerText = message;

    document.getElementById('chat-box').appendChild(messageElement);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

document.getElementById("btn").addEventListener("click", (event) => {
    event.preventDefault();
    const userMessage = document.getElementById("txt-input").value.trim();
    if (userMessage === '') return;

    addMessage(userMessage, 'user-message');
    document.getElementById("txt-input").value = '';

    const response = youzParser.getResponse(userMessage);
    addMessage(response, 'bot-message');
});
