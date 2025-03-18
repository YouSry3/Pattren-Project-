function sendMessage() {
  let message = document.getElementById("message").value;

  fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
  })
  .then(response => response.json())
  .then(data => {
      let result = data.prediction;  
      
    
      if (result === "Ham") {  
          document.getElementById("result").innerText = `Prediction: " + ${result} + " ✅ this Real Message`;
      } else if (result === "Spam") { 
          document.getElementById("result").innerText = `Prediction: " + ${result} + " 🚨 this fuck Message`;
      } else {
          document.getElementById("result").innerText = "Prediction: Unknown";  
      }
  })
  .catch(error => console.error('Error:', error));
}