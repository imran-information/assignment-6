// all Data load 
const allDataLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()

    document.getElementById('loading-logo').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('loading-logo').classList.add('hidden');
        displayAllPets(data.pets);
    }, 2000)
}


// categoryAllDataLoad
const categoryAllDataLoad = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json()
    displayAllCategory(data.categories);
}

const displayAllCategory = (categories) => {
    categories.forEach(function (category) {
        const categoriesContainer = document.getElementById('categories-container')
        const { category_icon, category: categoryName, id } = category

        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button id=${category.category} onclick="showLoading('${category.category}')" class="my-7 font-bold text-xl  border  text-[#0E7A81] py-3 px-8 rounded-xl flex items-center gap-0 btn-style">
                <div class="w-3/4"><img class="w-3/4" src=${category_icon} alt="" srcset=""></div>
                <p>${categoryName}</p>
            </button>
        `
        categoriesContainer.append(categoryDiv)
    })
}

// categoryIdDataLoad

const categoryWayesData = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`)
    const data = await res.json()
    displayAllPets(data.data);
}

// removeBtnStyle BTN
const removeBtnStyle = () => {
    const removeBtnStyles = document.getElementsByClassName('btn-style');
    for (const btn of removeBtnStyles) {
        btn.classList.add('rounded-xl')
        btn.classList.remove('rounded-full')
        btn.classList.remove('bg-[#e7f2f2]')
    }

}



// loading Show
const showLoading = (categoryId) => {
    const btnRoundedFull = document.getElementById(categoryId);
    removeBtnStyle()
    btnRoundedFull.classList.remove('rounded-xl')
    btnRoundedFull.classList.add('rounded-full')
    btnRoundedFull.classList.add('bg-[#e7f2f2]')

    document.getElementById('card-container').innerHTML = ''
    document.getElementById('error-container').innerHTML = ''

    document.getElementById('loading-logo').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading-logo').classList.add('hidden');
        categoryWayesData(categoryId)
    }, 2000)
}


// all Pets display
const displayAllPets = (pets) => {
    console.log(pets);

    const cardContainer = document.getElementById('card-container')
    if (pets.length > 0) {
        pets.forEach(function (pet) {
            // distrture 
            const { petId, breed, category, date_of_birth, price, image, gender, pet_details, vaccinated_status, pet_name } = pet


            const div = document.createElement('div')
            div.className = 'card bg-base-100 shadow-xl border border-gray-300';
            div.innerHTML =
                `
                <figure class="px-5 pt-5">
                            <img class="w-full" src=${image}
                                alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="card-body  px-5">
                            <h2 class="card-title ">${pet_name ? pet_name : "Not available"}</h2>
                            <p>Breed: ${breed ? breed : "Not available"}</p>
                            <p>Birth: ${date_of_birth ? date_of_birth : "Not available"}</p>
                            <p>Gender: ${gender ? gender : "Not available"}</p>
                            <p>Price: ${price ? price + "$" : "Not available"}</p>
                            <div class="card-actions justify-between">
                                <button onclick="loveBtnImageSaved('${image}')" class="btn btn-white w-24 border border-gray-300">
                                    <img width="50%" height="50%"
                                        src="https://img.icons8.com/?size=100&id=SkbzwdwhI2sy&format=png&color=000000"
                                        alt="">
                                </button>
                                <button id="${petId}" onclick="displayAdoptCounterBtn('${petId}')" class="btn border border-gray-300 text-[#0E7A81] font-bold text-base">Adopt</button>
                                <button onclick="loadDetails('${petId}')"
                                    class="btn border border-gray-300 text-[#0E7A81] font-bold text-base">Details</button>
                            </div>
                        </div>
            `
            cardContainer.appendChild(div)

        })

        const doubleImageCard = document.createElement('div');
        doubleImageCard.className = 'card bg-base-100 shadow-xl border border-gray-300 row-start-1 row-end-7'
        doubleImageCard.innerHTML = `
            <div id="double-img" class="grid grid-cols-2 gap-5 justify-center p-5">
                
            </div>
        
        `
        cardContainer.appendChild(doubleImageCard)
    } else {
        const errorContainer = document.getElementById('error-container');
        errorContainer.classList.remove('hidden')
        const div = document.createElement('div')
        div.className = 'w-full bg-slate-200 rounded text-center py-20 p-5'
        div.innerHTML = `
            <div class="flex justify-center">
                <img  src="images/error.webp" alt="" >
            </div>
            <h2 class="text-3xl font-bold">No Information Available</h2>
            <h2 class="font-medium text-base text-neutral-500 pt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. <br> The point of using Lorem Ipsum is that it has a.</h2>
        
        `
        errorContainer.append(div)

    }
}


// like btn click function
const loveBtnImageSaved = (image) => {
    const doubleImageContainer = document.getElementById('double-img')
    const doubleImageDiv = document.createElement('div')
    doubleImageDiv.innerHTML = `
        
        <img class="rounded w-full" src=${image} alt="" srcset="">
        
    `
    doubleImageContainer.append(doubleImageDiv)

}


// details btn click function 
// Display Details Data load 
const loadDetails = async (petId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    const data = await res.json()
    displayDetails(data.petData);

}

// Display Details Show
const displayDetails = (petData) => {
    const { pet_name, image, date_of_birth, pet_details, vaccinated_status, breed, gender, price } = petData

    document.getElementById('details-content').innerHTML = `
            <img class="w-full rounded" src=${image}/>
            <h3 class="text-2xl my-3">${pet_name}</h3>
        <div class="flex gap-4">
            <div>
                <p class="text-justify my-2 text-sm font-bold">Brand: ${breed}</p>
                <p class="text-justify my-2 text-sm font-bold">Gender: ${gender}</p>
                <p class="text-justify my-2 text-sm font-bold">Vaccinated status: ${vaccinated_status}</p>
            </div>
            <div>
                <p class="text-justify my-2 text-sm font-bold">Birth: ${date_of_birth}</p>
                <p class="text-justify my-2 text-sm font-bold">Price: ${price}</p>
            </div>
        </div>
        <hr>
        <h3 class="text-2xl my-3">Details Information</h3>
        <p class="text-justify my-3 text-sm">${pet_details}</p>
    `

    document.getElementById('customModal').showModal()
}

// Adopt btn count
const displayAdoptCounterBtn = (petId) => {
    // const petId = (petData);

    document.getElementById('atop-content').innerHTML = `
        <h3 id="countdown" class="text-4xl my-3 text-center">3</h3>
        <h3 class="text-6xl my-3 text-center">Congrats</h3>
    
    `
    let count = 3; // Starting count
    const countdownElement = document.getElementById('countdown');
    const countdown = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        if (count <= 0) {
            clearInterval(countdown);
            document.getElementById(`${petId}`).setAttribute('disabled', true)
            // document.getElementById('adopt-section').classList.add('hidden')
            document.getElementById(`${petId}`).innerText = "Adopted"

            modalClosed()
        }
    }, 1000);

    my_modal_1.showModal()

}

const modalClosed = () => {
    // document.getElementById('adopt-section').classList.add('hidden')

}


allDataLoad()
categoryAllDataLoad()

