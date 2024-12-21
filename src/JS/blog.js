const AxiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 4000,
});

const A = new URLSearchParams(window.location.search);
const id = A.get('id');

const AMNESTI_ROW = document.querySelector(".amnestygrid");

const fetchApiData = async () => {
    try {
        const [blogRes, requestRes] = await Promise.all([
            AxiosInstance.get(`/blog_detail/${id}`),
            AxiosInstance.get(`/Request_info/${id}`)
        ]);
        const blog_detail = blogRes.data;
        const Request_info = requestRes.data;
        RENDERBLOG(blog_detail, Request_info);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const RENDERBLOG = (blog_detail, Request_info) => {
    const Blog_property = document.querySelector('#Blog_property');
    if (Blog_property && blog_detail && Request_info) {
        Blog_property.innerHTML = `
        <div class="container">
            <div class="Blog_property__text">
                <h1>${blog_detail.property_text || "No Title Available"}</h1>
                <span><i class="ri-map-pin-2-line"></i> ${blog_detail.property__span || "Location not available"}</span>
                <img src="${blog_detail.property__image || 'default-image.jpg'}" alt="Property Image">
            </div>
            <div class="row">
                <div class="col-lg-7 col-md-12 col-sm-12">
                    <div class="Blog_property__Card">
                        <div class="Blog_property__Card__txt">
                            <h1>${blog_detail.cards__h1 || "No Card Title"}</h1>
                        </div>
                        <div class="Blog_property__Cards">
                            <div><i class="ri-drag-move-2-fill"></i> <span>${blog_detail.direction || "No Direction"}</span></div>
                            <div><i class="ri-hotel-bed-line"></i> <span>${blog_detail.bed || "Not Specified"}</span></div>
                            <div><i class="ri-showers-line"></i> <span>${blog_detail.light || "Not Specified"}</span></div>
                            <div><i class="ri-roadster-line"></i> <span>${blog_detail.car || "Not Specified"}</span></div>
                        </div>
                        <p>${blog_detail.description || "No description available."}</p>
                    </div>
                    <div class="Blog_property__details">
                        <h1>${blog_detail.details__h1 || "No Details Title"}</h1>
                        <p>${blog_detail.details__top_p || "No top paragraph"}</p>
                        <ul>
                            ${blog_detail.description_fields?.map(item => `<li>${item}</li>`).join('') || '<li>No fields available.</li>'}
                        </ul>
                        <span>${blog_detail.details__span || "Not Specified"}</span>
                        <h4>${blog_detail.details__h4 || "No Details"}</h4>
                    </div>
                </div>
                <div class="col-lg-5 col-md-12 col-sm-12 Request_info">
                    <div class="blogCardAdd">
                        <h1>${Request_info.Sale || "Property for Sale"}</h1>
                        <span>${Request_info.price || "Price not available"}</span>
                        <a href="#"><button><span>Add to Cart</span></button></a>
                    </div>
                    <div class="blogCardAddBottom">
                        <p>${Request_info.Moreinfo || "No additional information."}</p>
                        <form class="AddRequestForm">
                            <label for="fullname">Full Name</label>
                            <input type="text" id="fullname" placeholder="Enter your full name">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter your email">
                            <label for="phone">Phone Number</label>
                            <input type="text" id="phone" placeholder="Enter your phone number">
                            <button type="submit">Request info</button>
                        </form>
                    </div>
                    <div class="blogCardAddAgents">
                        <h1>${Request_info.agenttitle || "Agent Details"}</h1>
                        <div class="blogCardAddAgentsimg">
                            <img src="${Request_info.agentimg || 'default-agent.jpg'}" alt="Agent">
                            <div>
                                <span>${Request_info.agentname || "Agent Name"}</span>
                                <p>Phone: ${Request_info.agentphone || "Not available"}</p>
                                <h6>Email: ${Request_info.agentmail || "Not available"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    } else {
        console.error("Data is missing or invalid.");
    }
};

const fetchAmnestyData = async () => {
    try {
        const amnestyRes = await AxiosInstance.get("/amnestiya");
        const amnestyData = amnestyRes.data;
        AMNESTYBLOG(amnestyData);
    } catch (error) {
        console.error("Error fetching amnesty data:", error);
    }
};

const AMNESTYBLOG = (amnesty) => {
    if (amnesty && amnesty.length) {
        AMNESTI_ROW.innerHTML = "";
        amnesty.forEach((amnestiya) => {
            const AmnestyHtml = `  
                <div class="Propertyamnesties__basket">
                    <div class="Propertyamnesties__basket__img">
                        <img src="${amnestiya.image}" alt="">
                    </div>
                    <p>${amnestiya.title}</p>
                </div>`;
            AMNESTI_ROW.innerHTML += AmnestyHtml;
        });
    }
};

fetchApiData();
fetchAmnestyData();
