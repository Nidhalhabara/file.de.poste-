document.getElementById('nextClientBtn').addEventListener('click', function() {
    var currentClientNumber = parseInt(document.getElementById('currentClient').innerText) || 0;
    document.getElementById('currentClient').innerText = currentClientNumber + 1;
});


document.getElementById('cancel-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var ticketNumber = document.getElementById('ticket-number').value;
    var reason = document.getElementById('reason').value;

    // Simuler une action d'annulation (dans cet exemple, simplement afficher un message)
    var message = "Ticket #" + ticketNumber + " annulé pour la raison suivante : " + reason;
    document.getElementById('message').innerText = message;
});



document.getElementById('service').addEventListener('change', function() {
    var service = this.value;

    if (service === "envoi" || service === "retrait") {
        document.getElementById('weight-group').style.display = "block";
        document.getElementById('destination-group').style.display = "block";
    } else {
        document.getElementById('weight-group').style.display = "none";
        document.getElementById('destination-group').style.display = "none";
    }
});

document.getElementById('service-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var service = document.getElementById('service').value;
    var clientTicket = document.getElementById('client-ticket').value;
    var clientName = document.getElementById('client-name').value;
    var packageWeight = document.getElementById('package-weight').value;
    var destination = document.getElementById('destination').value;

    var message = "";

    if (service === "retrait") {
        message = "Colis retiré par le client " + clientName + " avec le numéro de ticket " + clientTicket;
    } else if (service === "envoi") {
        message = "Colis envoyé pour le client " + clientName + " avec le numéro de ticket " + clientTicket + " pesant " + packageWeight + " kg, destination : " + destination;
    } else if (service === "achat") {
        message = "Timbres achetés par le client " + clientName + " avec le numéro de ticket " + clientTicket;
    }

    document.getElementById('message').innerText = message;
});




// Simuler la file d'attente avec des tickets
let ticketNumber = 1;
let waitingQueue = [];

// Générer un nouveau ticket
function generateTicket() {
    return ticketNumber++;
}

// Ajouter un nouveau ticket à la file d'attente
function addToQueue() {
    let newTicket = generateTicket();
    waitingQueue.push(newTicket);
}

// Obtenir le ticket en cours
function getCurrentTicket() {
    return waitingQueue.length > 0 ? waitingQueue[0] : null;
}

// Obtenir le ticket suivant
function getNextTicket() {
    return waitingQueue.length > 1 ? waitingQueue[1] : null;
}

// Obtenir le nombre de personnes en attente
function getWaitingCount() {
    return waitingQueue.length;
}



// Exemple d'utilisation: Ajouter des tickets à la file d'attente
addToQueue();
addToQueue();
addToQueue();

// Mettre à jour les informations affichées
updateQueueInfo();





// Fonction pour gérer la soumission du formulaire
function annulerTicket(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupérer le numéro de ticket et la raison d'annulation depuis le formulaire
    var ticketNumber = document.getElementById("ticket-number").value;
    var reason = document.getElementById("reason").value;

    // Ici, vous pouvez effectuer une logique pour annuler effectivement le ticket, par exemple, en l'envoyant à un serveur via une requête AJAX

    // Afficher un message indiquant que le ticket a été annulé
    var messageDiv = document.getElementById("message");
    messageDiv.textContent = "Le ticket numéro " + ticketNumber + " a été annulé pour la raison suivante : " + reason;
}

// Ajouter un écouteur d'événement pour écouter la soumission du formulaire
var form = document.getElementById("cancel-form");
form.addEventListener("submit", annulerTicket);





// Fonction pour gérer la soumission du formulaire de retrait de colis
function confirmerRetrait(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupérer les valeurs des champs de formulaire
    var ticket = document.getElementById("client-ticket-retrait").value;
    var nomClient = document.getElementById("client-name-retrait").value;

    // Afficher un message de confirmation
    var messageDiv = document.getElementById("message-retrait");
    messageDiv.textContent = "Le colis du client " + nomClient + " avec le numéro de ticket " + ticket + " a été retiré avec succès.";
}

// Ajouter un écouteur d'événement pour le bouton "Confirmer"
var boutonConfirmer = document.querySelector("#service-form-retrait button[type='submit']");
boutonConfirmer.addEventListener("click", confirmerRetrait);







// Fonction pour gérer la soumission du formulaire d'envoi de colis
function confirmerEnvoi(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupérer les valeurs des champs de formulaire
    var ticket = document.getElementById("client-ticket-envoi").value;
    var nomClient = document.getElementById("client-name-envoi").value;
    var poidsColis = document.getElementById("package-weight-envoi").value;
    var destination = document.getElementById("destination-envoi").value;

    // Afficher un message de confirmation
    var messageDiv = document.getElementById("message-envoi");
    messageDiv.textContent = "Le colis du client " + nomClient + " avec le numéro de ticket " + ticket + " a été envoyé avec succès à " + destination + " avec un poids de " + poidsColis + " kg.";
}

// Ajouter un écouteur d'événement pour le bouton "Confirmer"
var boutonConfirmerEnvoi = document.querySelector("#service-form-envoi button[type='submit']");
boutonConfirmerEnvoi.addEventListener("click", confirmerEnvoi);







// Fonction pour gérer la soumission du formulaire d'achat de timbres
function confirmerAchat(event) {
    event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

    // Récupérer les valeurs des champs de formulaire
    var ticket = document.getElementById("client-ticket-achat").value;
    var nomClient = document.getElementById("client-name-achat").value;

    // Afficher un message de confirmation
    var messageDiv = document.getElementById("message-achat");
    messageDiv.textContent = "L'achat de timbres pour le client " + nomClient + " avec le numéro de ticket " + ticket + " a été confirmé.";
}

// Ajouter un écouteur d'événement pour le bouton "Confirmer"
var boutonConfirmerAchat = document.querySelector("#service-form-achat button[type='submit']");
boutonConfirmerAchat.addEventListener("click", confirmerAchat);

// launch.js

// Function to handle the form submission for adding a client
document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('insert_client.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('response').innerText = data;
        this.reset();
    })
    .catch(error => console.error('Error:', error));
});

// Function to handle the form submission for cancelling a ticket
document.getElementById('cancel-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('cancel_ticket.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data;
        this.reset();
    })
    .catch(error => console.error('Error:', error));
});

// Function to handle the service selection change
document.getElementById('service').addEventListener('change', function() {
    var service = this.value;

    if (service === "envoi" || service === "retrait") {
        document.getElementById('weight-group').style.display = "block";
        document.getElementById('destination-group').style.display = "block";
    } else {
        document.getElementById('weight-group').style.display = "none";
        document.getElementById('destination-group').style.display = "none";
    }
});

// Function to handle the form submission for service requests
document.getElementById('service-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('process_service.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data;
        this.reset();
    })
    .catch(error => console.error('Error:', error));
});



// Generate a new ticket
function generateTicket() {
    return ticketNumber++;
}

// Add a new ticket to the queue
function addToQueue() {
    let newTicket = generateTicket();
    waitingQueue.push(newTicket);
}

// Get the current ticket
function getCurrentTicket() {
    return waitingQueue.length > 0 ? waitingQueue[0] : null;
}

// Get the next ticket
function getNextTicket() {
    return waitingQueue.length > 1 ? waitingQueue[1] : null;
}

// Get the number of people waiting
function getWaitingCount() {
    return waitingQueue.length;
}

// Update queue information display
function updateQueueInfo() {
    document.getElementById('currentTicket').innerText = getCurrentTicket() || 'No current ticket';
    document.getElementById('nextTicket').innerText = getNextTicket() || 'No next ticket';
    document.getElementById('waitingCount').innerText = getWaitingCount();
}

// Initialize queue with example tickets
addToQueue();
addToQueue();
addToQueue();
updateQueueInfo();

// Handle ticket cancel form submission
function cancelTicket(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('cancel_ticket.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerText = data;
        event.target.reset();
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('cancel-form').addEventListener('submit', cancelTicket);

// Function to confirm parcel retrieval
function confirmParcelRetrieval(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('confirm_retrieval.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message-retrait').innerText = data;
        event.target.reset();
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('service-form-retrait').addEventListener('submit', confirmParcelRetrieval);

// Function to confirm parcel sending
function confirmParcelSending(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('confirm_sending.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message-envoi').innerText = data;
        event.target.reset();
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('service-form-envoi').addEventListener('submit', confirmParcelSending);

// Function to confirm stamp purchase
function confirmStampPurchase(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    fetch('confirm_purchase.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message-achat').innerText = data;
        event.target.reset();
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('service-form-achat').addEventListener('submit', confirmStampPurchase);
