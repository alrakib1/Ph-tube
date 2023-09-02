let id = 1000;

const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;

  const tabContainer = document.getElementById("tab-container");
  categories.forEach((categoryName) => {
    const div = document.createElement("div"); 
    div.innerHTML = `
        <a onclick="handleLoadVideo('${categoryName?.category_id}')" class="tab bg-gray-300">${categoryName?.category}</a> 
        `;   
    tabContainer.appendChild(div);
  });
};

const handleLoadVideo = async (categoryId) => {
  id = categoryId;

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const array = data.data;

  const Container = document.getElementById("error-container");
  Container.innerHTML = "";
  
  if (array.length === 0) {
    Container.classList.add("flex");
    Container.classList.remove("hidden");
    const div = document.createElement("div");
    div.innerHTML = `
            <div>
            <img src="./images/icon.png" class="w-2/4  mb-10 ml-12 mt-4 "/>
            <p class="text-2xl lg:text-4xl text-center">Oops!! Sorry, There is no <br/> content here</p> 
            </div>   
        `;
    Container.appendChild(div);
  } else {
    array.forEach((video) => {
      // time calculation
      const videoTimer = video.others.posted_date;
      const showTime = (seconds) => {
        const totalSeconds = parseInt(seconds);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return hours + "hrs" + " " + minutes + "min ago";
      };
      const timer = showTime(videoTimer);

      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure>
              <img src=${video.thumbnail} class="w-full h-[220px]" alt="" />
            </figure>
            <p class="text-right bg-[#171717] p-1  text-white absolute right-4 bottom-36">${
              video?.others?.posted_date ? timer : ""
            }</p>
            <div class="card-body">
              <div class="flex gap-3">
                <div class="avatar">
                  <div class="w-16 h-16 rounded-full">
                    <img src=${video?.authors[0]?.profile_picture} alt="" />
                  </div>
                </div>
                <div class="">
                  <h4 class="text-base font-bold">
                    ${video?.title}
                  </h4>
                  <div>
              <div class="flex gap-3">
              <p>${video?.authors[0]?.profile_name}</p>
              <img src="${
                video?.authors[0]?.verified ? "./images/tick.png" : ""
              }" class="h-1/2"/>
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
};
// sort by view button display

const sortByView = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await response.json();

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const array = data.data;

  const arr = array.sort(function (a, b) {
    return (
      parseFloat(b.others.views) -
      parseFloat(a.others.views)
    );
  });

  if(arr.length === 0){
    container.classList.add("flex");
    container.classList.remove("hidden");
  }else{
  const container = document.getElementById('error-container');
  container.classList.remove("flex");
  container.classList.add("hidden");
  
  arr.forEach((video) => {
    // time calculation
    const videoTimer = video.others.posted_date;
    const showTime = (seconds) => {
      const totalSeconds = parseInt(seconds);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return hours + "hrs" + " " + minutes + "min ago";
    };
    const timer = showTime(videoTimer);

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-base-100 shadow-xl">
          <figure>
            <img src=${video.thumbnail} class="w-full h-[220px]" alt="" />
          </figure>
          <p class="text-right bg-[#171717] p-1  text-white absolute right-4 bottom-36">${
            video?.others?.posted_date ? timer : ""
          }</p>
          <div class="card-body">
            <div class="flex gap-3">
              <div class="avatar">
                <div class="w-16 h-16 rounded-full">
                  <img src=${video?.authors[0]?.profile_picture} alt="" />
                </div>
              </div>
              <div class="">
                <h4 class="text-base font-bold">
                  ${video?.title}
                </h4>
                <div>
            <div class="flex gap-3">
            <p>${video?.authors[0]?.profile_name}</p>
            <img src="${
              video?.authors[0]?.verified ? "./images/tick.png" : ""
            }" class="h-1/2"/>
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
};

const goToBlog = () => {
  window.location.href = "blog.html";
};

handleCategory();
handleLoadVideo(id);
