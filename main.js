var manu = document.getElementById('manu');
var itemList = document.getElementById('items');
var table = document.getElementById('table-list');
console.log(table);

var manuList = {
    price: '',
    dish: '',
    table: ''
}

manu.addEventListener('submit', addedOrder);
itemList.addEventListener('click', removeItem);


function addedOrder(e) {
    e.preventDefault();
    var li = document.createElement('li');
    manuList.price = document.getElementById('price').value;
    manuList.dish = document.getElementById('dish').value;
    manuList.table = document.getElementById('table').value;
    var orderDetail = '' + manuList.price + ' ' + manuList.dish + ' ' + manuList.table + ' ';
    axios.post('https://crudcrud.com/api/ef39aa77e45d41d48eae4e8ae9928ab6/orderManu', manuList)
        .then(response => {
            console.log(manuList);
        })
        .catch((err) => {
            console.log(err);
        })

    li.appendChild(document.createTextNode(orderDetail));
    //console.log(li);

    var deleteBtn = document.createElement('Button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = 'Delete Order';
    li.appendChild((deleteBtn));
    //console.log(li);

    if (manuList.table === 'table1') {
        var itemList1 = document.getElementById('item1');
        itemList1.appendChild(li);
    } else if (manuList.table === 'table2') {
        var itemList2 = document.getElementById('item2');
        itemList2.appendChild(li);
    } else {
        var itemList3 = document.getElementById('item3');
        itemList3.appendChild(li);
    }
    console.log(itemList);
}
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/ef39aa77e45d41d48eae4e8ae9928ab6/orderManu', manuList._id)
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                var li = document.createElement('li');
                var data = response.data[i].price + ' ' +
                    response.data[i].dish + ' ' + response.data[i].table + ' ';
                li.appendChild(document.createTextNode(data));
                var deleteBtn = document.createElement('Button');
                deleteBtn.className = 'delete';
                deleteBtn.innerHTML = 'Delete Order';
                deleteBtn.id = response.data[i]._id;
                li.appendChild((deleteBtn));
                if (response.data[i].table === 'table1') {
                    var itemList1 = document.getElementById('item1');
                    itemList1.appendChild(li);
                } else if (response.data[i].table === 'table2') {
                    var itemList2 = document.getElementById('item2');
                    itemList2.appendChild(li);
                } else {
                    var itemList3 = document.getElementById('item3');
                    itemList3.appendChild(li);
                }
                //console.log(itemList);
            }
        })
        .catch((err) => {
            console.log(err);
        })


})
function removeItem(e) {
    var itemList = document.getElementById('item1');
    if (e.target.classList.contains('Delete Order')) {
        if (confirm('Are you sure')) {
            var li = e.target.parentElement;
            //itemList.removeChild(li);
            itemList1.removeChild(li);
            //console.log(li);
            var chis = li.children[0];
            // console.log(chis.id);
            axios.delete('https://crudcrud.com/api/ef39aa77e45d41d48eae4e8ae9928ab6/orderManu/' + chis.id);

        }
    }
}