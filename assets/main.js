//----------------------//
// INDEX
//----------------------//
//
// $0. Tips
// $1. Resizer
// $2. Insert member's form
// $3. Update poster
// $4. Save as sample
// $5. isVisible sidebar
// $6. Annoucement types
// $7. Loading
// $99. Toaster

//----------------------//
// $0. Tips
//----------------------//

const steps = [
  { element: "#step1", text: "1/3 - 於側邊欄選擇公告模板。" },
  { element: "#step2", text: "2/3 - 瀏覽公告模板。可點選中央圖示拉伸畫面區域。" },
  { element: "#step3", text: "3/3 - 編輯表單後，點選「更新」按鈕，可更新上翻瀏覽公告模板；點選「寄出」則寄出至填寫的信箱。" },
];

let currentStep = 0;

const mask = document.querySelector(".step-mask");
const highlight = document.querySelector(".step-highlight");
const tooltip = document.querySelector(".step-tooltip");
const stepText = document.getElementById("stepText");
const nextButton = document.getElementById("nextStep");
const closeButton = document.getElementById("closeGuide");


const guideButton = document.getElementById("guideButton");
guideButton.addEventListener("click", () => {
  if (itemSelected) {
    startGuide();
  }
}

);

let itemSelected = false;

function showStep(stepIndex) {
  const step = steps[stepIndex];
  if (!step) return;

  const target = document.querySelector(step.element);
  const rect = target.getBoundingClientRect();


  highlight.style.top = `${rect.top}px`;
  highlight.style.left = `${rect.left}px`;
  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
  highlight.style.display = "block";


  stepText.textContent = step.text;
  tooltip.style.top = `${rect.bottom + 10}px`;
  tooltip.style.left = `${rect.left}px`;
  tooltip.style.display = "block";
}

function hideGuide() {
  mask.style.display = "none";
  highlight.style.display = "none";
  tooltip.style.display = "none";
}

function startGuide() {

  currentStep = 0;
  mask.style.display = "block";
  showStep(currentStep);
}

function updateItemStatus() {
  itemSelected = true;
  guideButton.classList.remove("guideDisabled");
  guideButton.classList.add("guideActive");
}

nextButton.addEventListener("click", () => {
  currentStep++;
  if (currentStep < steps.length) {
    showStep(currentStep);
  } else {
    hideGuide();
  }
});

closeButton.addEventListener("click", hideGuide);


//----------------------//
// $1. Resizer
//----------------------//
const resizer = document.querySelector('#dragTrigger');
const topPanel = document.querySelector('#topPanel');
const bottomPanel = document.querySelector('#bottomPanel');
const posterReview = document.querySelector('.posterReview');
const dragableContainer = document.querySelector('#dragableContainer');

let isDragging = false;

const onMouseMove = (e) => {
  if (isDragging) {
    const containerRect = dragableContainer.getBoundingClientRect();
    const newHeight = e.clientY - containerRect.top;

    const minHeight = 100;
    const maxHeight = containerRect.height - 100;
    const adjustedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    topPanel.style.flex = `0 0 ${adjustedHeight}px`;
    bottomPanel.style.flex = `0 0 ${containerRect.height - adjustedHeight}px`;
    posterReview.style.height = `${adjustedHeight}px`;

    // console.log('bottomPanel height:', containerRect.height - adjustedHeight);
  }


};

const onMouseUp = (e) => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  isDragging = false;

};

resizer.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  isDragging = true;
  console.log("isDragging:", isDragging);

});



//----------------------//
// $2. Insert member's form
//----------------------//

let memberCount = 1;
const members = document.getElementById('members');

const btnAddNewMember = document.getElementById('btnAddNewMember');

function addNewMember() {
  memberCount++;
  const member = document.createElement('div');
  member.className = 'member formGrid';
  member.setAttribute('data-member-id', memberCount);

  const memberTemplate = `
    <div style="grid-column: span 12; font-weight: 700; font-size: 16px">
      <p style="display:flex; align-items:center">新成員(<span>${memberCount}</span>)
        <svg onclick="deleteMember(event)" class="icon delete size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </p>
    </div>
    <div class="inputBox" style="grid-column: span 3">
      <label for="name">姓名</label>
      <input type="text" id="name-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 3">
      <label for="email">Email</label>
      <input type="email" id="email-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 2">
      <label for="startDate">報到日</label>
      <input type="date" id="startDate-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 2">
      <label for="location">工作地點</label>
      <input type="text" id="location-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 2">
      <label for="extension">聯絡分機</label>
      <input type="text" id="extension-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 4">
      <label for="position">部門職位</label>
      <input type="text" id="position-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 4">
      <label for="supervisor">部門主管</label>
      <input type="text" id="supervisor-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 4">
      <label for="dirSupervisor">直屬主管</label>
      <input type="text" id="dirSupervisor-${memberCount}" />
    </div>
    <div class="inputBox" style="grid-column: span 12">
      <label for="introduction">自我介紹</label>
      <textarea id="introduction-${memberCount}" rows="3"></textarea>
    </div>
    <div class="inputBox" style="grid-column: span 4">
      <label for="profile">圖片</label>
      <input type="file" id="profile-${memberCount}" style="background: #ffffff" />
    </div>
  `;
  member.innerHTML = memberTemplate;

  return member;
}

document.getElementById('formContainer').addEventListener('click', (event) => {
  if (event.target && event.target.id === 'btnAddNewMember') {
    const members = document.getElementById('members');
    members.appendChild(addNewMember());
  }
});
function deleteMember(e) {
  e.target.closest('.member').remove();
}


//----------------------//
// $3. Update poster
//----------------------//

const btnUpdate = document.getElementById('btnUpdate');

function sendHTML() {
  const iframe = document.getElementById('poster');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const container = iframeDoc.documentElement.outerHTML
  console.log(container);

}

function updateAnnouncement() {
  let isCompleted = true;

  const iframe = document.getElementById('poster');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  const container = iframeDoc.querySelector('#container');
  const bottomPanel = document.querySelector('#bottomPanel');
  const greeting = document.getElementById('greeting').value;

  isCompleted = validateRequired(selectAllInputs(bottomPanel));
  clearError(selectAllInputs(bottomPanel));
  console.log('isCompleted:', isCompleted);

  if (isCompleted) {
    container.innerHTML = '';
    const members = document.querySelectorAll('.member');
    container.insertAdjacentHTML('beforeend', membersForEach(members).join(''));
    iframeDoc.querySelector('#greeting').innerText = greeting;
    console.log(iframeDoc)
    showToaster('更新完成', 'info', 2000);
  } else {
    showToaster('表單未完成。', 'error', 2000);
  }
}

function membersForEach(members) {
  return Array.from(members).map((member) => {
    const memberId = member.getAttribute('data-member-id');
    const name = document.getElementById(`name-${memberId}`).value;
    const email = document.getElementById(`email-${memberId}`).value;
    const startDate = document.getElementById(`startDate-${memberId}`).value;
    const position = document.getElementById(`position-${memberId}`).value;
    const dirSupervisor = document.getElementById(`dirSupervisor-${memberId}`).value;
    const supervisor = document.getElementById(`supervisor-${memberId}`).value;
    const location = document.getElementById(`location-${memberId}`).value;
    const extension = document.getElementById(`extension-${memberId}`).value;
    const image = document.getElementById(`profile-${memberId}`).value;
    const imageName = image.split('\\').pop();
    const introduction = document.getElementById(`introduction-${memberId}`).value;

    return `
      <!-- intro start -->
      <table
        width="850"
        style="font-family: '微軟正黑體', sans-serif;padding: 0; margin: 0; margin-top: 10px"
        border="0"
        cellpadding="5"
        cellspacing="0"
      >
        <tr>
          <td
            width="400"
            valign="top"
            style="background-color: #fff; text-align: center"
          >
            <!-- 300x320 -->
            <img
              width="450"
              height="auto"
              style="border-radius: 10px;"
              src="${imageName}"
              alt=""
            />
          </td>

          <td width="450" valign="top" style="padding: 10px; background-color: #fff";>
            <p style="padding: 0; margin: 0; font-family: '微軟正黑體', sans-serif; font-size: 16px; font-weight: 500;">自我介紹 Self-Introduction</p>
            <p style="padding: 0; margin: 0; margin-top: 10px; font-family: '微軟正黑體', sans-serif; font-size: 24px; font-weight: 800;">${name}</p>
            <p style="padding: 0; margin: 0; margin-top: 10px; font-family: '微軟正黑體', sans-serif; font-size: 18px;line-height: 32px;">${introduction}</p>
            <div style="border-top: 1px solid #e0e0e0; width: 300px; margin: 10px 0;"></div>
            <p></p>
            <p style="padding: 0; padding-bottom: 5px; margin-top: 20px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">到職日期 <span style="color: rgb(134, 134, 134);padding-left: 10px;font-weight: 400">${startDate}</span></p>
            <p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">部門職位 <span style="color: rgb(134, 134, 134);padding-left: 8px;font-weight: 400">${position}</span></p>
            <p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">直屬主管 <span style="color: rgb(134, 134, 134);padding-left: 8px;font-weight: 400">${dirSupervisor}</span></p>
            <p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">部門主管 <span style="color: rgb(134, 134, 134);padding-left: 8px;font-weight: 400">${supervisor}</span></p>
            <p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">工作地點 <span style="color: rgb(134, 134, 134);padding-left: 8px;font-weight: 400">${location}</span></p>
            <p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">聯絡分機 <span style="color: rgb(134, 134, 134);padding-left: 8px;font-weight: 400">${extension}</span></p>
            <p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">E-mail <span style="color: rgb(134, 134, 134);padding-left: 8px;font-weight: 400">${email}</span></p>
          </td>
        </tr>

      </table>
      <div style="border-top: 1px solid #e0e0e0; width: 100%; margin: 10px 0;"></div>
      <!-- intro start -->`;
  });
}
function selectAllInputs(e) {
  const allInputs = e.querySelectorAll('input, textarea');
  return allInputs;
}
function validateRequired(allInputs) {
  let isCompleted = true;
  allInputs.forEach((input) => {
    if (input.value.trim() === '') {
      error(input);
      isCompleted = false;
    }
  })
  return isCompleted;
}
function error(input) {
  input.style.border = '1px solid red';
}
function clearError(inputs) {
  inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      e.target.style.border = '1px solid #e0e0e0';
    })
  })


}

document.getElementById('formContainer').addEventListener('click', (e) => {
  if (e.target && e.target.id === 'btnUpdate') {
    updateAnnouncement();
    sendHTML();
  }
});

//----------------------//
// $5. isVisible sidebar
//----------------------//

const iconFold = document.querySelectorAll('.iconFold');

let isVisible = true;

iconFold.forEach((icon) => {
  icon.addEventListener('click', () => {
    isVisible = !isVisible;
    isVisibleSidebar(isVisible);
    console.log("sidebar:", isVisible);
  })
})

function isVisibleSidebar(isVisible) {
  const sidebar = document.querySelector('#sidebar');
  const sidebar2 = document.querySelector('#sidebar2');

  if (isVisible) {
    sidebar.style.display = 'block';
    sidebar2.style.display = 'none';

  } else {
    sidebar.style.display = 'none';
    sidebar2.style.display = 'block';
  }
}


//----------------------//
// $4. Save as sample
//----------------------//


//----------------------//
// $6. Annoucement types
//----------------------//


const announcementTypes = document.getElementById('announcementType');
const list = document.createElement('li');
const types = [
  {
    type: "新進成員公告",
    title: "新成員公告",
    description: "請於左側選擇模板，並上下對照填妥下列表格，可點選「更新」查看目前填入狀況；點選「寄出」會將該公告寄送到您填寫的信箱。",
    iframeSrc: "announcement-intro.html",
  },
  // {
  //   type: "測試",
  //   title: "測試公告",
  //   description: "請於左側選擇模板，並上下對照填妥下列表格，可點選「更新」查看目前填入狀況；點選「寄出」會將該公告寄送到您填寫的信箱。",
  //   iframeSrc: "assets/test.html",

  // },
  // {
  //   type: "測試用",
  //   title: "測試用title",
  //   description: "測試用description"
  //   iframeSrc: "assets/newMember.html",
  // }
];

types.forEach((type) => {
  const li = list.cloneNode();
  li.className = 'type';
  li.innerText = type.type;
  announcementTypes.appendChild(li);

})

selectedType = "";
document.querySelectorAll('.type').forEach((type) => {
  type.addEventListener('click', () => {
    showContent();
    selectedType = type.innerText;
    console.log("selectedType:", selectedType);
    renderTypeGreeting(selectedType);
    renderTypeForm(selectedType);
  })
})


function renderTypeGreeting(selectedType) {
  const type = types.find((type) => {
    return type.type === selectedType;
  })
  const typeTitle = document.getElementById('typeTitle');
  const typeDescription = document.getElementById('typeDescription');
  typeTitle.innerText = type.title;
  typeDescription.innerText = type.description;
  const iframe = document.getElementById('poster');
  iframe.src = type.iframeSrc;
  // console.log("iframe.src:: ", iframe.src);

}

const newMemberTemplate = `
            <div class="formGrid" id="step3">
              <div class="inputBox" style="grid-column: span 5">
                <label for="email">您的信箱</label>
                <input
                  type="email"
                  id="yourEmail"
                  placeholder="公告信件將發送至此信箱"
                />
              </div>
              <div class="inputBox" style="grid-column: span 12">
                <label for="greeting">主旨</label>
                <textarea id="greeting" rows="4"></textarea>
              </div>
            </div>
            <div style="grid-column: span 8"></div>
            <div class="diver" style="grid-column: span 12"></div>
            <div id="members">
              <div class="member formGrid" data-member-id="1">
                <div
                  style="
                    grid-column: span 12;
                    font-weight: 700;
                    font-size: 16px;
                  "
                >
                  <p style="display: inline-block">新成員(<span>1</span>)</p>
                </div>
                <div class="inputBox" style="grid-column: span 3">
                  <label for="name">姓名</label>
                  <input type="text" id="name-1" placeholder="姓名 Name" />
                </div>
                <div class="inputBox" style="grid-column: span 3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email-1"
                    placeholder="email@t3ex-thi.com"
                  />
                </div>
                <div class="inputBox" style="grid-column: span 2">
                  <label for="startDate">報到日</label>
                  <input type="date" id="startDate-1" />
                </div>
                <div class="inputBox" style="grid-column: span 2">
                  <label for="location">工作地點</label>
                  <input
                    type="text"
                    id="location-1"
                    placeholder="台北12樓辦公室"
                  />
                </div>
                <div class="inputBox" style="grid-column: span 2">
                  <label for="extension">聯絡分機</label>
                  <input type="text" id="extension-1" placeholder="000" />
                </div>
                <div class="inputBox" style="grid-column: span 4">
                  <label for="position">部門職位</label>
                  <input
                    type="text"
                    id="position-1"
                    placeholder="公司_組別_職務"
                  />
                </div>
                <div class="inputBox" style="grid-column: span 4">
                  <label for="supervisor">部門主管</label>
                  <input
                    type="text"
                    id="supervisor-1"
                    placeholder="名字（管轄範圍）"
                  />
                </div>
                <div class="inputBox" style="grid-column: span 4">
                  <label for="dirSupervisor">直屬主管</label>
                  <input
                    type="text"
                    id="dirSupervisor-1"
                    placeholder="名字（管轄範圍）"
                  />
                </div>
                <div class="inputBox" style="grid-column: span 12">
                  <label for="introduction">自我介紹</label>
                  <textarea
                    id="introduction-1"
                    rows="3"
                    placeholder="自我介紹區塊"
                  ></textarea>
                </div>
                <div class="inputBox" style="grid-column: span 4">
                  <label for="profile">圖片</label>
                  <input
                    type="file"
                    id="profile-1"
                    style="background: #ffffff"
                  />
                </div>
              </div>
              <!-- $2. Insert member's form -->
            </div>
            <button class="btnAddNewMember" id="btnAddNewMember">
              新增成員
            </button>

            <div class="btnGroup">
              <!-- $3. Update poster -->
              <button class="btnOutlineDefault" id="btnUpdate">更新公告</button>
              <button class="btnDefault" id="btnSend">寄出</button>
              <div
                style="display: flex; padding-bottom: 20px; align-items: center; margin-top: 15px"
              >
                  <input
                    type="checkbox"
                    id="save"
                    style="margin-top: 0px"
                  />
                  <label for="save" style="font-size: 14px; margin-left: 5px"
                    >寄出後將本次內容儲存為固定範本</label
                  >
              </div>
            </div>
`;
const textTemplate = `
Text Template`;
const testTemplate = `testTemplate`;

const formContainer = document.getElementById('formContainer');

function renderTypeForm(selectedType) {
  formContainer.innerHTML = '';
  if (selectedType === "新進成員公告") {
    formContainer.innerHTML = newMemberTemplate;
    resetPoster();
    updateItemStatus();
  }
}

function showContent() {
  showLoading();
  dragableContainer.style.display = 'flex';
  const selectSideMenu = document.getElementById('selectSideMenu');
  selectSideMenu.style.display = 'none';
}

function resetPoster() {
  const iframe = document.getElementById('poster');

  const currentSrc = iframe.src;
  iframe.src = '';
  iframe.src = currentSrc;

}


//----------------------//
// $7. Loading
//----------------------//


// function loadData() {
//   fetch('#')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       showToaster("資料讀取錯誤，請稍後再試或洽管理員", "error", 2000);
//     })
// }

showLoading();

function showLoading() {
  const loading = document.getElementById("loading");
  loading.style.display = "flex";
  setTimeout(() => {
    hideLoading();
  }, 500);
}

function hideLoading() {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
}

//----------------------//
// $99. Toaster
//----------------------//


const container = document.getElementById("toaster-container");

function showToaster(message, type = "info", duration = 3000) {
  const toaster = document.createElement('div');
  toaster.className = `toaster ${type}`;
  toaster.innerText = message;

  container.appendChild(toaster);

  setTimeout(() => {
    toaster.style.opacity = "0";
    setTimeout(() => container.removeChild(toaster), 300);
  }, duration);

}

// document.getElementById("btnUpdate").addEventListener("click", async () => {
// showToaster("公告已成功更新！", "info", 3000);
// showToaster("失敗！請洽管理員", "error", 3000);

// try {
//   const res = await fetch("...", { method: "POST" });
//   if (!res.ok) {
//     throw new Error(`HTTP error! status: ${res.status}`);
//   }
//   const data = await res.json();

//   if (data.success) {
//     showToaster("公告已成功更新！", "info", 3000);
//   } else {
//     showToaster("失敗！請洽管理員", "error", 3000);
//   }
// } catch (error) {
//   showToaster("失敗！請洽管理員", "error", 3000);
//   console.error(error);
// }

// });
