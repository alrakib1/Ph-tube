const handleCategory = async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categories = data.data;

    const tabContainer = document.getElementById('tab-container');
    categories.forEach((categoryName)=>{
        // console.log(categoryName)
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadVideo('${categoryName?.category_id}')" class="tab bg-gray-300">${categoryName?.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
     
}

const handleLoadVideo = async(categoryId) =>{
    console.log(categoryId);

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data =await response.json();
   
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    

    data.data.forEach((video)=>{
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src=${video.thumbnail} class="w-full h-[220px]" alt="" />
            </figure>
            <div class="card-body">
              <div class="flex  gap-3">
                <div class="avatar">
                  <div class="w-16 h-16 rounded-full">
                    <img src=${video.authors[0].profile_picture} alt="" />
                  </div>
                </div>
                <div class="">
                  <h4 class="text-base font-bold">
                    ${video.title}
                  </h4>
                  <div>
              <div class="flex gap-3">
              <p>${video.authors[0].profile_name}</p>
              <img src="${video.authors[0].verified ? './images/tick.png' : '' }"/>
              </div>
              <p>${video.others.views} views</p>
              </div>
                </div>
              </div>
            </div>
          </div>
        `;
        cardContainer.appendChild(div);

        
    });
}

handleCategory();
handleLoadVideo('1000')