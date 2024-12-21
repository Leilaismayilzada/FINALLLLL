// SELECTORS
const PROPERTY_ROW = document.querySelector("#prop_img_total_row_blog");




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
      properties.forEach((propertyBlog) => {
        const blogelement7=document.createElement("div");
        blogelement7.setAttribute("blog_id",propertyBlog.id)
        blogelement7.className="blogelement col-lg-4 col-md-8 col-sm-12";
        blogelement7.innerHTML=`  <div class="prop_grid">
      <div class="properties_images">
        <div class="properties_images__main">
          <img src="${propertyBlog.image}" alt="">
          <div class="properties_images__top_info">
            <span>${propertyBlog.top_desc}</span>
            <p>${propertyBlog.top_rent}</p>
          </div>
        </div>
      </div>
  
      <div class="properties_head_bottom">
        <p>${propertyBlog.bottom_desc}</p>
        <span>
          <i class="ri-map-pin-2-line"></i>
          ${propertyBlog.bottom_location}
        </span>
      </div>
      <div class="properties_head_bottom_pr">
        <div class="properties_head_bottom_pr__1">
          <i class="ri-drag-move-2-fill"></i>
          <p>${propertyBlog.bottom_direction}</p>
        </div>
        <div class="properties_head_bottom_pr__2">
          <i class="ri-hotel-bed-line"></i>
          <p>${propertyBlog.bottom_bed_num}</p>
        </div>
        <div class="properties_head_bottom_pr__3">
          <i class="ri-showers-line"></i>
          <p>${propertyBlog.bottom_bed_num}</p>
        </div>
        <div class="properties_head_bottom_pr__4">
          <i class="ri-roadster-line"></i>
          <p>${propertyBlog.bottom_car_num}</p>
        </div>
      </div>
    </div>`
  
  
        PROPERTY_ROW.appendChild(blogelement7);
        blogelement7.addEventListener("click",(e)=>{
          e.preventDefault;
          let id=blogelement7.getAttribute('blog_id')
          window.location.href=`blog.html?id=${id}`;
  
        })
      });
    } else {
      console.error("No property");
    }
  };
  
  
  // Fetch and Render Properties
  fetchApiData("/propertyBlog", (properties) => {
    RENDERPROPERTY(properties);
  });