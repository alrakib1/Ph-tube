const handleCategory = async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categories = data.data;

    const tabContainer = document.getElementById('tab-container');
    categories.forEach((categoryName)=>{
        console.log(categoryName)
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab bg-gray-300">${categoryName.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
    
}

handleCategory();