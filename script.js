const pizza = document.getElementById('pizza');
const sauceLayer = document.getElementById('sauce-layer');
const cheeseLayer = document.getElementById('cheese-layer');
const ingredientList = document.getElementById('ingredients');
const doughList = document.getElementById('doughs');
const priceDisplay = document.getElementById('total-price');
const orderButton = document.getElementById('order-btn');

const progressBarContainer = document.createElement('div');
progressBarContainer.classList.add('progress-container');

const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');

progressBarContainer.appendChild(progressBar);
orderButton.after(progressBarContainer);

const ingredients = [
    { emoji: "🧀", fact: "Cheese makes everything better!", price: 1.50, type: "cheese" },
    { emoji: "🍅", fact: "Tomatoes were once thought to be poisonous!", price: 0.75, type: "sauce" },
    { emoji: "🥓", fact: "Bacon makes pizzas extra crispy!", price: 2.00, type: "normal" },
    { emoji: "🍍", fact: "Pineapple on pizza? A controversial choice!", price: 1.50, type: "normal" },
    { emoji: "🫒", fact: "Olives are one of the oldest cultivated fruits!", price: 1.00, type: "normal" },
    { emoji: "🍯", fact: "Secret topping: Unlocks a mystery!", price: 3.00, type: "normal", special: true }
];

let totalPrice = 0;

ingredients.forEach(item => {
    let div = document.createElement('div');
    div.innerText = item.emoji;
    div.classList.add('ingredient');
    div.setAttribute('draggable', true);
    div.setAttribute('data-fact', item.fact);
    div.dataset.price = item.price;
    div.dataset.type = item.type;

    div.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', JSON.stringify(item));
    });

    ingredientList.appendChild(div);
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = JSON.parse(event.dataTransfer.getData('text'));

    if (data.type === "sauce") {
        sauceLayer.style.background = "red";
    } else if (data.type === "cheese") {
        cheeseLayer.style.background = "yellow";
    } else {
        let ingredient = document.createElement('div');
        ingredient.innerText = data.emoji;
        ingredient.classList.add('placed-ingredient');

        // Position the ingredient exactly where the user drops it
        const offsetX = event.clientX - pizza.getBoundingClientRect().left;
        const offsetY = event.clientY - pizza.getBoundingClientRect().top;

        ingredient.style.left = `${offsetX}px`;
        ingredient.style.top = `${offsetY}px`;

        pizza.appendChild(ingredient);
    }

    totalPrice += data.price;
    priceDisplay.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Timer and Progress Bar Functionality
document.getElementById('order-btn').addEventListener('click', () => {
    let timeLeft = 10; 
    let interval = 1000; 
    let width = 0;

    progressBar.style.width = "0%"; 
    progressBarContainer.style.display = "block";

    const timer = setInterval(() => {
        timeLeft--;
        width += 10;
        progressBar.style.width = `${width}%`; 

        if (timeLeft === 0) {
            clearInterval(timer);
            progressBarContainer.style.display = "none"; 
            alert("🚗 Your pizza has been delivered! Enjoy!");
        }
    }, interval);
});
