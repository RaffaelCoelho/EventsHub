document.addEventListener("DOMContentLoaded", () => {
    const registerScreen = document.getElementById("registerScreen");
    const loginScreen = document.getElementById("loginScreen");
    const productsScreen = document.getElementById("productsScreen");
    const cartScreen = document.getElementById("cartScreen");

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const itemsContainer = document.getElementById("itemsContainer");
    const cartItems = document.getElementById("cartItems");
    const orderForm = document.getElementById("orderForm");

    const goToLoginButton = document.getElementById("goToLogin");
    const goToRegisterButton = document.getElementById("goToRegister");
    const goToCartButton = document.getElementById("goToCart");
    const backToProductsButton = document.getElementById("backToProducts");

    let cart = [];

    const switchScreen = (screenToShow) => {
        document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));
        screenToShow.classList.add("active");
    };

    // Cadastro
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        localStorage.setItem("user", JSON.stringify({ email, password }));
        alert("Cadastro realizado!");
        switchScreen(loginScreen);
    });

    // Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            alert("Login realizado!");
            switchScreen(productsScreen);
        } else {
            alert("Credenciais inválidas!");
        }
    });

    // Produtos
    const products = [
        { name: "Buffet", price: 500, image: "https://via.placeholder.com/150" },
        { name: "Sobremesas", price: 200, image: "https://via.placeholder.com/150" },
        { name: "Serviços", price: 300, image: "https://via.placeholder.com/150" },
        { name: "Espaços", price: 1000, image: "https://via.placeholder.com/150" }
    ];

    products.forEach((product, index) => {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$${product.price.toFixed(2)}</p>
            <button class="addToCart" data-index="${index}">Adicionar</button>
        `;
        itemsContainer.appendChild(item);
    });

    itemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("addToCart")) {
            const index = e.target.dataset.index;
            const product = products[index];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} adicionado ao carrinho!`);
        }
    });

    // Carrinho
    goToCartButton.addEventListener("click", () => {
        cartItems.innerHTML = "";
        cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("item");
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>R$${item.price.toFixed(2)}</p>
                <button class="removeFromCart" data-index="${index}">Remover</button>
            `;
            cartItems.appendChild(cartItem);
        });

        switchScreen(cartScreen);
    });

    cartItems.addEventListener("click", (e) => {
        if (e.target.classList.contains("removeFromCart")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            goToCartButton.click();
        }
    });

    // Finalizar pedido
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const address = document.getElementById("address").value;
        const paymentMethod = document.getElementById("paymentMethod").value;

        if (address && paymentMethod) {
            alert("Pedido finalizado!");
            localStorage.removeItem("cart");
            cart = [];
            switchScreen(productsScreen);
        } else {
            alert("Preencha todos os campos!");
        }
    });

    // Navegação entre telas
    goToLoginButton.addEventListener("click", () => switchScreen(loginScreen));
    goToRegisterButton.addEventListener("click", () => switchScreen(registerScreen));
    backToProductsButton.addEventListener("click", () => switchScreen(productsScreen));
});
