
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchinput = document.getElementById("searchInput");


var productList = []


var indexGlobal = 0;



if(localStorage.getItem("productContainer") !== null) {
    productList  =  JSON.parse( localStorage.getItem("productContainer") );
    desplayData();

}


function addProduct() {
    var product = {
        name : productNameInput.value ,
        price: productPriceInput.value ,
        category: productCategoryInput.value ,
        description: productDescriptionInput.value ,
        image: productImageInput.files[0] ? `image/${productImageInput.files[0]?.name}` : "image/3.jpg"
    };

    productList.push(product);

    clearForm()

    localStorage.setItem( "productContainer"   , JSON.stringify(productList)   )

    desplayData()

}



function clearForm() {
    productNameInput.value = null ;
    productPriceInput.value = null ;
    productCategoryInput.value = null ;
    productDescriptionInput.value = null ;
    productImageInput.value = null ;
}



function desplayData() {

    

    var container = ""

    for( var i = 0    ; i <  productList.length        ;  i++   ) {

        container += `

        <div class="col">
    <div class="card h-100">
    <img height="250px" class="card-img-top" src=" ${productList[i].image}" alt=" ${productList[i].name} " />
    <div class="card-body">
        <span class="badge bg-info">ID: ${i + 1} </span>
        <h3 class="card-title h5 font-weight-bold">Product Name: ${productList[i].name} </h3>
        <div class="d-flex flex-column gap-2">
        <h4 class="card-text small"> Product Price: ${productList[i].price} </h4>
        <h4 class="card-text small"> Product Category:  ${productList[i].category} </h4>
        <p class="card-text small"> Product Description:  ${productList[i].description} </p>
        </div>
    </div>

    <div class="card-footer text-center d-flex gap-2 justify-content-center">
        <button onclick="deleteItem( ${i} )" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
        <button onclick="setUpdateInfo(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>
    </div>
</div>

        `

    };

    document.getElementById("rowData").innerHTML = container;
}



function deleteItem(index) {

    productList.splice(index  ,  1 );

    localStorage.setItem( "productContainer"   , JSON.stringify(productList)   )

    desplayData()

}




function searchData() {

    var data = searchinput.value;

    var container = ""

    for( var i = 0    ; i <  productList.length        ;  i++   ) {

        if(productList[i].name.includes( data ) ) {

            container += `

        <div class="col">
    <div class="card h-100">
    <img height="150px" class="card-img-top" src="  ${productList[i].image}  " alt=" ${productList[i].name} " />
    <div class="card-body">
        <span class="badge bg-info">ID: ${i + 1} </span>
        <h3 class="card-title h4 font-weight-bold">${productList[i].name} </h3>
        <div class="d-flex flex-column gap-2">
        <h4 class="card-text small">${productList[i].price} </h4>
        <h4 class="card-text small">  ${productList[i].category} </h4>
        <p class="card-text small">  ${productList[i].description} </p>
        </div>
    </div>

    <div class="card-footer text-center d-flex gap-2 justify-content-center">
        <button onclick="deleteItem( ${i} )" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
        <button onclick="setUpdateInfo(${i})" class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>
    </div>
</div>

        `}

    }

    document.getElementById("rowData").innerHTML = container
}



function setUpdateInfo(index) {

indexGlobal = index ;


    productNameInput.value = productList[index].name
    productPriceInput.value = productList[index].price
    productCategoryInput.value = productList[index].category
    productDescription.value = productList[index].description
    
    document.getElementById("btnAdd").classList.add("d-none")
    document.getElementById("btnUpdate").classList.remove("d-none")
}



function updateData() {

    var product = {
        name : productNameInput.value ,
        price: productPriceInput.value ,
        category: productCategoryInput.value ,
        description: productDescriptionInput.value ,
        image: productImageInput.files[0] ? `image/${productImageInput.files[0]?.name}` : "image/3.jpg"
    };

    productList.splice(   indexGlobal   , 1  ,  product  );
    
    localStorage.setItem( "productContainer"   , JSON.stringify(productList)   )

    desplayData()

    clearForm()

    document.getElementById("btnAdd").classList.remove("d-none")
    document.getElementById("btnUpdate").classList.add("d-none")

}