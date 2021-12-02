const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

//Paginação
//[1 = page,..., 13, 14, 15, 16, 17, ..., 20 = totalpages]
//selectedPage = 15
//... = acima de duas paginas

function paginate (selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage === 1 || currentPage === totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
        const pagesBeforeSelecctedPage = currentPage >= selectedPage - 2;
        
        if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelecctedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            } else if (oldPage && currentPage - oldPage === 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }
        return pages
}

function createPagination(pagination) {
    const page = +pagination.dataset.page;
    const total = +pagination.dataset.total;
    const filter = pagination.dataset.filter;
    const pages = paginate(page, total)

    console.log(pages)

    let elements = ""

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`

            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
        
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}
