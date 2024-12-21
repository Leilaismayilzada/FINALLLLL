const AGENTS__ADDITION = document.querySelector("#agents__row")
const AGENTS__MAIN_ADDITION = document.querySelector(".agents_main_row")
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
const RENDERAGENTS = async (agent) => {
  if (agent && agent.length) {
    agent.forEach((agents) => {
      const agentelement7 = document.createElement("div");
      agentelement7.setAttribute("agent_id", agents.id)
      agentelement7.idName = "agents__row ";
      agentelement7.innerHTML = `     
          <div class="col-lg-4 col-md-8 col-sm-12">
            <div class="agents__main">
                <div class="agents__main__img">
                    <img src="${agents.image}" alt="">
                </div>
                <h2>${agents.name}</h2>
                <p>${agents.title}</p>
            </div>
        </div>`


      AGENTS__ADDITION.appendChild(agentelement7);
      agentelement7.addEventListener("click", (e) => {
        e.preventDefault;
        let id = agentelement7.getAttribute('agent_id')
        window.location.href = `blog.html?id=${id}`;

      })
    });
  } else {
    console.error("No property");
  }
};


// Fetch and Render Properties
fetchApiData("/agents", (agent) => {
  RENDERAGENTS(agent);
});
////////////////////////////////////////

// ////////RENDER SERVICE
// const RENDERAGENTSMAIN = async (agentimS) => {
//   if (agentimS && agentimS.length) {
//     AGENTS__MAIN_ADDITION.innerHTML = "";
//     agentimS.forEach((agentim) => {
//       const AgentsHtml = `  
// <div class="col-lg-4 col-md-8 col-sm-12">
//             <div class="agents_main_img">
//               <div class="agents_main_images">
//                 <img
//                   src="${agentim.img}"
//                   alt="">
//               </div>

//               <div class="agents_main_img__txt">
//                 <h1>${agentim.name}</h1>
//                 <p>${agentim.position}</p>
//               </div>
//             </div>
//           </div>   `;
//       AGENTS__MAIN_ADDITION.innerHTML += AgentsHtml;
//     });
//   } else {
//     SERVICE_ADDITAGENTS__MAIN_ADDITIONION.innerHTML = "<p>No data available.</p>";
//   }
// };

// // Fetch SERVICE
// fetchApiData("/agentim", RENDERAGENTSMAIN);
// /////////



// Render Agents Main Section
const RENDERAGENTSMAIN = async (agentimS) => {
  if (agentimS && agentimS.length) {
    AGENTS__MAIN_ADDITION.innerHTML = ""; 
    agentimS.forEach((agentim) => {
      const agentElement = document.createElement("div");
      agentElement.className = "col-lg-4 col-md-6 col-sm-12";
      agentElement.innerHTML = `
        <div class="agents_main_img">
          <div class="agents_main_images">
            <a href="${agentim.href}">
              <img
                src="${agentim.img}"
                alt="${agentim.name}">
            </a>
          </div>
          <div class="agents_main_img__txt">
            <h1>${agentim.name}</h1>
            <p>${agentim.position}</p>
          </div>
        </div>
      `;
      AGENTS__MAIN_ADDITION.appendChild(agentElement);
    });
  } else {
    console.error("No agents available.");
    AGENTS__MAIN_ADDITION.innerHTML = "<p>No agents found.</p>";
  }
};
fetchApiData("/agentim", RENDERAGENTSMAIN);
