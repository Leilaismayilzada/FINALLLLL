const AxiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
});



const A = new URLSearchParams(window.location.search);
const id = A.get('id');

const fetchApiData = async () => {
    try {
        const [ HOME] = await Promise.all([
            AxiosInstance.get(`/homesBlog/${id}`)
        ]);

        const homesBlog = HOME.data;
        RENDERHOMES(homesBlog);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Render Function
const RENDERHOMES = (homesBlog) => {
    const Blog_homes = document.querySelector('#lastestBlog');
    if (Blog_homes && homesBlog) {
        Blog_homes.innerHTML = `
         <div class="container">
           <div class="lastestBlog__txt">
            <h1>${homesBlog.title || "No Title Available"}</h1>
            <p>${homesBlog.description || "No description provided."}</p>
            <div class="lastest_icons">
                <h2><i class="ri-calendar-2-line"></i>${homesBlog.date || "Unknown Date"}</h2>
                <h2><i class="ri-time-line"></i>${homesBlog.readTime || "Unknown Read Time"}</h2>
              </div>
              <div class="lastestBlogProfile">
               <div class="lastestBlogProfileimg">
                 <img src="${homesBlog.authorImage || '#'}" alt="${homesBlog.authorName || 'Author'}">
               </div>
               <div class="lastestBlogProfiletxt">
                   <p>${homesBlog.authorName || "Anonymous"}</p>
                   <span>${homesBlog.authorRole || "Contributor"}</span>
               </div>
              </div>
              <div class="lastdibu">
                <img src="${homesBlog.bannerImage || 'https://via.placeholder.com/800x400'}" alt="Banner Image">
              </div>
              <div class="lastestBlog__text">
                <h2>${homesBlog.sectionTitle || "Understanding housing stocks"}</h2>
                <p>${homesBlog.sectionContent || "Content not available."}</p>
               <div class="lastestBlog__text_img">         
                       <img src="${homesBlog.sectionImage || 'https://via.placeholder.com/800x400'}" alt="Section Image">
               </div>
              </div>
              <div class="lastestBlog__Written">
                <h1>${homesBlog.keyPrinciplesTitle || "Key principles of green building"}</h1>
                <p>${homesBlog.keyPrinciplesContent || "Content not available."}</p>
                <div class="Bloghomespan">
                    <span>${homesBlog.quote || "No quote provided."}</span>
                </div>
              </div>
              <div class="lastestBlog__Listen">
                <h1>${homesBlog.sustainableTitle || "Embracing a sustainable future"}</h1>
                <p>${homesBlog.sustainableContent || "Content not available."}</p>
              <div class="lastestBlog__listenimg">
                <img src="${homesBlog.sustainableImage || 'https://via.placeholder.com/800x400'}" alt="Sustainable Future Image">
              </div>
              </div>
           </div>
        </div>`;
    } else {
        console.error("Data is missing or invalid.");
    }
};

// Fetch data on page load
fetchApiData();

////
const HOME_ADDITION = document.getElementById("last_row");

const RENDERHOME = async (homi) => {
  if (homi && homi.length) {
    homi.forEach((secondhome) => {
      const homeelement7 = document.createElement("div");
      homeelement7.setAttribute("home_id", secondhome.id);
      homeelement7.classList.add("col-lg-4", "col-md-8", "col-sm-12");
      homeelement7.innerHTML = `    
        <div class="latest_img">
          <img
            src="${secondhome.image || 'default-image.jpg'}"
            alt="Blog Thumbnail">
        </div>
        <div class="lastest_img_txt">
          <p>${secondhome.description}</p>
          <div class="lastest_icons">
            <h2><i class="ri-calendar-2-line"></i>${secondhome.time}</h2>
            <h2><i class="ri-time-line"></i>${secondhome.clock}</h2>
          </div>
          <a href=""><button><span>Read more</span></button></a>
        </div>`;

      HOME_ADDITION.appendChild(homeelement7);

      // Add click event listener for navigation
      homeelement7.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") {
          e.preventDefault();
          let id = homeelement7.getAttribute("home_id");
          window.location.href = `blog2.html?id=${id}`;
        }
      });
    });
  } else {
    console.error("No articles to render");
  }
};

// Fetch and Render home
fetchApiData("/secondhome", (homi) => {
  RENDERHOME(homi);
});
