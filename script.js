

const amount = document.getElementById("amount")
const transaction = document.getElementById("transactionType")
const notRecurring = document.getElementById("radio-details-nr")
const monthly = document.getElementById("radio-details-month")
const yearly = document.getElementById("radio-details-year")
const weekly = document.getElementById("radio-details-week")
const budgetdescription = document.getElementById("budgetdescription")
const form = document.getElementById("budgetform")
const source = document.getElementById("source")
let interval
let intervals = [notRecurring, monthly, yearly, weekly] 
let incomes = []
let expenses = []
let budgets =[]
let income 
let expense
let budget
let completeBudget

let createTransaction = () => {
switch(transaction.value) {
    case "budget": 
budget = new Budget(amount.value, budgetdescription.value, interval)
budgets.push(budget)
completeBudget = new CompletedBudget(budget, incomes, expenses)
const budgetGrid = document.querySelector(".budgetGrid")
budgetGrid.innerHTML = ''
budgets.forEach((budget) => {
    const budgetDetails = budget.displayTransaction()
    const yearlyBudget = budget.calculateYearlyBudget()
    const monthlyBudget = budget.calculateMonthlyBudget()
    const weeklyBudget = budget.calculateWeeklyBudget()
    const dailyBudget = budget.calculateDailyBudget()
    const budgetSection = document.createElement("section")
    budgetSection.classList.add("budgetItem")
    budgetSection.innerHTML = `
    <section class="eTitle">
<p class="eItemTitle">${budgetDetails.description}</p>
</section>
<section class="eAmount">
<p class="eItemAmount">${budgetDetails.amount}</p>
</section>
<section class="eInterval">
<p class="eItemInterval">${budgetDetails.interval}</p>
</section>
<section class="eYearlyBudget">
<p class="eItemYearlyBudget"> you need to save yearly: ${yearlyBudget}</p>
</section>
<section class="eMonthlyBudget">
<p class="eItemMonthlyBudget"> you need to save Monthly: ${monthlyBudget}</p>
</section>
<section class="eWeeklyBudget">
<p class="eItemWeeklyBudget"> you need to save Weekly: ${weeklyBudget}</p>
</section>
<section class="eDailyBudget">
<p class="eItemDailyBudget"> you need to save Daily: ${dailyBudget}</p>
</section>
`;
// append the section to the empty section in the HTML
budgetGrid.appendChild(budgetSection);
console.log(completeBudget.displaySummary())
})
break;
case "income": 
income = new Income(amount.value, budgetdescription.value, interval, source.value)
incomes.push(income)
completeBudget = new CompletedBudget(budget, incomes, expenses)

const incomeGrid = document.querySelector(".incomeGrid")
incomeGrid.innerHTML = ''
incomes.forEach((income) => {
    const incomeDetails = income.displayTransaction()
    const incomeSection = document.createElement("section")
    incomeSection.classList.add("incomeItem")
    incomeSection.innerHTML = `
    <section class="eTitle">
<p class="eItemTitle">${incomeDetails.description}</p>
</section>
<section class="eAmount">
<p class="eItemAmount">${incomeDetails.amount}</p>
</section>
<section class="eSource">
<p class="eItemSource">${incomeDetails.source}</p>
</section>
<section class="eInterval">
<p class="eItemInterval">${incomeDetails.interval}</p>
</section>
`;
// append the section to the empty section in the HTML
incomeGrid.appendChild(incomeSection);
console.log(completeBudget.displaySummary())
})
break;
case "expense": 
expense = new Expense(amount.value, budgetdescription.value, interval, source.value)
expenses.push(expense)
completeBudget = new CompletedBudget(budget, incomes, expenses)

const expenseGrid = document.querySelector(".expensesGrid")
expenseGrid.innerHTML = ''
expenses.forEach((expense) => {
    const expenseDetails = expense.displayTransaction()
    const expenseSection = document.createElement("section")
    expenseSection.classList.add("expenseItem")
    expenseSection.innerHTML = `
    <section class="eTitle">
<p class="eItemTitle">${expenseDetails.description}</p>
</section>
<section class="eAmount">
<p class="eItemAmount">${expenseDetails.amount}</p>
</section>
<section class="eCategory">
<p class="eItemCategory">${expenseDetails.category}</p>
</section>
<section class="eInterval">
<p class="eItemInterval">${expenseDetails.interval}</p>
</section>
`;
// append the section to the empty section in the HTML
expenseGrid.appendChild(expenseSection);
console.log(completeBudget.displaySummary())
})

}
}


let getInterval = () => {
    for(let i = 0; i < intervals.length; i++) {
        if(intervals[i].checked == true){
            interval = intervals[i].value
        }
       
    }
}
let logData = () => {
    getInterval()
    createTransaction()
    
    
    
}




form.addEventListener("submit", (e) => {
e.preventDefault()
logData()
})

let viewBudget = () => {







}



class Transaction {
    constructor (amount, description, interval) {
        this.amount = Number(amount);
        this.description = description;
        this.interval = interval;

    }
    displayTransaction() {
        return {
            amount: this.amount,
            description: this.description,
            interval: this.interval
        }
    }
}

class Expense extends Transaction{
    constructor (amount, description, interval, category) {
        super(amount, description, interval)
       this.category = category
    }
    displayTransaction() {
        return {
            amount: this.amount,
            description: this.description,
            interval: this.interval,
            category: this.category
        }
    }
}

class Income extends Transaction{
    constructor (amount, description, interval, source) {
        super(amount, description, interval)
       this.source = source
    }
    displayTransaction() {
        return {
            amount: this.amount,
            description: this.description,
            interval: this.interval,
            source: this.source
        }
    }
}

class Budget  extends Transaction{
    constructor (amount, description, interval) {
        super (amount, description, interval)
        

    }
    displayBudget() {
        return {
            amount: this.amount,
            description: this.description,
            interval: this.interval
        }
    }

    calculateYearlyBudget(){
        if(this.interval === 'yearly') {
            return this.amount;
        } else if (this.interval === 'monthly') {
            return this.amount * 12;
        } else if(this.interval === 'weekly') {
            return this.amount * 52;
        } else if(this.interval === 'daily') {
            return this.amount * 365;
        }

    }

    calculateMonthlyBudget(){
        if(this.interval === 'yearly') {
            return this.amount / 12
        } else if (this.interval === 'monthly') {
            return this.amount;
        } else if(this.interval === 'weekly') {
            return this.amount * 4;
        } else if(this.interval === 'daily') {
            return this.amount * 30;
        }

    }

    calculateWeeklyBudget(){
        if(this.interval === 'yearly') {
            return this.amount / 52
        } else if (this.interval === 'monthly') {
            return this.amount / 4;
        } else if(this.interval === 'weekly') {
            return this.amount;
        } else if(this.interval === 'daily') {
            return this.amount * 7;
        }

    }

    calculateDailyBudget(){
        if(this.interval === 'yearly') {
            return this.amount / 365
        } else if (this.interval === 'monthly') {
            return this.amount / 30;
        } else if(this.interval === 'weekly') {
            return this.amount / 7;
        } else if(this.interval === 'daily') {
            return this.amount;
        }

    }


}

class CompletedBudget {
    constructor(budget, incomes, expenses) {
        if (!(budget instanceof Budget)) {
            throw new Error("The budget must be an instance of the Budget class.");
        }
 
        this.budget = budget; // Budget instance
        this.incomes = incomes.filter(income => income.interval === budget.interval); // Matching interval incomes
        this.expenses = expenses.filter(expense => expense.interval === budget.interval); // Matching interval expenses
    }
 
    // Calculate total incomes for the budget's interval
    calculateTotalIncome() {
        return this.incomes.reduce((total, income) => total + income.amount, 0);
    }
    // Calculate total expenses for the budget's interval
    calculateTotalExpenses() {
        return this.expenses.reduce((total, expense) => total + expense.amount, 0);
    }
 
    // Calculate the remaining budget
    calculateRemainingBudget() {
        const totalIncome = this.calculateTotalIncome();
        const totalExpenses = this.calculateTotalExpenses();
        return this.budget.amount + totalIncome - totalExpenses;
    }
 
    // Display budget summary
    displaySummary() {
        return {
            budgetAmount: this.budget.amount,
            interval: this.budget.interval,
            totalIncome: this.calculateTotalIncome(),
            totalExpenses: this.calculateTotalExpenses(),
            remainingBudget: this.calculateRemainingBudget()
        };
    }
}