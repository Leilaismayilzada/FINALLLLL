const AxiosInstance = axios.create({
    baseURL: "http://localhost:3001/",
    timeout: 1000,
});


const B = new URLSearchParams(window.location.search);
const id = B.get('id');

// Fetch agent 
const fetchApiData = async () => {
    try {
       
        const response = await AxiosInstance.get(`/agentsDetails/${id}`);
        const AGNTS = response.data; 
        RENDERAGENTSDTL(AGNTS); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const AGENT_ADDITION = document.querySelector(".agent_detail_cards__row");

// Render agent 
const RENDERAGENTSDTL = (AGNTS) => {
    if (AGNTS) {
        const agentElement = document.createElement("div");
        agentElement.setAttribute("agent_id", AGNTS.id);
        agentElement.classList.add("col-lg-12", "col-md-8", "col-sm-12");
        agentElement.innerHTML = `    
        <div class="agent_detail_top">
            <h2>${AGNTS.name}</h2>
            <p>${AGNTS.relatorId}</p>
        </div>
        <div class="row agent_detail_cards">
            <div class="col-lg-8 col-md-12 col-sm-12">
                <div class="agent_detail_card">
                    <h2>Personal Information</h2>
                    <p>Location: <span>${AGNTS.location}</span></p>
                    <p>Phone: <span>${AGNTS.phone}</span></p>
                    <p>Email: <span>${AGNTS.mail}</span></p>
                    <p>Experience: <span>${AGNTS.experience}</span></p>
                    <p>Position: <span>${AGNTS.Position}</span></p>
                    <p>Language: <span>${AGNTS.Language}</span></p>
                    <div class="agent_detail_card__socialmedia">
                        <ul>
                            <li><i class="ri-facebook-circle-fill"></i></li>
                            <li><i class="ri-twitter-x-line"></i></li>
                            <li><i class="ri-instagram-line"></i></li>
                            <li><i class="ri-youtube-fill"></i></li>
                            <li><i class="ri-linkedin-fill"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-8 col-sm-12">
                <div class="agent_detail_img">
                    <img src="${AGNTS.image}" alt="${AGNTS.name}">
                </div>
            </div>
        </div>`;
        
        AGENT_ADDITION.appendChild(agentElement);

        agentElement.addEventListener("click", () => {
            const agentId = agentElement.getAttribute("agent_id");
            window.location.href = `agentdetail.html?id=${agentId}`;
        });
    } else {
        console.error("No agent data to render");
    }
};

fetchApiData();
