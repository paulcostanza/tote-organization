// the unordered lists
const kitchenOneList = document.querySelector('.kitchen-1-list')
const kitchenTwoList = document.querySelector('.kitchen-2-list')
const kitchenThreeList = document.querySelector('.kitchen-3-list')
const kitchenFourList = document.querySelector('.kitchen-4-list')
const kitchenFiveList = document.querySelector('.kitchen-5-list')
const kitchenSixList = document.querySelector('.kitchen-6-list')
const kitchenSevenList = document.querySelector('.kitchen-7-list')
const miscellaneousOneList = document.querySelector('.miscellaneous-1-list')
const miscellaneousTwoList = document.querySelector('.miscellaneous-2-list')

// container for h2 and unorderered list
const toteContainerKitchenOne = document.querySelector('.tote-container-1')
const toteContainerKitchenTwo = document.querySelector('.tote-container-2')
const toteContainerKitchenThree = document.querySelector('.tote-container-3')
const toteContainerKitchenFour = document.querySelector('.tote-container-4')
const toteContainerKitchenFive = document.querySelector('.tote-container-5')
const toteContainerKitchenSix = document.querySelector('.tote-container-6')
const toteContainerKitchenSeven = document.querySelector('.tote-container-7')
const toteContainerMiscellaneousOne = document.querySelector('.tote-container-8')
const toteContainerMiscellaneousTwo = document.querySelector('.tote-container-9')

// other html elements that I need
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const searchInput = document.querySelector("[search-input]")

let items = []

fetch("./items.json")
    .then(res => res.json())
    .then(data => {
        items = data.map(item => {
            const btn = document.createElement('button')
            const list = document.createElement('li')
            const span = document.createElement('span')

            btn.classList.add("list-btn")

            const itemName = item.item
            const quantity = item.quantity
            list.textContent = itemName
            span.textContent = quantity

            btn.dataset.name = itemName
            btn.dataset.quantity = quantity

            list.appendChild(span)
            btn.appendChild(list)

            switch (item.tote) {
                case "kitchen #1":
                    kitchenOneList.appendChild(btn)
                    break
                case "kitchen #2":
                    kitchenTwoList.appendChild(btn)
                    break
                case "kitchen #3":
                    kitchenThreeList.appendChild(btn)
                    break
                case "kitchen #4":
                    kitchenFourList.appendChild(btn)
                    break
                case "kitchen #5":
                    kitchenFiveList.appendChild(btn)
                    break
                case "kitchen #6":
                    kitchenSixList.appendChild(btn)
                    break
                case "kitchen #7":
                    kitchenSevenList.appendChild(btn)
                    break
                case "miscellaneous #1":
                    miscellaneousOneList.appendChild(btn)
                    break
                case "miscellaneous #2":
                    miscellaneousTwoList.appendChild(btn)
                    break
                default:
                    console.log('Uh... you should\'t be here!')
            }

            return { name: itemName, element: list }
        })
        const btns = document.querySelectorAll('.list-btn')
        console.log(btns)

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const clickedBtn = e.currentTarget
                const name = clickedBtn.dataset.name
                const qty = clickedBtn.dataset.quantity

                console.log("Raw Button Dataset:", clickedBtn.dataset)
                console.log(`Clicked Item: ${name} | Quantity: ${qty}`)
            })
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
    const kitchenFiveHasVisibleItem = kitchenFiveList.querySelector("li:not(.hide)") !== null
    const kitchenSixHasVisibleItem = kitchenSixList.querySelector("li:not(.hide)") !== null
    const kitchenSevenHasVisibleItem = kitchenSevenList.querySelector("li:not(.hide)") !== null
    const miscellaneousOneHasVisibleItem = miscellaneousOneList.querySelector("li:not(.hide)") !== null
    const miscellaneousTwoHasVisibleItem = miscellaneousTwoList.querySelector("li:not(.hide)") !== null

    toteContainerKitchenOne.classList.toggle('hide', !kitchenOneHasVisibleItem)
    toteContainerKitchenTwo.classList.toggle('hide', !kitchenTwoHasVisibleItem)
    toteContainerKitchenThree.classList.toggle('hide', !kitchenThreeHasVisibleItem)
    toteContainerKitchenFour.classList.toggle('hide', !kitchenFourHasVisibleItem)
    toteContainerKitchenFive.classList.toggle('hide', !kitchenFiveHasVisibleItem)
    toteContainerKitchenSix.classList.toggle('hide', !kitchenSixHasVisibleItem)
    toteContainerKitchenSeven.classList.toggle('hide', !kitchenSevenHasVisibleItem)
    toteContainerMiscellaneousOne.classList.toggle('hide', !miscellaneousOneHasVisibleItem)
    toteContainerMiscellaneousTwo.classList.toggle('hide', !miscellaneousTwoHasVisibleItem)

    // toggle "no items match that description" 
    const mainHasVisibleDiv = main.querySelector("div:not(.hide)") !== null
    footer.classList.toggle('hide', mainHasVisibleDiv)
})

