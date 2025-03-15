document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    const timeLeft = document.getElementById('timeLeft');
    const orderButtons = document.querySelectorAll('.cta-button');
    let orderInProgress = false;

    // Order status messages
    const statusMessages = [
        { progress: 0, message: "Order Received" },
        { progress: 20, message: "Preparing Dough" },
        { progress: 40, message: "Adding Toppings" },
        { progress: 60, message: "Baking in Oven" },
        { progress: 80, message: "Quality Check" },
        { progress: 100, message: "Out for Delivery" }
    ];

    orderButtons.forEach(button => {
        button.addEventListener('click', handleOrder);
    });

    function handleOrder(event) {
        if (orderInProgress) {
            showNotification("Please complete current order first", "warning");
            return;
        }

        orderInProgress = true;
        const pizzaCard = event.target.closest('.pizza-card');
        const pizzaName = pizzaCard.querySelector('.pizza-name').textContent;
        
        showNotification(`${pizzaName} added to order!`, "success");
        startOrderProgress();
    }

    function startOrderProgress() {
        let progress = 0;
        const totalTime = 120000; // 2 minutes in milliseconds
        const startTime = Date.now();

        const updateInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            progress = (elapsed / totalTime) * 100;
            
            if (progress >= 100) {
                clearInterval(updateInterval);
                orderInProgress = false;
                completeOrder();
            }

            updateProgress(progress);
        }, 1000);
    }

    function updateProgress(percentage) {
        progressBar.style.width = `${percentage}%`;
        const currentStatus = statusMessages.reverse().find(s => percentage >= s.progress);
        statusText.textContent = currentStatus.message;
        timeLeft.textContent = formatTimeRemaining(percentage);
    }

    function formatTimeRemaining(percentage) {
        const totalSeconds = 120 - Math.floor((percentage/100) * 120);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `Estimated arrival: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function completeOrder() {
        progressBar.style.width = '100%';
        statusText.textContent = "Order Delivered!";
        timeLeft.textContent = "Enjoy your meal!";
        showNotification("Order successfully delivered!", "success");
        triggerCelebration();
        setTimeout(resetOrderSystem, 5000);
    }

    function resetOrderSystem() {
        progressBar.style.width = '0%';
        statusText.textContent = "Ready for New Orders";
        timeLeft.textContent = "";
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function triggerCelebration() {
        // Add celebration animation logic
        console.log("Order celebration!");
    }
});