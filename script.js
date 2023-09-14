const loadPhone = (phoneName, limitation) => {
    document.getElementById('spinner').classList.remove('d-none');
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => checkPhonevalidity(data, limitation))
        .catch(error => console.log(error))
}

const checkPhonevalidity = (phonesObj, limitation) => {
    // console.log(phonesObj);
    document.getElementById('spinner').classList.add('d-none');
    
    if (phonesObj.status === true) {
        numberOfData(phonesObj.data, limitation);
    }
    else {
        throwError();
    }
}

const numberOfData = (data, limitation) => {
    if (data.length > 10) {
        // showPhone(data.slice(0, 10));
        // limitation === true ? showPhone(data.slice(0, 10)) :
        // console.log(limitation);
        if (limitation === true) {
            showPhone(data.slice(0, 10));
            document.getElementById('showMore').classList.remove('d-none');
        }
        else {
            showPhone(data);
            document.getElementById('showMore').classList.add('d-none');

        }

    }
    else {
        showPhone(data);
        document.getElementById('showMore').classList.add('d-none');
    }
    // showPhone(data);
    // document.getElementById('showMore').classList.add('d-none');
}

const phoneContainer = document.getElementById('phone-container');
const showPhone = (phones) => {
    // console.log(phones);
    phoneContainer.classList.remove('d-none');
    document.getElementById('error-section').classList.add('d-none');
    phoneContainer.innerText = '';
    phones.forEach(phone => {
        // console.log(phone);
        const { phone_name, image, slug } = phone;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card text-center">
            <div id="card-img" class="mt-2">
                <img src="${image}" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, nostrum.
                </p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal" onclick="loadDetails('${slug}')">
                    Show Details
                </button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div);
    })
    // document.getElementById('spinner').classList.add('d-none');

}

const throwError = () => {
    document.getElementById('error-section').classList.remove('d-none');
    phoneContainer.classList.add('d-none');
    document.getElementById('showMore').classList.add('d-none');
}


const loadDetails = (id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
        .catch(error => console.log(error))
}

const showDetails = (phoneDetails) => {
    const { name, brand, others, releaseDate, mainFeatures } = phoneDetails;
    document.getElementById('phoneModalLabel').innerText = name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerText = '';
    modalBody.innerHTML = `
    <ul>
        <li>Brand : ${brand}</li>
        <li>ReleaseDate : ${releaseDate ? releaseDate : 'Not found'}</li>
        <li>ChipSet : ${mainFeatures.chipSet ? mainFeatures.chipSet : 'Not found'}</li>
        <li>DisplaySize : ${mainFeatures.displaySize ? mainFeatures.displaySize : 'Not found'}</li>
        <li>Bluetooth : ${others?.Bluetooth ? others.Bluetooth : 'Not found'}</li>
    </ul>
    `;
}

const input = document.getElementById('input-field');
let inputValue = 'iphone';
const getInputValue = () => {
    inputValue = input.value;
    input.value = '';
    loadPhone(inputValue, true);
}


input.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        getInputValue();
    }
})

const showAllPhone = () => {
    loadPhone(inputValue, false)
}

loadPhone(inputValue, true);