let revenues = [];
let expenses = [];

document.addEventListener('DOMContentLoaded', (event) => {
    loadData();
    checkDarkMode();
});

function addRevenue(name = '', value = '', category = 'Outros', date = '') {
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';
    inputRow.innerHTML = `
        <input type="text" value="${name}" placeholder="Nome da Receita" onblur="updateRevenues()">
        <input type="number" value="${value}" placeholder="R$" onblur="updateRevenues()" oninput="updateRevenues()">
        <select onchange="updateRevenues()">
            <option value="Salário" ${category === 'Salário' ? 'selected' : ''}>Salário</option>
            <option value="Freelance" ${category === 'Freelance' ? 'selected' : ''}>Freelance</option>
            <option value="Investimentos" ${category === 'Investimentos' ? 'selected' : ''}>Investimentos</option>
            <option value="Outros" ${category === 'Outros' ? 'selected' : ''}>Outros</option>
        </select>
        <input type="date" value="${date}" onblur="updateRevenues()">
        <button class="delete-button" onclick="removeRevenue(${revenues.length})"><i class="fas fa-trash"></i></button>`;
    document.getElementById('revenuesInputs').appendChild(inputRow);
    revenues.push({ name, value: parseFloat(value) || 0, category, date });
    updateRevenues();
}

function addExpense(name = '', value = '', category = 'Outros', date = '') {
    const inputRow = document.createElement('div');
    inputRow.className = 'input-row';
    inputRow.innerHTML = `
        <input type="text" value="${name}" placeholder="Nome da Despesa" onblur="updateExpenses()">
        <input type="number" value="${value}" placeholder="R$" onblur="updateExpenses()" oninput="updateExpenses()">
        <select onchange="updateExpenses()">
            <option value="Alimentação" ${category === 'Alimentação' ? 'selected' : ''}>Alimentação</option>
            <option value="Transporte" ${category === 'Transporte' ? 'selected' : ''}>Transporte</option>
            <option value="Moradia" ${category === 'Moradia' ? 'selected' : ''}>Moradia</option>
            <option value="Lazer" ${category === 'Lazer' ? 'selected' : ''}>Lazer</option>
            <option value="Saúde" ${category === 'Saúde' ? 'selected' : ''}>Saúde</option>
            <option value="Outros" ${category === 'Outros' ? 'selected' : ''}>Outros</option>
        </select>
        <input type="date" value="${date}" onblur="updateExpenses()">
        <button class="delete-button" onclick="removeExpense(${expenses.length})"><i class="fas fa-trash"></i></button>`;
    document.getElementById('expensesInputs').appendChild(inputRow);
    expenses.push({ name, value: parseFloat(value) || 0, category, date });
    updateExpenses();
}

function removeRevenue(index) {
    revenues.splice(index, 1);  // Remove a receita da lista
    renderRevenues();  // Re-renderiza as receitas na interface
    updateRevenues();  // Atualiza os totais e o resultado final
    saveData();  // Salva os dados atualizados no localStorage
    showNotification("Receita removida!");
}

function removeExpense(index) {
    expenses.splice(index, 1);  // Remove a despesa da lista
    renderExpenses();  // Re-renderiza as despesas na interface
    updateExpenses();  // Atualiza os totais e o resultado final
    saveData();  // Salva os dados atualizados no localStorage
    showNotification("Despesa removida!");
}

function renderRevenues() {
    const revenuesContainer = document.getElementById('revenuesInputs');
    revenuesContainer.innerHTML = '';  // Limpa a interface atual

    revenues.forEach((revenue, index) => {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        inputRow.innerHTML = `
            <input type="text" value="${revenue.name}" placeholder="Nome da Receita" onblur="updateRevenues()">
            <input type="number" value="${revenue.value}" placeholder="R$" onblur="updateRevenues()" oninput="updateRevenues()">
            <select onchange="updateRevenues()">
                <option value="Salário" ${revenue.category === 'Salário' ? 'selected' : ''}>Salário</option>
                <option value="Freelance" ${revenue.category === 'Freelance' ? 'selected' : ''}>Freelance</option>
                <option value="Investimentos" ${revenue.category === 'Investimentos' ? 'selected' : ''}>Investimentos</option>
                <option value="Outros" ${revenue.category === 'Outros' ? 'selected' : ''}>Outros</option>
            </select>
            <input type="date" value="${revenue.date}" onblur="updateRevenues()">
            <button class="delete-button" onclick="removeRevenue(${index})"><i class="fas fa-trash"></i></button>`;
        revenuesContainer.appendChild(inputRow);
    });
}

function renderExpenses() {
    const expensesContainer = document.getElementById('expensesInputs');
    expensesContainer.innerHTML = '';  // Limpa a interface atual

    expenses.forEach((expense, index) => {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        inputRow.innerHTML = `
            <input type="text" value="${expense.name}" placeholder="Nome da Despesa" onblur="updateExpenses()">
            <input type="number" value="${expense.value}" placeholder="R$" onblur="updateExpenses()" oninput="updateExpenses()">
            <select onchange="updateExpenses()">
                <option value="Alimentação" ${expense.category === 'Alimentação' ? 'selected' : ''}>Alimentação</option>
                <option value="Transporte" ${expense.category === 'Transporte' ? 'selected' : ''}>Transporte</option>
                <option value="Moradia" ${expense.category === 'Moradia' ? 'selected' : ''}>Moradia</option>
                <option value="Lazer" ${expense.category === 'Lazer' ? 'selected' : ''}>Lazer</option>
                <option value="Saúde" ${expense.category === 'Saúde' ? 'selected' : ''}>Saúde</option>
                <option value="Outros" ${expense.category === 'Outros' ? 'selected' : ''}>Outros</option>
            </select>
            <input type="date" value="${expense.date}" onblur="updateExpenses()">
            <button class="delete-button" onclick="removeExpense(${index})"><i class="fas fa-trash"></i></button>`;
        expensesContainer.appendChild(inputRow);
    });
}

function updateRevenues() {
    revenues = Array.from(document.querySelectorAll('#revenuesInputs .input-row')).map(row => {
        return {
            name: row.querySelector('input[type="text"]').value,
            value: parseFloat(row.querySelector('input[type="number"]').value) || 0,
            category: row.querySelector('select').value,
            date: row.querySelector('input[type="date"]').value
        };
    });
    const totalRevenues = revenues.reduce((acc, curr) => acc + curr.value, 0);
    document.getElementById('totalRevenues').innerText = `Total Receitas: R$${totalRevenues.toFixed(2)}`;
    updateFinalResult();
    saveData();
}

function updateExpenses() {
    expenses = Array.from(document.querySelectorAll('#expensesInputs .input-row')).map(row => {
        return {
            name: row.querySelector('input[type="text"]').value,
            value: parseFloat(row.querySelector('input[type="number"]').value) || 0,
            category: row.querySelector('select').value,
            date: row.querySelector('input[type="date"]').value
        };
    });
    
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.value, 0);
    document.getElementById('totalDespesas').innerText = `Total Despesas: R$${totalExpenses.toFixed(2)}`;
    
    updateFinalResult();  // Atualiza o resultado final com base nas receitas e despesas
    saveData();  // Salva os dados atualizados no localStorage
}

function updateFinalResult() {
    const totalRevenues = revenues.reduce((acc, curr) => acc + curr.value, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.value, 0);
    const finalResult = totalRevenues - totalExpenses;
    const finalResultElement = document.getElementById('finalResult');
    finalResultElement.innerText = `Resultado: R$${finalResult.toFixed(2)}`;

    // Mudar a cor do texto de acordo com o resultado (verde para positivo, vermelho para negativo, branco para neutro)
    if (finalResult > 0) {
        finalResultElement.style.color = 'green';
    } else if (finalResult < 0) {
        finalResultElement.style.color = 'red';
    } else {
        finalResultElement.style.color = 'white';
    }
}

function saveData() {
    localStorage.setItem('revenues', JSON.stringify(revenues));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadData() {
    const savedRevenues = JSON.parse(localStorage.getItem('revenues')) || [];
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];

    revenues = savedRevenues;  // Carrega as receitas para a lista
    expenses = savedExpenses;  // Carrega as despesas para a lista
    renderRevenues();  // Renderiza as receitas carregadas
    renderExpenses();  // Renderiza as despesas carregadas
}
