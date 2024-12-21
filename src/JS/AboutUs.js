const VALUE_ADDITION = document.querySelector(".value_right");
const NUMBERS_ADDITION = document.querySelector(".numbers_right");
const HOME_ADDITION = document.querySelector("#last_row")

window.addEventListener('scroll', () => {
  const img = document.querySelector('.estate_head__img img');
  const scrollY = window.scrollY;
  img.style.transform = `translateY(${scrollY * -0.3}px)`;
});


// BASE
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 4000,
});

// Fetch API Data
const fetchApiData = async (url, cb) => {
  try {
    const res = await AxiosInstance.get(url);
    cb(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


////////RENDER Number
const RENDERNUMBER = async (numbers) => {
  if (numbers && numbers.length) {
    NUMBERS_ADDITION.innerHTML = "";
    numbers.forEach((item) => {
      const NumbersHtml = `  
         <div class="numbers_right__card">
           <h1>${item.numbers}</h1>
           <p>${item.numbers_description}</p>
           <span>${item.numbers_discover}</span>
         </div>`;
      NUMBERS_ADDITION.innerHTML += NumbersHtml;
    });
  } else {
    NUMBERS_ADDITION.innerHTML = "<p>No data available.</p>";
  }
};

// Fetch numbers
fetchApiData("/numbers", RENDERNUMBER);

////////RENDER value
const RENDERVALUE = async (value) => {
  if (value && value.length) {
    VALUE_ADDITION.innerHTML = "";
    value.forEach((item) => {
      const ValueHtml = `  
           <div class="value_right__card">
                   <img src="${item.image}" alt="">
                    <p>${item.title}</p>
                    <span>${item.description}</span>
                  </div> `;
      VALUE_ADDITION.innerHTML += ValueHtml;
    });
  } else {
    VALUE_ADDITION.innerHTML = "<p>No data available.</p>";
  }
};

// Fetch value
fetchApiData("/value", RENDERVALUE);

// RENDER HOME
const RENDERHOME = async (homi) => {
  if (homi && homi.length) {
    homi.forEach((secondhome) => {
      const homeelement7 = document.createElement("div");
      homeelement7.setAttribute("home_id", secondhome.id)
      homeelement7.idName = "last_row ";
      homeelement7.innerHTML = `    
         <div class="col-lg-4 col-md-8 col-sm-12">
          <div class="latest_img">
            <img
              src="${secondhome.image}"
              alt="Blog Thumbnail">
          </div>
          <div class="lastest_img_txt">
            <p>${secondhome.description}</p>
            <div class="lastest_icons">
              <h2><i class="ri-calendar-2-line"></i>${secondhome.time}</h2>
              <h2><i class="ri-time-line"></i>${secondhome.clock}</h2>
            </div>
            <a href=""><button><span>Read more</span></button></a>
          </div>
        </div> `


      HOME_ADDITION.appendChild(homeelement7);
      homeelement7.addEventListener("click", (e) => {
        e.preventDefault;
        let id = homeelement7.getAttribute('home_id')
        window.location.href = `blog2.html?id=${id}`;

      })
    });
  } else {
    console.error("No property");
  }
};


// Fetch and Render home
fetchApiData("/secondhome", (homi) => {
  RENDERHOME(homi);
});


const swiper = new Swiper(".hola", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    900: {
      slidesPerView: "auto",
      centeredSlides: true,
    },
    0: {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true, 
  },
});

const swiperD = document.querySelector(".holaswiper");
if (!swiperD) {
  console.error("Element with classname 'swiper-wrapper' not found");
}
const renderSwiperData = async (data) => {
  if (data && swiperD) {
    data.forEach((swiperData, index) => {
      const swiperHtml = `
          <div key="${index}" class="swiper-slide">
<div class="slidecontainer">
    <div class="row justify-content-between">
        <div class="col-lg-7 col-md-12">
           
                        <div class="values-box-title-wrap"><h2 class="values-box-title">"${swiperData?.header}"
                        </h2></div> 
                        <div class="values-box-text-wrap"><p class="values-box-text">${swiperData?.text}</p></div>
                        <div class="values-box-title-wrap"><h2 class="values-box-title">${swiperData?.name}
                        </h2></div> 
                        <div class="values-box-text-wrap"><p class="values-box-text">${swiperData?.location}

                        </p></div>
                    </div>
        <div class="col-lg-4 col-md-12">
            <div class="testimonials-thumb-wrap"><img src="${swiperData?.img}" alt="A man in a suit and tie smiling." class="testimonials-thumb"></div>
        </div>
    </div>
</div>



                          </div>
                          
        `;
      swiperD.innerHTML += swiperHtml;
    });


  } else {
    console.error("No data or target element to render");
  }
};

fetchApiData("/swiperData", (data) => {
  renderSwiperData(data);
});
