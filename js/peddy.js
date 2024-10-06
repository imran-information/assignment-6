// all Data load 
const allDataLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    displayAllPets(data.pets);

}


const categoryAllDataLoad = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    const data = await res.json()
    displayAllCategory(data.categories);
}



const displayAllCategory = (categories) => {
    categories.forEach(function (category) {
        // console.log(category);

        const categoriesContainer = document.getElementById('categories-container')
        const { category_icon, category: categoryName, id } = category
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
            <button id=${category.category} onclick="showLoading('${category.category}')" class="my-7 font-bold text-xl  border  text-[#0E7A81] py-3 px-8 rounded-xl flex items-center gap-0">
                <div class="w-3/4"><img class="w-3/4" src=${category_icon} alt="" srcset=""></div>
                <p>${categoryName}</p>
            </button>
        `
        categoriesContainer.append(categoryDiv)
    })
}

const categoryWayesData = async (categoryId) => {
    // console.log(categoryId);

    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryId}`)
    const data = await res.json()
    displayAllPets(data.data);

}





// loading Show
const showLoading = (categoryId) => {
    document.getElementById('card-container').innerHTML = ''
    document.getElementById('error-container').innerHTML = ''

    document.getElementById('loading-logo').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading-logo').classList.add('hidden');
        categoryWayesData(categoryId)
    }, 2000)
}








const displayAllPets = (pets) => {
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
                            <h2 class="card-title ">${pet_name}</h2>
                            <p>Breed: ${breed}</p>
                            <p>Birth: ${date_of_birth}</p>
                            <p>Gender: ${gender}</p>
                            <p>Price: ${price}$</p>
                            <div class="card-actions justify-between">
                                <button class="btn btn-white w-24 border border-gray-300">
                                    <img width="50%" height="50%"
                                        src="https://img.icons8.com/?size=100&id=SkbzwdwhI2sy&format=png&color=000000"
                                        alt="">
                                </button>
                                <button class="btn border border-gray-300 text-[#0E7A81] font-bold text-base">Adopt</button>
                                <button
                                    class="btn border border-gray-300 text-[#0E7A81] font-bold text-base">Details</button>
                            </div>
                        </div>
            
            
            `
            cardContainer.append(div)
        })

    } else {

        const errorContainer = document.getElementById('error-container');
        errorContainer.classList.remove('hidden')
        const div = document.createElement('div')
        div.className = 'w-full bg-slate-200 rounded text-center py-20'
        div.innerHTML = `
            <div class="flex justify-center">
                <img  src="images/error.webp" alt="" >
            </div>
            <h2 class="text-3xl font-bold">No Information Available</h2>
            <h2 class="text-base font-semibold pt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
                its layout. <br> The point of using Lorem Ipsum is that it has a.</h2>
        
        `
        errorContainer.append(div)
    }




}



allDataLoad()
categoryAllDataLoad()