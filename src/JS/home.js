window.addEventListener('scroll', () => {
  const img = document.querySelector('.estate_head__img img');
  const scrollY = window.scrollY;
  img.style.transform = `translateY(${scrollY * -0.3}px)`;
});





// SELECTORS
const PROPERTY_ROW = document.querySelector("#prop_img_total_row");
const PROPERTYCATEGORY_CONTAINER = document.querySelector("#prog_category_add");
const NUMBERS_ADDITION = document.querySelector(".numbers_right");
const ACCORDION_ADDITION = document.querySelector('.accordion');
const SERVICE_ADDITION = document.querySelector("#herorow")
const HOME_ADDITION = document.querySelector("#last_row")

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

// RENDER PROPERTY
const RENDERPROPERTY = async (properties) => {
  if (properties && properties.length) {
    properties.forEach((property) => {
      const blogelement7 = document.createElement("div");
      blogelement7.setAttribute("blog_id", property.id)
      blogelement7.className = "blogelement col-lg-4 col-md-8 col-sm-12";
      blogelement7.innerHTML = `  <div class="prop_grid">
    <div class="properties_images">
      <div class="properties_images__main">
        <img src="${property.image}" alt="">
        <div class="properties_images__top_info">
          <span>${property.top_desc}</span>
          <p>${property.top_rent}</p>
        </div>
      </div>
    </div>

    <div class="properties_head_bottom">
      <p>${property.bottom_desc}</p>
      <span>
        <i class="ri-map-pin-2-line"></i>
        ${property.bottom_location}
      </span>
    </div>
    <div class="properties_head_bottom_pr">
      <div class="properties_head_bottom_pr__1">
        <i class="ri-drag-move-2-fill"></i>
        <p>${property.bottom_direction}</p>
      </div>
      <div class="properties_head_bottom_pr__2">
        <i class="ri-hotel-bed-line"></i>
        <p>${property.bottom_bed_num}</p>
      </div>
      <div class="properties_head_bottom_pr__3">
        <i class="ri-showers-line"></i>
        <p>${property.bottom_bed_num}</p>
      </div>
      <div class="properties_head_bottom_pr__4">
        <i class="ri-roadster-line"></i>
        <p>${property.bottom_car_num}</p>
      </div>
    </div>
  </div>`


      PROPERTY_ROW.appendChild(blogelement7);
      blogelement7.addEventListener("click", (e) => {
        e.preventDefault;
        let id = blogelement7.getAttribute('blog_id')
        window.location.href = `blog.html?id=${id}`;

      })
    });
  } else {
    console.error("No property");
  }
};


// Fetch and Render Properties
fetchApiData("/property", (properties) => {
  RENDERPROPERTY(properties);
});
////////RENDER CATEGORY
const PROPERTYCATEGORY = async (categories) => {
  if (categories && categories.length) {
    PROPERTYCATEGORY_CONTAINER.innerHTML = "";
    categories.forEach((category) => {
      const CategoryHtml = `  
        <div class="col-lg-4 col-md-8 col-sm-12">
          <div class="prop_category__card">
            <div class="prop_category__card__img">
              <img src="${category.image}" alt="${category.img_name}">
            </div>
            <div class="prop_category__card__bottom">
              <h2>${category.img_name}</h2>
              <p>${category.img_desc}</p>
              <button>Explore Now</button>
            </div>
          </div>
        </div>`;
      PROPERTYCATEGORY_CONTAINER.innerHTML += CategoryHtml;
    });
  }
};

// Fetch category
fetchApiData("/category", PROPERTYCATEGORY);


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

// document.getElementById('toggle_burger').addEventListener('click', function() {
//   const sidebar = document.querySelector('.sidebar');
//   const mainContent = document.querySelector('.main-content');
//   sidebar.classList.toggle('collapsed');
//   mainContent.classList.toggle('sidebar-collapsed');
// });

////////RENDER SERVICE
const RENDERSEVICE = async (serviceS) => {
  if (serviceS && serviceS.length) {
    SERVICE_ADDITION.innerHTML = "";
    serviceS.forEach((service) => {
      const ServicesHtml = `  
          <div class="col-lg-4 col-md-8 col-sm-12 herorowvar">
                    <div class="service_hero_box">
                        <div class="service_hero_box__img">
                            <img src="${service.image}" alt="">
                        </div>
                        <h2>${service.title} </h2>
                        <p>${service.description} </p>
                    </div>
                   </div>  `;
      SERVICE_ADDITION.innerHTML += ServicesHtml;
    });
  } else {
    SERVICE_ADDITION.innerHTML = "<p>No data available.</p>";
  }
};

// Fetch SERVICE
fetchApiData("/service", RENDERSEVICE);

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
//////////agents slider

var swiperss = new Swiper(".hi", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 30,
  loop: true, 
  autoplay: {
    delay: 0, 
    disableOnInteraction: false, 
  },
  speed: 2000, 
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
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
});

function runContinuous() {
  setInterval(function() {
    swiperss.slideNext();
  }, 100); 
}

runContinuous(); 


const agentD = document.querySelector("#salam");
if (!agentD) {
  console.error("Element with classname 'swiper-wrapper' not found");
}
const renderagentData = async (data) => {
  if (data && agentD) {
    for (let i = 0; i < 10 && i < data.length; i++) {
      const agentData = data[i];
      const agentHtml = `
        <div key="${i}" class="swiper-slide">
                     <a href="${agentData?.href}">   
                     <div class="agentslideimg">
                      <img src="${agentData?.img}" alt=""></div> 
                      <div class="agentslidename">
                      ${agentData?.name}
                      </div>
<div class="agentslideposition">
                      ${agentData?.position}
                      </div>
                     </a>

</div>



                        </div>
                        
      `;
      agentD.innerHTML += agentHtml;
    }
  } else {
    console.error("No data or target element to render");
  }
};
fetchApiData("/agentim", (data) => {
  renderagentData(data);
});
//
function toggleBurgerMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  burgerMenu.classList.toggle('open'); 
  mobileNav.classList.toggle('show'); 
}
