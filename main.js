document.addEventListener('DOMContentLoaded', function () {
    let messageTypeSelect = document.getElementById('messageType');
    const subjectField = document.getElementById('subjectField');
    const form = document.getElementById('myForm');

    messageTypeSelect.addEventListener('change', function (e) {
        if (e.target.value === 'sms') {
            subjectField.style.display = 'none';
        } else if (e.target.value === 'email') {
            subjectField.style.display = 'block';
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const messageType = messageTypeSelect.value;
        handleFile().then(textFieldValue => {
            console.log(textFieldValue);
            const message = document.getElementById('message').value;

            if (messageType === 'email') {
                const subject = document.getElementById('subject').value;
                sendMail(emailList, subject, message);
            } else if (messageType === 'sms') {
                const numList = extractNum(textFieldValue);
                sendBulkSMS(numList, message);
            }
        });
    });
});

function handleFile() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById('recipientFile');
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                console.log('File Content:', fileContent);
                resolve(fileContent);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            // Read the file as text
            reader.readAsText(file);
        } else {
            resolve(''); // Empty string if no file is selected
        }
    });
}


function extractNum(text) {
    const phoneRegex = /(?:\+91|91|0)?[6789]\d{9}/g;
    const phoneNumbers = text.match(phoneRegex);
    return phoneNumbers || [];
}

function extractEmails(text) {
    var emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    var emails = text.match(emailPattern);
    return emails || [];
}

function sendMail(emailList, subject, message) {
    fetch('https://bulk-server-n5dy.vercel.app/sendemail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailList, subject, message }),
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert('Email sent successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending email');
        });
}

function sendBulkSMS(numList, message) {
    fetch('https://bulk-server-n5dy.vercel.app/sendbulksms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numList, message }),
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert('SMS sent successfully');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending SMS');
        });
}
