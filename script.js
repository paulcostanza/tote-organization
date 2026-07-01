const kitchenOneList = document.querySelector('.kitchen-1-list')
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
            kitchenOneList.appendChild(list)
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