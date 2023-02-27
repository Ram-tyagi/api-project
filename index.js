let btn = document.getElementById('button')

btn.addEventListener('click',btnClicked)

async function btnClicked(e){
    e.preventDefault()
	try{
    let amountText = document.getElementById("expenseAmount").value;
	let descriptionText = document.getElementById("Description").value;
	

    const obj = {
		amountText : amountText,
		descriptionText : descriptionText,
       
	};

    //uploading the details to the server and showing on the UI
    //async function postRequest (){
       
            const resp = await axios.post("https://crudcrud.com/api/c1cdce3faf4343269224503736100d20/addtocart",obj)
            showExpenseList(resp.data)
        }
        catch(err){
			console.log(err);
		};
    }
   // postRequest()		
//}

// fetching details from the server to show on the screen when window opened or refreshed
window.addEventListener("DOMContentLoaded", async function(){
    try{
        const onDomLoad = await axios.get("https://crudcrud.com/api/c1cdce3faf4343269224503736100d20/addtocart")
        for (let i = 0; i < onDomLoad.data.length; i++) {
            showExpenseList(onDomLoad.data[i]);
    }
    }catch(err){
        console.log(err);
    };	
});

function showExpenseList(user) {

	// creating li to display on the UI
	const li = document.createElement("li");
	li.id = `${user._id}`;
	li.appendChild(document.createTextNode(`${user.amountText}- ${user.descriptionText}`));
	itemList.appendChild(li);

	// creating edit button
	let editbtn = document.createElement("button");
	editbtn.id = "edit";
	editbtn.appendChild(document.createTextNode("edit"));
	editbtn.onclick = function () {
		//console.log("edit clicked");
		editUser(user.amountText,user.descriptionText);
	};
	li.appendChild(editbtn);
    itemList.appendChild(li);

    // creating delete button
	let delBtn = document.createElement("button");
	delBtn.id = "delete";
	delBtn.appendChild(document.createTextNode("delete"));
	delBtn.onclick = function () {
		deleteUser(user._id);
	};
	li.appendChild(delBtn);
	itemList.appendChild(li);

}


function editUser(amountText,descriptionText) {
	document.getElementById("expenseAmount").value = amountText;
	document.getElementById("Description").value = descriptionText;
	   
 }




// deleting the details on the server and also on the UI(remove user function)
async function deleteUser(userID) {
    try{
		const del = await axios.delete(`https://crudcrud.com/api/c1cdce3faf4343269224503736100d20/addtocart/${userID}`)
		console.log(del)
        removeUser(userID)
        }catch(err){
			console.log(err);
		};		
}


// removing details on the UI
function removeUser(userID) {
	let ul = document.getElementById("itemList");
	let li = document.getElementById(userID);
	ul.removeChild(li);
}







