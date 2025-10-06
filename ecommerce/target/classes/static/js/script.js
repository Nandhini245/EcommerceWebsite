//GetUserName
window.addEventListener("load",()=>
{
	const name=localStorage.getItem("username");
	const userElement=document.getElementById("user");
	
	if(name)
		{
			userElement.innerText="Welcome "+name+" !";
		}
		else
		{
			userElement.innerText="Welcome Guest !";
		}
});

//Logout
function logout()
{
	localStorage.removeItem("username");
	window.location.href="/login";
}

//Product Section
async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  const container = document.getElementById("product");

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("prod");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-img"
           data-id="${product.id}" data-title="${product.title}"
           data-price="${product.price}" data-image="${product.image}">
      <div class="star">
        <p class="title">${product.title.substring(0, 30)}...</p>
        <p class="price">Rs. ${product.price}</p>
        <button class="add-cart"
                data-id="${product.id}" data-title="${product.title}"
                data-price="${product.price}" data-image="${product.image}">
          <i class="fa fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll(".product-img, .add-cart").forEach(el => {
    el.addEventListener("click", (e) => {
      const product = {
        id: e.currentTarget.dataset.id,
        title: e.currentTarget.dataset.title,
        price: parseFloat(e.currentTarget.dataset.price),
        image: e.currentTarget.dataset.image,
        quantity: 1
      };
      addToCart(product);
    });
  });
}



//Add to Cart Logic
function addToCart(product) {
  if (!product.title || !product.price) {
    console.warn("Invalid product skipped:", product);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id == product.id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  
  // ✅ notify other tabs (like cart.html)
  window.dispatchEvent(new Event("storage"));
  
  alert(`${product.title} added to cart`);
}
loadProducts();


//Register Function
async function registerUser()
{
	const name=document.getElementById("name").value;
	const email=document.getElementById("email").value;
	const password=document.getElementById("password").value;
	const messageElement=document.getElementById("message");
	
	try{
		const response=await fetch("/api/users/register",{
			method: "POST",
			headers: {"Content-Type" : "application/json"},
			body: JSON.stringify({name,email,password})
		});
		
		const data=await response.json();
		messageElement.innerText=data.message;
		messageElement.style.color=data.status==="success"
? "green" : "red";

		if(data.status==="success")
			{
				setTimeout(()=>
				{
					window.location.href="/login";
				},2000);
			}
	}
	catch(error)
	{
		console.log("Error  :",error);
		messageElement.innerText="Something went wrong!";
		messageElement.style.color="red";
	}
}


//Login Function
async function loginUser()
{
	const email=document.getElementById("email").value;
	const password=document.getElementById("password").value;
	const messageElement=document.getElementById("message");
	
	try{
		const response=await fetch("/api/users/login",{
			method:"POST",
			headers:{"Content-Type": "application/json"},
			body:JSON.stringify({email,password})
		});
		
		const data=await response.json();
		messageElement.innerText=data.message;
		messageElement.style.color=data.status==="success"?"green":"red";
		
		if(data.status=="success")
			{
				localStorage.setItem("username",data.name);
				
				setTimeout(()=>
				{
					window.location.href="/index";
				},2000);
			}
	}
	catch(error)
	{
		console.log("Error", error);
		messageElement.innerText="Something went wrong!";
		messageElement.style.color="red";
	}
}