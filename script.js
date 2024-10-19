let totalBudget = 0;
let expenses = 0;
let editingRow = null; 
let oldTotalPrice = 0; 

function updateSummary() {
    const remaining = totalBudget - expenses;
    document.getElementById('expenses').textContent = expenses.toFixed(2);
    document.getElementById('remaining').textContent = remaining.toFixed(2);
    document.getElementById('total-money').textContent = totalBudget.toFixed(2);
}

function addProduct() {
    const productName = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('price').value);
    const numProducts = parseInt(document.getElementById('num-products').value);

    if (isNaN(price) || isNaN(numProducts) || productName === '') {
        alert('Please enter valid product details.');
        return;
    }

    const totalPrice = price * numProducts;

    if (editingRow) {
        
        expenses -= oldTotalPrice;
        expenses += totalPrice;   

        editingRow.innerHTML = `
            <td>${productName} (${numProducts})</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </td>
        `;

      
        addRowListeners(editingRow, productName, price, numProducts, totalPrice);

       
        editingRow = null;
        oldTotalPrice = 0;
    } else {
       
        expenses += totalPrice;

        const productList = document.getElementById('product-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${productName} (${numProducts})</td>
            <td>${totalPrice.toFixed(2)}</td>
            <td>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </td>
        `;

        productList.appendChild(row);

        addRowListeners(row, productName, price, numProducts, totalPrice);
    }

    updateSummary();

    document.getElementById('product-name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('num-products').value = '';
}


function addRowListeners(row, productName, price, numProducts, totalPrice) {
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        expenses -= totalPrice;
        row.remove();
        updateSummary();
    });

    const editBtn = row.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {

        document.getElementById('product-name').value = productName;
        document.getElementById('price').value = price;
        document.getElementById('num-products').value = numProducts;

        editingRow = row;
        oldTotalPrice = totalPrice; 
    });
}


document.getElementById('add-product-btn').addEventListener('click', () => {
    if (!totalBudget) {
        totalBudget = parseFloat(prompt('Please enter your total budget:'));
        if (isNaN(totalBudget) || totalBudget <= 0) {
            alert('Please enter a valid budget.');
            totalBudget = 0;
            return;
        }
    }
    addProduct();
});
