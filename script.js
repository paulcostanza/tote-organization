const kitchenOneList = document.querySelector('.kitchen-1-list')
const kitchenTwoList = document.querySelector('.kitchen-2-list')
const searchInput = document.querySelector("[search-input]")
let items = []

// need to add speration by totes: data.item.tote!
// add an if kitchen-1-list is empty, toggle 'hide' to 'tote-container-one' class!
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
            console.log(item.tote)

            switch (item.tote) {
                case "kitchen #1":
                    kitchenOneList.appendChild(list)
                    break
                case "kitchen #2":
                    kitchenTwoList.appendChild(list)
            }
            return { name: itemName, element: list }
        })
    })

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase() // whatever the user types into the search bar
    console.log(value)
    console.log(items)

    items.forEach(item => {
        const isVisible = item.name.toLowerCase().includes(value)
        item.element.classList.toggle('hide', !isVisible)
    })

})