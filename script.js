$(document).ready(function () {
    const orderItems = {};

    function updateOrderSummary() {
        let orderSummary = '';
        let totalPrice = 0;
        for (let item in orderItems) {
            const { quantity, price } = orderItems[item];
            const itemTotal = (quantity * price).toFixed(2);
            totalPrice += parseFloat(itemTotal);
            orderSummary += `
                <div class="order-item">
                    <span>${item} x ${quantity}</span>
                    <span>£${itemTotal}</span>
                    <button class="remove-btn" data-name="${item}">&times;</button>
                </div>
            `;
        }
        $('#order-items').html(orderSummary);
        $('#totalPrice').text(totalPrice.toFixed(2));
    }

    $('.choose-btn').on('click', function () {
        const itemName = $(this).closest('.menu-item').data('name');
        const itemPrice = $(this).closest('.menu-item').data('price');
        if (orderItems[itemName]) {
            orderItems[itemName].quantity += 1;
        } else {
            orderItems[itemName] = { quantity: 1, price: itemPrice };
        }
        updateOrderSummary();
    });

    $('#order-items').on('click', '.remove-btn', function () {
        const itemName = $(this).data('name');
        if (orderItems[itemName].quantity > 1) {
            orderItems[itemName].quantity -= 1;
        } else {
            delete orderItems[itemName];
        }
        updateOrderSummary();
    });

    $('#clearOrder').on('click', function () {
        Object.keys(orderItems).forEach(item => delete orderItems[item]);
        updateOrderSummary();
    });

    $('#openCustomerDetails').on('click', function () {
        $('#customerDetailsOverlay').removeClass('hidden');
    });

    $('#closeCustomerDetails').on('click', function () {
        $('#customerDetailsOverlay').addClass('hidden');
    });
});
