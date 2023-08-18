const URL = "http://numbersapi.com"


//1

// async function getFact(num){
//     try{
//         const res = await axios.get(`${URL}/${num}`)
//         console.log(res.data)
//     } catch(err){
//         console.log("ERROR!")
//     }  
// }

// getFact(5)

//2

//sequential
// async function getFacts(nums){
//     try{
//         const results = []
//         for (let num of nums){
//         const res = await axios.get(`${URL}/${num}`)
//         results.push(res)
//         }

//         for(let result of results){
//             console.log(result.data)
//         }
//     } catch(err){
//         console.log("ERRORR!")
//     }
// }

//parallel
async function getFacts(nums){
    try{
        const promises = [];

        for(let num of nums){
            promises.push(axios.get(`${URL}/${num}`))
        }

        for(let promise of promises){
            const result = await promise
            console.log(result.data)
        }
    } catch(err){
        console.log("ERROR!")
    }
}

//with Promise.all()

async function getFactsPromiseAll(nums){
    try{
        let promises = []
        
        for(let num of nums){
            promises.push(axios.get(`${URL}/${num}`))
        } 
        
        let masterPromise = await Promise.all(promises)
        
        for (let result of masterPromise){
            console.log(result.data)
        }
    } catch(err){
        console.log(err)
    }
}

nums = [1,34,77,99]


// getFactsPromiseAll(nums)


//4 Facts of favourite number

const favouriteNumber = 7

async function getFourFacts(num){
    try{
        const repeat = 4
        const promises = []
        for(let i=0; i< repeat; i++){
            promises.push(axios.get(`${URL}/${num}`))
        }

        for(let promise of promises) {
            const result = await promise
            console.log(result.data)
        }
    } catch(err){
        console.log(err)
    }
}

// getFourFacts(favouriteNumber)

async function getFourFactsWithPromiseAll(num){
    try{
        const repeat = 4;
        const promises = [];
        for(let i=0; i < repeat; i++){
            promises.push(axios.get(`${URL}/${num}`))
        }
        const masterPromise = await Promise.all(promises)

        for(let result of masterPromise){
            console.log(result.data)
        }
    } catch(err){
        console.log(err)
    }
}

// getFourFactsWithPromiseAll(favouriteNumber)

//************************** */
//Cards

const button = document.querySelector('#card-button');
const cardArea = document.querySelector('#card-area');

const deckId = "r9l576ykmpjj";

async function drawCard(deckId) {
    const URL = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    const res = await axios.get(URL);
    const cardImageUrl = res.data.cards[0].images.png;
    const value = res.data.cards[0].value;
    const suit = res.data.cards[0].suit;
    console.log(`${value} of ${suit}`);
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    const card = document.createElement('img');
    card.setAttribute('src', cardImageUrl);
    cardContainer.appendChild(card);

    cardArea.appendChild(cardContainer);
}

button.addEventListener("click", () => drawCard(deckId));
