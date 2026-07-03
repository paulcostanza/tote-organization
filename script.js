// the unordered list
const kitchenOneList = document.querySelector('.kitchen-1-list')
const kitchenTwoList = document.querySelector('.kitchen-2-list')
const kitchenThreeList = document.querySelector('.kitchen-3-list')
const kitchenFourList = document.querySelector('.kitchen-4-list')

// container for h2 and uorderered list
const toteContainerOne = document.querySelector('.tote-container-1')
const toteContainerTwo = document.querySelector('.tote-container-2')
const toteContainerThree = document.querySelector('.tote-container-3')
const toteContainerFour = document.querySelector('.tote-container-4')
const searchInput = document.querySelector("[search-input]")

const main = document.querySelector('main')
const footer = document.querySelector('footer')
let items = []

fetch("./items.json")
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            const list = document.createElement('li')
            const span = document.createElement('span')

            const itemName = item.item
            const quantity = item.quantity
            list.textContent = itemName
            span.textContent = quantity

            list.appendChild(span)

            switch (item.tote) {
                case "kitchen #1":
                    kitchenOneList.appendChild(list)
                    break
                case "kitchen #2":
                    kitchenTwoList.appendChild(list)
                    break
                case "kitchen #3":
                    kitchenThreeList.appendChild(list)
                    break
                case "kitchen #4":
                    kitchenFourList.appendChild(list)
                    break
                default:
                    console.log('Uh... you should\'t be here!')
            }
            return { name: itemName, element: list }
        })
    })

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase() // whatever the user types into the search bar

    items.forEach(item => {
        const isVisible = item.name.toLowerCase().includes(value)
        item.element.classList.toggle('hide', !isVisible)
    })

    // hide tote section if no items match search parameters
    const kitchenOneHasVisibleItem = kitchenOneList.querySelector("li:not(.hide)") !== null
    const kitchenTwoHasVisibleItem = kitchenTwoList.querySelector("li:not(.hide)") !== null
    const kitchenThreeHasVisibleItem = kitchenThreeList.querySelector("li:not(.hide)") !== null
    const kitchenFourHasVisibleItem = kitchenFourList.querySelector("li:not(.hide)") !== null

    toteContainerOne.classList.toggle('hide', !kitchenOneHasVisibleItem)
    toteContainerTwo.classList.toggle('hide', !kitchenTwoHasVisibleItem)
    toteContainerThree.classList.toggle('hide', !kitchenThreeHasVisibleItem)
    toteContainerFour.classList.toggle('hide', !kitchenFourHasVisibleItem)

    // toggle "no items match that description" 
    const mainHasVisibleDiv = main.querySelector("div:not(.hide)") !== null
    footer.classList.toggle('hide', mainHasVisibleDiv)
})

