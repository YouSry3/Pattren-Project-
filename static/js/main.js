function sendMessage() {
  let message = document.getElementById("message").value;

  fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
  })
  .then(response => response.json())
  .then(data => {
      let resultElement = document.getElementById("result");

      if (data.prediction === "Ham") {  
          resultElement.innerText = `Prediction: ${data.prediction} ✅ This is a real message.`;
      } else if (data.prediction === "Spam") { 
          resultElement.innerText = `Prediction: ${data.prediction} 🚨 This is a fake message.`;
      } else {
          resultElement.innerText = "Prediction: Unknown";  
      }
  })
  .catch(error => console.error('Error:', error));
}
