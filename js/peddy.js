// all Data load 
const allDataLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json()
    displayAllPets(data.pets);

}

const displayAllPets = (pets) => {
    pets.forEach(function (pet) {
        // distrture 
        const {petId, breed,category,date_of_birth,price,image,gender,pet_details,vaccinated_status,pet_name} = pet

        const cardContainer = document.getElementById('card-container')

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





}



allDataLoad()