/////// SELECTORS

const FORM_TABLE_BODY = document.querySelector("#Form_table_body_property");
const FORM_CREATE_TABLE = document.querySelector(".form-create-table-property");
const FORM_TABLE_BODY_CATEGORY = document.querySelector("#Form_table_body_category");
const FORM_CREATE_CATEGORY = document.querySelector(".form-create-table-category");
const FORM_TABLE_BODY_NUMBER = document.querySelector("#form_data_number");
const FORM_CREATE_NUMS = document.querySelector("#formCreateNumbers");
const FORM_CREATE_VALUE = document.querySelector("#formCreateValue");
const FORM_TABLE_BODY_VALUE = document.querySelector("#form_data_value");
const FORM_CREATE_SERVICE = document.querySelector("#formCreateValue");
const FORM_TABLE_CREATE_SERVICE = document.querySelector("#form_data_Service");
const FORM_TABLE_CREATE_PROPERTYBLOG = document.getElementById("form-create-table-propertyBlog");
const FORM_TABLE_BODY_PROPERTYBLOG = document.getElementById("Form_table_body_propertyBlog");
const FORM_TABLE_BODY_AMNESTY = document.getElementById("form_data_amnesty")
const FORM_CREATE__AMNESTY_TABLE = document.querySelector(".form-create-table-amnesty");
const FORM_TABLE_CREATE_SLIDER_ABOUTUS=document.querySelector(".form-create-table-slider-aboutus")
const FORM_TABLE_BODY_SLIDER_ABOUTUS=document.querySelector("#form_data_slider_aboutus")



const AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 4000,
});

const fetchApiData = async (url, cb) => {
  try {
    const res = await AxiosInstance.get(url);
    cb(res.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/////////// PROPERTY

const RenderFormData = async (data) => {
  if (data && Array.isArray(data)) {
    FORM_TABLE_BODY.innerHTML = "";  
    data.forEach((property, index) => {
      const FormHtml = `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${property.image}" alt="Property" class="table-img"></td>
          <td>${property.top_desc}</td>
          <td>${property.top_rent}</td>
          <td>${property.bottom_desc}</td>
          <td>${property.bottom_location}</td>
          <td>${property.bottom_direction}</td>
          <td>${property.bottom_bed_num}</td>
          <td>${property.bottom_shower_num}</td>
          <td>${property.bottom_car_num}</td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
      FORM_TABLE_BODY.innerHTML += FormHtml; 
    });
  }
};

fetchApiData("/property", RenderFormData);

if (FORM_CREATE_TABLE) {
  FORM_CREATE_TABLE.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_CREATE_TABLE);
    const payload = {
      id: crypto.randomUUID(),
      image: "",
      top_desc: formData.get("top_desc"),
      top_rent: formData.get("top_rent"),
      bottom_desc: formData.get("bottom_desc"),
      bottom_location: formData.get("bottom_location"),
      bottom_direction: formData.get("bottom_direction"),
      bottom_bed_num: Number(formData.get("bed_num")),
      bottom_shower_num: Number(formData.get("shower_num")),
      bottom_car_num: Number(formData.get("car_num")),
    };

    const fileInput = document.querySelector("#formFile");
    if (fileInput.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;
        AxiosInstance.post("/property", payload).then(() => {
          fetchApiData("/property", RenderFormData);
        });
      };
      fileReader.readAsDataURL(fileInput.files[0]);
    }
  });
}

/////////// CATEGORY
const RENDERCATEGORYDATA = async (data) => {
  if (data && Array.isArray(data)) {
    FORM_TABLE_BODY_CATEGORY.innerHTML = "";
    data.forEach((category, index) => {
      const CategoryHtml = `
      <tr data-id="${category.id}">
        <td>${index + 1}</td>
        <td><img src="${category.image}" alt="Category" class="table-img"></td>
        <td>${category.img_name}</td>
        <td>${category.img_desc}</td>
        <td><button class="btn-action">Edit</button></td>
        <td><button class="btn-action1">Erase</button></td>
      </tr>`;
      FORM_TABLE_BODY_CATEGORY.innerHTML += CategoryHtml;
    });
  }
};

fetchApiData("/category", RENDERCATEGORYDATA);

if (FORM_CREATE_CATEGORY) {
  FORM_CREATE_CATEGORY.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_CREATE_CATEGORY);
    const payload = {
      id: crypto.randomUUID(),
      image: "",
      img_name: formData.get("img_name"),
      img_desc: formData.get("img_desc"),
    };

    const fileInput = document.querySelector("#formFile1");
    if (fileInput.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;
        AxiosInstance.post("/category", payload).then(() => {
          fetchApiData("/category", RENDERCATEGORYDATA);
        });
      };
      fileReader.readAsDataURL(fileInput.files[0]);
    }
  });
}

/////////////// NUMBERS

const RENDERNUMBERS = async (data) => {
  if (data && Array.isArray(data)) {
    FORM_TABLE_BODY_NUMBER.innerHTML = "";
    data.forEach((number, index) => {
      const NumberHtml = `
        <tr>
          <td>${index + 1}</td>
          <td>${number.numbers}</td>
          <td>${number.numbers_description}</td>
          <td>${number.numbers_discover}</td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
      FORM_TABLE_BODY_NUMBER.innerHTML += NumberHtml;
    });
  }
};

fetchApiData("/numbers", RENDERNUMBERS);

if (FORM_CREATE_NUMS) {
  FORM_CREATE_NUMS.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_CREATE_NUMS);
    const payload = {
      id: crypto.randomUUID(),
      numbers: Number(formData.get("numbers")),
      numbers_description: formData.get("numbers_description"),
      numbers_discover: formData.get("numbers_discover"),
    };

    AxiosInstance.post("/numbers", payload).then(() => {

      fetchApiData("/numbers", RENDERNUMBERS);

    })
  });
}

////////VALUE


const RENDERVALUE = async (value) => {
  if (value && Array.isArray(value)) {
    FORM_TABLE_BODY_VALUE.innerHTML = "";
    let Valuehtml = "";
    value.forEach((item, index) => {
      Valuehtml += `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${item.image}" alt="Image" style="max-width: 100px;"/></td>
          <td>${item.title}</td>
          <td>${item.description}</td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
    });
    FORM_TABLE_BODY_VALUE.innerHTML = Valuehtml;
  }
};

fetchApiData("/value", RENDERVALUE);

if (FORM_CREATE_VALUE) {
  FORM_CREATE_VALUE.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_CREATE_VALUE);
    const payload = {
      id: crypto.randomUUID(),
      image: "",
      title: formData.get("title"),
      description: formData.get("description"),
    };

    const fileInput = document.querySelector("#formFile2");
    if (fileInput.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;
        AxiosInstance.post("/value", payload)
          .then(() => fetchApiData("/value", RENDERVALUE))
          .catch((error) => console.error("Error uploading value:", error));
      };
      fileReader.readAsDataURL(fileInput.files[0]);
    } else {

      AxiosInstance.post("/value", payload)
        .then(() => fetchApiData("/value", RENDERVALUE))
        .catch((error) => console.error("Error  value:", error));
    }
  });
}
////////service
const RENDERSERVICE = async (value) => {
  if (value && Array.isArray(value)) {
    FORM_TABLE_CREATE_SERVICE.innerHTML = "";
    let Servicehtml = "";
    value.forEach((service, index) => {
      Servicehtml += `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${service.image}" alt="Image" style="max-width: 100px;"/></td>
          <td>${service.title}</td>
          <td>${service.description}</td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
    });
    FORM_TABLE_CREATE_SERVICE.innerHTML = Servicehtml;
  }
};

fetchApiData("/service", RENDERSERVICE);


if (FORM_CREATE_SERVICE) {
  FORM_CREATE_SERVICE.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_CREATE_SERVICE);
    const payload = {
      id: crypto.randomUUID(),
      image: "",
      title: formData.get("title"),
      description: formData.get("description"),
    };

    const fileInput = document.querySelector("#formFile3");
    if (fileInput.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;
        AxiosInstance.post("/service", payload)
          .then(() => fetchApiData("/service", RENDERSERVICE))
          .catch((error) => {
            console.error("Error uploading value:", error);
            alert("There was an error while uploading the service.");
          });
      };
      fileReader.readAsDataURL(fileInput.files[0]);
    } else {

      AxiosInstance.post("/service", payload)
        .then(() => fetchApiData("/service", RENDERSERVICE))
        .catch((error) => {
          console.error("Error uploading value:", error);
          alert("There was an error while uploading the service.");
        });
    }
  });
}
////////properties blog


const RENDERPROPERTYBLOG = async (data) => {
  if (data && Array.isArray(data)) {
    FORM_TABLE_BODY_PROPERTYBLOG.innerHTML = "";
    data.forEach((propertyBlog, index) => {
      const FormpropBlogHtml = `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${propertyBlog.image}" alt="Property" class="table-img"></td>
          <td>${propertyBlog.top_desc}</td>
          <td>${propertyBlog.top_rent}</td>
          <td>${propertyBlog.bottom_desc}</td>
          <td>${propertyBlog.bottom_location}</td>
          <td>${propertyBlog.bottom_direction}</td>
          <td>${propertyBlog.bottom_bed_num}</td>
          <td>${propertyBlog.bottom_shower_num}</td>
          <td>${propertyBlog.bottom_car_num}</td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
      FORM_TABLE_BODY_PROPERTYBLOG.innerHTML += FormpropBlogHtml;
    });
  }
};

// Fetch data and render table
fetchApiData("/propertyBlog", RENDERPROPERTYBLOG);
 
if (FORM_TABLE_CREATE_PROPERTYBLOG) {
  FORM_TABLE_CREATE_PROPERTYBLOG.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_TABLE_CREATE_PROPERTYBLOG);
    const payload = {
      id: crypto.randomUUID(),
      image: "",
      top_desc: formData.get("top_desc"),
      top_rent: formData.get("top_rent"),
      bottom_desc: formData.get("bottom_desc"),
      bottom_location: formData.get("bottom_location"),
      bottom_direction: formData.get("bottom_direction"),
      bottom_bed_num: Number(formData.get("bed_num")) || 0,
      bottom_shower_num: Number(formData.get("shower_num")) || 0,
      bottom_car_num: Number(formData.get("car_num")) || 0,
    };

    const fileInput = document.querySelector("#formfilepropertyBlog");
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image.");
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;

        AxiosInstance.post("/propertyBlog", payload)
          .then(() => {
            fetchApiData("/propertyBlog", RENDERPROPERTYBLOG);
            FORM_TABLE_CREATE_PROPERTYBLOG.reset();
          })
          .catch((error) => {
            console.error("Error posting property data:", error);
            alert("There was an error while saving the property.");
          });
      };

      fileReader.readAsDataURL(file);
    } else {
      alert("Please select an image.");
    }
  });
}
////////amnesty

const RENDERAMNESTY = async (data) => {
  if (data && Array.isArray(data)) {
    FORM_TABLE_BODY_AMNESTY.innerHTML = "";
    data.forEach((amnestiya, index) => {
      const AMNESTYHTML = `
        <tr>
          <td>${index + 1}</td>
          <td><img src="${amnestiya.image}" alt="Amnesty Image" class="table-img"></td>
          <td>${amnestiya.title}</td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
      FORM_TABLE_BODY_AMNESTY.innerHTML += AMNESTYHTML;
    });
  }
};

fetchApiData("/amnestiya", RENDERAMNESTY);


if (FORM_CREATE__AMNESTY_TABLE) {
  FORM_CREATE__AMNESTY_TABLE.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_CREATE__AMNESTY_TABLE);
    const payload = {
      id: crypto.randomUUID(),
      image: "",
      title: formData.get("title")
    };

    const fileInput = document.querySelector("#formFileamnesty");

    if (fileInput.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;

        AxiosInstance.post("/amnestiya", payload)
          .then(() => {
            fetchApiData("/amnestiya", RENDERAMNESTY);
            FORM_CREATE__AMNESTY_TABLE.reset();
          })
          .catch((error) => {
            console.error("Error posting amnesty data:", error);
            alert("There was an error while saving the amnesty data.");
          });
      };
      fileReader.readAsDataURL(fileInput.files[0]);
    } else {
      AxiosInstance.post("/amnestiya", payload)
        .then(() => {
          fetchApiData("/amnestiya", RENDERAMNESTY);
          FORM_CREATE__AMNESTY_TABLE.reset();
        })
        .catch((error) => {
          console.error("Error posting amnesty data:", error);
          alert("There was an error while saving the amnesty data.");
        });
    }
  });
}

///////slider about us
const RENDERSLIDERSBOUT = async (data) => {
  if (data && Array.isArray(data)) {
    FORM_TABLE_BODY_SLIDER_ABOUTUS.innerHTML = "";
    data.forEach((swiperData, index) => {
      const AMNESTYHTML = `
        <tr>
          <td>${index + 1}</td>
          <td>${swiperData.header}</td>
             <td>${swiperData.name}</td>
              <td>${swiperData.location}</td>
             <td><img src="${swiperData.img}" alt="Amnesty Image" class="table-img"></td>
          <td><button class="btn-action">Edit</button></td>
          <td><button class="btn-action1">Erase</button></td>
        </tr>`;
        FORM_TABLE_BODY_SLIDER_ABOUTUS.innerHTML += AMNESTYHTML;
    });
  }
};

fetchApiData("/swiperData", RENDERSLIDERSBOUT);


if (FORM_TABLE_CREATE_SLIDER_ABOUTUS) {
  FORM_TABLE_CREATE_SLIDER_ABOUTUS.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(FORM_TABLE_CREATE_SLIDER_ABOUTUS);
    const payload = {
      id: crypto.randomUUID(),
      header:formData.get("header"),
      name:formData.get("name"),
      location:formData.get("location"),
      img: "",

    };

    const fileInput = document.querySelector("#formslider");

    if (fileInput.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        payload.image = fileReader.result;

        AxiosInstance.post("/swiperData", payload)
          .then(() => {
            fetchApiData("/swiperData", RENDERSLIDERSBOUT);
            FORM_TABLE_CREATE_SLIDER_ABOUTUS.reset();
          })
          .catch((error) => {
            console.error("Error posting amnesty data:", error);
            alert("There was an error while saving the amnesty data.");
          });
      };
      fileReader.readAsDataURL(fileInput.files[0]);
    } else {
      AxiosInstance.post("/swiperData", payload)
        .then(() => {
          fetchApiData("/swiperData", RENDERSLIDERSBOUT);
          FORM_TABLE_CREATE_SLIDER_ABOUTUS.reset();
        })
        .catch((error) => {
          console.error("Error posting formslider data:", error);
          alert("There was an error while saving the amnesty data.");
        });
    }
  });
}const handleEdit = (row) => {
  const index = row.children[0].textContent - 1;
  ProperEdit(row);
};


// FORM_TABLE_BODY.addEventListener("click", (e) => {
//   if (e.target && e.target.classList.contains("btn-action")) {
//     const row = e.target.closest("tr");
//     handleEdit(row);
//   }

//   if (e.target && e.target.classList.contains("btn-action1")) {
//     const row = e.target.closest("tr");
//     const index = row.children[0].textContent - 1;
//     handleca(index);
//   }
// });

// const ProperEdit = (row) => {
//   const index = row.children[0].textContent - 1;
//   const cells = row.children;
//   document.querySelector("#top_desc").value = cells[2].textContent;
//   document.querySelector("#top_rent").value = cells[3].textContent;
//   document.querySelector("#bottom_desc").value = cells[4].textContent;
//   document.querySelector("#bottom_location").value = cells[5].textContent;
//   document.querySelector("#bottom_direction").value = cells[6].textContent;
//   document.querySelector("#bed_num").value = cells[7].textContent;
//   document.querySelector("#shower_num").value = cells[8].textContent;
//   document.querySelector("#car_num").value = cells[9].textContent;

//   FORM_CREATE_TABLE.setAttribute("data-edit-row", index);
//   document.querySelector(".form-submit-btn").textContent = "Update";
// };

// const handleca = (index) => {
//   if (confirm("Are you sure you want to delete this property?")) {
//     AxiosInstance.delete(`/property/${index}`).then(() => {
//       fetchApiData("/property", RenderFormData);
//     });
//   }
// };

// FORM_CREATE_TABLE.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const index = FORM_CREATE_TABLE.getAttribute("data-edit-row");
//   const formData = new FormData(FORM_CREATE_TABLE);

//   const payload = {
//     image: "New Image",
//     top_desc: formData.get("top_desc"),
//     top_rent: formData.get("top_rent"),
//     bottom_desc: formData.get("bottom_desc"),
//     bottom_location: formData.get("bottom_location"),
//     bottom_direction: formData.get("bottom_direction"),
//     bottom_bed_num: formData.get("bed_num"),
//     bottom_shower_num: formData.get("shower_num"),
//     bottom_car_num: formData.get("car_num"),
//   };

//   if (index !== null) {
//     AxiosInstance.put(`/property/${index}`, payload).then(() => {
//       fetchApiData("/property", RenderFormData);
//       resetForm();
//     });
//   } else {
//     AxiosInstance.post("/property", payload).then(() => {
//       fetchApiData("/property", RenderFormData);
//       resetForm();
//     });
//   }
// });

// const resetForm = () => {
//   FORM_CREATE_TABLE.reset();
//   FORM_CREATE_TABLE.removeAttribute("data-edit-row");
//   document.querySelector(".form-submit-btn").textContent = "Add";
// };

// const categoryedit = (row) => {
//   const categoryId = row.children[0].textContent;
//   const cells = row.children;
//   ProperEditCategory(categoryId, cells);
// };

// FORM_TABLE_BODY_CATEGORY.addEventListener("click", (e) => {
//   if (e.target && e.target.classList.contains("btn-action")) {
//     const row = e.target.closest("tr");
//     categoryedit(row);
//   }

//   if (e.target && e.target.classList.contains("btn-action1")) {
//     const row = e.target.closest("tr");
//     const categoryId = row.children[0].textContent;
//     handlecategory(categoryId);
//   }
// });

// const ProperEditCategory = (categoryId, cells) => {
//   document.querySelector("#top_desc").value = cells[2].textContent;
//   document.querySelector("#top_rent").value = cells[3].textContent;

//   FORM_CREATE_CATEGORY.setAttribute("data-edit-row", categoryId);
//   document.querySelector(".form-submit-btn").textContent = "Update";
// };

// const handlecategory = (categoryId) => {
//   if (confirm("Are you sure you want to delete this property?")) {
//     AxiosInstance.delete(`/category/${categoryId}`).then(() => {
//       fetchApiData("/category", RenderFormData);
//     });
//   }
// };

// FORM_CREATE_CATEGORY.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const categoryId = FORM_CREATE_CATEGORY.getAttribute("data-edit-row");
//   const formData = new FormData(FORM_CREATE_CATEGORY);

//   const payload = {
//     image: "New Image",
//     img_name: formData.get("top_desc"),
//     img_desc: formData.get("top_rent"),
//   };

//   if (categoryId !== null) {
//     AxiosInstance.put(`/category/${categoryId}`, payload).then(() => {
//       fetchApiData("/category", RenderFormData);
//       resetCategory();
//     });
//   } else {
//     AxiosInstance.post("/category", payload).then(() => {
//       fetchApiData("/category", RenderFormData);
//       resetCategory();
//     });
//   }
// });

// const resetCategory = () => {
//   FORM_CREATE_CATEGORY.reset();
//   FORM_CREATE_CATEGORY.removeAttribute("data-edit-row");
//   document.querySelector(".form-submit-btn").textContent = "Add";
// };

// const renderCategories = (categories) => {
//   const tableBody = document.querySelector("#Form_table_body_category");

//   categories.forEach(category => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td>${category.id}</td>
//       <td><img src="${category.image}" alt="${category.img_name}" width="50"></td>
//       <td>${category.img_name}</td>
//       <td>${category.img_desc}</td>
//       <td><button class="btn-action">Edit</button></td>
//       <td><button class="btn-action1">Delete</button></td>
//     `;
//     tableBody.appendChild(row);
//   });
// };
