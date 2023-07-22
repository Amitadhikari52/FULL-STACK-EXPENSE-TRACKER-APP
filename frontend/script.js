// frontend/script.js
const myForm = document.querySelector('#my-form');
const expAmt = document.querySelector('#expAmount');
const expDesc = document.querySelector('#expDescription');
const expCat = document.querySelector('#expCategory');
const message = document.querySelector('.msg');
const expList = document.querySelector('.expList');
const buttonSubmit = document.querySelector('#Button');

async function getExpenses(e) {
  try {
    const res = await axios.get('http://localhost:3000/getExpenses');
    expList.innerHTML = ''; // Clear previous expense list
    res.data.forEach((expense) => {
      const { amount, description, category } = expense;
      const li = document.createElement('li');
      li.classList.add('list-group-item-warning');
      const text = document.createTextNode(`${amount}-${description}-${category}`);
      const deleteBtn = document.createElement('button');
      const editBtn = document.createElement('button');
      deleteBtn.classList.add('btn', 'btn-danger', 'btn-close');
      editBtn.classList.add('btn', 'btn-sm', 'btn-primary', 'edit');
      editBtn.innerHTML = 'Edit';
      li.appendChild(text);
      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
      expList.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
}

async function newExpense(e) {
  try {
    e.preventDefault();
    if (expAmt.value === '' || expDesc.value === '' || expCat.value === '') {
      message.classList.add('bg-danger');
      message.innerHTML = 'Please enter all fields';
      setTimeout(() => message.remove(), 1000);
    } else {
      let expItem = {
        expAmt: expAmt.value,
        expDesc: expDesc.value,
        expCat: expCat.value,
      };
      const res = await axios.post('http://localhost:3000/newExpense', expItem);
      console.log(res.data);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteExpense(e) {
  try {
    e.preventDefault();
    let id;
    if (e.target.classList && e.target.classList.contains('btn-close')) {
      let li = e.target.parentNode.firstChild.wholeText.split('-');
      const readExp = await axios.get('http://localhost:3000/getExpenses');
      readExp.data.forEach((expense) => {
        if (
          expense.amount === +li[0] &&
          expense.description === li[1] &&
          expense.category === li[2]
        ) {
          id = expense.id;
        }
      });
    }
    console.log('id inside index', id);
    const res = await axios.get('http://localhost:3000/deleteExpense', {
      params: {
        id: id,
      },
    });
    console.log(res);
    console.log('Deleted expense');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function editExpense(e, expItem, id) {
  try {
    e.preventDefault();
    const editRes = await axios.get('http://localhost:3000/editExpense', {
      params: {
        id: id,
        expenseItem: expItem,
      },
    });
    console.log('Edited item');
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

var id;

expList.addEventListener('click', async (e) => {
  if (e.target.classList && e.target.classList.contains('btn-close')) {
    deleteExpense(e);
  } else {
    e.preventDefault();
    let button = document.querySelector('#Button');
    button.innerHTML = 'Update';
    const [amount, description, category] =
      e.target.parentNode.firstChild.wholeText.split('-');
    document.querySelector('#expAmount').value = amount;
    document.querySelector('#expDescription').value = description;
    document.querySelector('#expCategory').value = category;
    let li = e.target.parentNode.firstChild.wholeText.split('-');
    const readExp = await axios.get('http://localhost:3000/getExpenses');
    readExp.data.forEach((expense) => {
      if (
        expense.amount === +li[0] &&
        expense.description === li[1] &&
        expense.category === li[2]
      ) {
        id = expense.id;
      }
    });
    console.log(id);
  }
});

document.addEventListener('DOMContentLoaded', getExpenses);

myForm.addEventListener('submit', newExpense);

myForm.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Submit') {
    newExpense(e);
  } else if (e.target.innerHTML === 'Update') {
    expItem = {
      amount: document.querySelector('#expAmount').value,
      description: document.querySelector('#expDescription').value,
      category: document.querySelector('#expCategory').value,
    };
    console.log(expItem, id);
    editExpense(e, expItem, id);
  }
});
