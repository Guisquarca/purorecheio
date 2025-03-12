let cart = [];
let currentItem = null;

// Elementos do DOM
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const confirmModal = document.getElementById('confirmModal');
const addressModal = document.getElementById('addressModal');
const addressError = document.getElementById('addressError');

// Event Listeners
cartBtn.addEventListener('click', toggleCart);

// Funções
function addToCart(name, price) {
    currentItem = { name, price, quantity: 1 };
    confirmModal.style.display = 'block';
}

function confirmAdd() {
    const existingItem = cart.find(item => item.name === currentItem.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(currentItem);
    }
    
    updateCart();
    confirmModal.style.display = 'none';
}

function cancelAdd() {
    confirmModal.style.display = 'none';
}

function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <div>
                <span>R$ ${itemTotal.toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')">Remover</button>
                <button onclick="incrementQuantity('${item.name}')">+</button>
                <button onclick="decrementQuantity('${item.name}')">-</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function incrementQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decrementQuantity(name) {
    const item = cart.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    }
}

function showAddressForm() {
    addressModal.style.display = 'block';
}

function closeAddressForm() {
    addressModal.style.display = 'none';
    addressError.textContent = '';
}

function validateAddress(event) {
    event.preventDefault();
    
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const neighborhood = document.getElementById('neighborhood').value;
    
    if (!neighborhood) {
        addressError.textContent = 'Por favor, selecione um bairro.';
        return;
    }
    
    // Validar se o bairro está na lista permitida
    const allowedNeighborhoods = ['macarana', 'caicara', 'mirim'];
    if (!allowedNeighborhoods.includes(neighborhood)) {
        addressError.textContent = 'Desculpe, não entregamos neste bairro.';
        return;
    }
    
    // Se chegou aqui, o endereço é válido
    const address = `${street}, ${number} - ${neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1)}, Praia Grande`;
    
    // Montar a mensagem do pedido com o endereço
    const message = cart.map(item => 
        `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalMessage = `Olá! Gostaria de fazer um pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}\n\nEndereço de entrega:\n${address}`;
    
    const whatsappUrl = `https://wa.me/5511946162314?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Fechar os modais e limpar o carrinho
    closeAddressForm();
    toggleCart();
    cart = [];
    updateCart();
}

function finishOrder() {
    const message = cart.map(item => 
        `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalMessage = `Olá! Gostaria de fazer um pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`;
    
    const whatsappUrl = `https://wa.me/5511946162314?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank');
} 