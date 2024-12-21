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

  const HOME_ADDITION = document.querySelector("#last_row")
// RENDER HOME
const RENDERHOME = async (homi) => {
    if (homi && homi.length) {
      homi.forEach((third) => {
        const homeelement7 = document.createElement("div");
        homeelement7.setAttribute("home_id", third.id)
        homeelement7.idName = "last_row ";
        homeelement7.innerHTML = `    
           <div class="col-lg-4 col-md-8 col-sm-12">
            <div class="latest_img">
              <img
                src="${third.image}"
                alt="Blog Thumbnail">
            </div>
            <div class="lastest_img_txt">
              <p>${third.description}</p>
              <div class="lastest_icons">
                <h2><i class="ri-calendar-2-line"></i>${third.time}</h2>
                <h2><i class="ri-time-line"></i>${third.clock}</h2>
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
  fetchApiData("/third", (homi) => {
    RENDERHOME(homi);
  });