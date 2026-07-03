// the unordered list
const kitchenOneList = document.querySelector('.kitchen-1-list')
const kitchenTwoList = document.querySelector('.kitchen-2-list')
const kitchenThreeList = document.querySelector('.kitchen-3-list')
const kitchenFourList = document.querySelector('.kitchen-4-list')
const miscellaneousOneList = document.querySelector('.miscellaneous-1-list')

// container for h2 and uorderered list
const toteContainerKitchenOne = document.querySelector('.tote-container-1')
const toteContainerKitchenTwo = document.querySelector('.tote-container-2')
const toteContainerKitchenThree = document.querySelector('.tote-container-3')
const toteContainerKitchenFour = document.querySelector('.tote-container-4')
const toteContainerMiscellaneousOne = document.querySelector('.tote-container-5')

// other html elements that I need
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const searchInput = document.querySelector("[search-input]")

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
                case "miscellaneous #1":
                    miscellaneousOneList.appendChild(list)
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
    const miscellaneousHasVisibleItem = miscellaneousOneList.querySelector("li:not(.hide)") !== null

    toteContainerKitchenOne.classList.toggle('hide', !kitchenOneHasVisibleItem)
    toteContainerKitchenTwo.classList.toggle('hide', !kitchenTwoHasVisibleItem)
    toteContainerKitchenThree.classList.toggle('hide', !kitchenThreeHasVisibleItem)
    toteContainerKitchenFour.classList.toggle('hide', !kitchenFourHasVisibleItem)
    toteContainerMiscellaneousOne.classList.toggle('hide', !miscellaneousHasVisibleItem)

    // toggle "no items match that description" 
    const mainHasVisibleDiv = main.querySelector("div:not(.hide)") !== null
    footer.classList.toggle('hide', mainHasVisibleDiv)
})

