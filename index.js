let revenues = [];
    let expenses = [];

    document.addEventListener('DOMContentLoaded', (event) => {
        loadData();
        checkDarkMode();
    });

    function addRevenue(name = '', value = '') {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        const index = revenues.length;
        inputRow.innerHTML = `<input type="text" value="${name}" placeholder="Nome da Receita">
                              <input type="number" value="${value}" oninput="updateRevenues()" placeholder="R$">
                              <button class="delete-button" onclick="removeRevenue(${index})"><i class="fas fa-trash"></i></button>`;
        document.getElementById('revenuesInputs').appendChild(inputRow);
        updateRevenues();
        showNotification("Receita adicionada!");
    }

    function addExpense(name = '', value = '') {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        const index = expenses.length;
        inputRow.innerHTML = `<input type="text" value="${name}" placeholder="Nome da Despesa">
                              <input type="number" value="${value}" oninput="updateExpenses()" placeholder="R$">
                              <button class="delete-button" onclick="removeExpense(${index})"><i class="fas fa-trash"></i></button>`;
        document.getElementById('expensesInputs').appendChild(inputRow);
        updateExpenses();
        showNotification("Despesa adicionada!");
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
            inputRow.innerHTML = `<input type="text" value="${revenue.name}" placeholder="Nome da Receita">
                                  <input type="number" value="${revenue.value}" oninput="updateRevenues()" placeholder="R$">
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
            inputRow.innerHTML = `<input type="text" value="${expense.name}" placeholder="Nome da Despesa">
                                  <input type="number" value="${expense.value}" oninput="updateExpenses()" placeholder="R$">
                                  <button class="delete-button" onclick="removeExpense(${index})"><i class="fas fa-trash"></i></button>`;
            expensesContainer.appendChild(inputRow);
        });
    }

    function updateRevenues() {
        revenues = Array.from(document.querySelectorAll('#revenuesInputs .input-row')).map(row => {
            return {
                name: row.querySelector('input[type="text"]').value,
                value: parseFloat(row.querySelector('input[type="number"]').value) || 0
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
                value: parseFloat(row.querySelector('input[type="number"]').value) || 0
            };
        });
        const totalExpenses = expenses.reduce((acc, curr) => acc + curr.value, 0);
        document.getElementById('totalExpenses').innerText = `Total Despesas: R$${totalExpenses.toFixed(2)}`;
        updateFinalResult();
        saveData();
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

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const darkModeEnabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkModeEnabled);

        // Atualizar o texto do botão com base no modo atual
        if (darkModeEnabled) {
            document.getElementById("toggle").textContent = "Modo Claro";
        } else {
            document.getElementById("toggle").textContent = "Modo Escuro";
        }
    }

    function checkDarkMode() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById("toggle").textContent = "Modo Claro";  // Atualizar o texto do botão
        }
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.innerText = message;
        notification.style.display = 'block';
        notification.style.opacity = '1';

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, 3000);
    }

    function addRevenue(name = '', value = '') {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        const index = revenues.length;
        inputRow.innerHTML = `
            <input type="text" value="${name}" placeholder="Nome da Receita" onblur="updateRevenues()">
            <input type="number" value="${value}" placeholder="R$" onblur="updateRevenues()" oninput="updateRevenues()">
            <button class="delete-button" onclick="removeRevenue(${index})"><i class="fas fa-trash"></i></button>`;
        document.getElementById('revenuesInputs').appendChild(inputRow);
        updateRevenues();
    }
    
    function addExpense(name = '', value = '') {
        const inputRow = document.createElement('div');
        inputRow.className = 'input-row';
        const index = expenses.length;
        inputRow.innerHTML = `
            <input type="text" value="${name}" placeholder="Nome da Despesa" onblur="updateExpenses()">
            <input type="number" value="${value}" placeholder="R$" onblur="updateExpenses()" oninput="updateExpenses()">
            <button class="delete-button" onclick="removeExpense(${index})"><i class="fas fa-trash"></i></button>`;
        document.getElementById('expensesInputs').appendChild(inputRow);
        updateExpenses();
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
                <button class="delete-button" onclick="removeExpense(${index})"><i class="fas fa-trash"></i></button>`;
            expensesContainer.appendChild(inputRow);
        });
    }
    