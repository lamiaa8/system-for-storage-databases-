var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCAte = document.getElementById("productCAte");
var productdes = document.getElementById("productdes");
var productCount = document.getElementById("Count");  
var productcontainer =[];


//  disply in table from datastorage 

if (localStorage.getItem("ourProducts") == null) {
    productcontainer = []

}
else {
    productcontainer = JSON.parse(localStorage.getItem("ourProducts"));
    displayproduct();

}

//  button disabled    
//  لازم عشان يقدر يسجل يدخل اسم المنتج وكمان السعر 

if(productName.value != "" ){
    document.getElementById("buAdd").disabled = false
}else{
    document.getElementById("buAdd").disabled="disabled"

}

function chicke(){
    var inputValue1 =productName.value ;
    var inputValue2 =productPrice.value ;
    if(inputValue1 != "" && inputValue2 != ""){
        document.getElementById("buAdd").disabled = false
    }
    else{
        document.getElementById("buAdd").disabled="disabled"
    
    }
}

//     action on button 
function addproduct(){
    var product = {
        name: productName.value ,
        price: productPrice.value ,
        cateory: productCAte.value ,
        discription: productdes.value ,
        count: productCount.value
    }
    productcontainer.push(product)
    localStorage.setItem("ourProducts", JSON.stringify(productcontainer))
    displayproduct()
    clearinp()

}

//  display when click
function displayproduct(){
    var cartoona = "";
    for(var i = 0 ; i< productcontainer.length ; i++)
    {
        cartoona+=`
        <tr>
            <td>${i+1}</td>
            <td>${productcontainer[i].name}</td>
            <td>${productcontainer[i].count}</td>
            <td>${productcontainer[i].price}</td>
            <td>${productcontainer[i].cateory}</td>
            <td>${productcontainer[i].discription}</td>
            <td><button type="button" onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></td>
            <td><button type="button"onclick="editeRow(${i})"  class="btn btn-warning">Edite</button></td>

        </tr>`
    }
    document.getElementById("tbody").innerHTML = cartoona ;
    
}


// clear
function clearinp() {
    productName.value = ""
    productCount .value=""
    productPrice.value = ""
    productCAte.value = ""
    productdes.value = ""
    document.getElementById("buAdd").disabled="disabled"

}



// deleteAll
function deleteAll() {
    productcontainer.splice(0)
    localStorage.setItem("ourProducts", JSON.stringify(productcontainer))
    displayproduct()
}





// deleteRow
function deleteRow(i) {

    var getCountValue = productcontainer[i].count
    if( getCountValue > 1){
        productcontainer[i].count -=1 ;
        localStorage.setItem("ourProducts", JSON.stringify(productcontainer))
        displayproduct()

    }
    else{
        productcontainer.splice(i, 1)
        localStorage.setItem("ourProducts", JSON.stringify(productcontainer))
        displayproduct()
    }

}

/// Search funtion 

function searchProduct(term) {
    var productList = ""
    for (var i = 0; i < productcontainer.length; i++) {
        if (productcontainer[i].name.includes(term.trim()) == true) {
            productList += `
            <tr>
                <td>${i + 1}</td>
                <td>${productcontainer[i].name}</td>
                <td>${productcontainer[i].count}</td>
                <td>${productcontainer[i].price}</td>
                <td>${productcontainer[i].cateory}</td>
                <td>${productcontainer[i].discription}</td>
                <td><button onclick="deleteRow(${i})" class="btn btn-danger">Delete</button> </td>
                <td><button type="button"onclick="editeRow(${i})"  class="btn btn-warning">Edite</button></td>
        
            </tr>
            `
        }
        document.getElementById("tbody").innerHTML = productList;

    }
}




//  edite function 
function editeRow(indexOfEdite){
    document.getElementById("productName").value = productcontainer[indexOfEdite].name;
    document.getElementById("productPrice").value = productcontainer[indexOfEdite].price;
    document.getElementById("productCAte").value = productcontainer[indexOfEdite].cateory;
    document.getElementById("productdes").value = productcontainer[indexOfEdite].discription;
    document.getElementById("Count").value = productcontainer[indexOfEdite].count;

    // document.getElementById("buAdd").disabled="disabled"

    var m = ` <button  onclick="displayAftarEdite(${indexOfEdite})" class="btn btn-warning mt-3 " >Edit</button>`;
    
    document.getElementById("buttonedit").innerHTML = m ;

}

function displayAftarEdite(d){

    var product2 = 
    {
        name: productName.value ,
        price: productPrice.value ,
        cateory: productCAte.value ,
        discription: productdes.value ,
        count: productCount.value
    }
    productcontainer[d]=product2
    localStorage.setItem("ourProducts", JSON.stringify(productcontainer))
    displayproduct()
    document.getElementById("buttonedit").innerHTML = null ;
}