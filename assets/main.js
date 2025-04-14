//----------------------//
// INDEX
//----------------------//
//
// $0. Template and variables
// $1. Select model and render it
// $2. Insert a new member
// $3. Valid and update notice
// $4. Image upload
// $5. generate guid and file reader
// $6. Send email
// $7. Toaster
// $8. Logo
// $9. Menu
// $10. Save to LocalStorage
// $11. Save to localStorage - save drafts
//
//----------------------//

// ----------------------//
// $0. Template and variables
// ----------------------//

/* DOM elements and variables */
let noticeRenderedPart = document.querySelector('#noticeRenderedPart')
let menuContainer = document.querySelector('#menuContainer')
let selectedModel = ''
let models = document.querySelectorAll('.model')
// 新進成員
let memberCount = 1;

/* Models template */
const firstMemberTemplate = `
<div class="member pt-3" data-member-id="${memberCount}">
  <div class="title flex items-center gap-3 ">
    <div class="flex items-center gap-1 pb-3">
      <svg xmlns="http://www.w3.org/3000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
      <p class="w-fit font-semibold text-lg">新成員<span>${memberCount}</span></p>
      <div class="icon hover:bg-gray-100 p-1 rounded-full cursor-pointer"></div>
    </div>
  </div>
  <div class="form-grid grid grid-cols-12 gap-y-5 gap-x-2">
    <div class="inputBox flex-col flex gap-2 col-span-3">
      <label for="memberName${memberCount}" class="">成員姓名</label>
      <input type="text" id="memberName${memberCount}" placeholder="姓名Name" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-3">
      <label for="memberEmail${memberCount}">Email</label>
      <input type="text" id="memberEmail${memberCount}" placeholder="sample@t3ex-group.com" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-2">
      <label for="memberDate${memberCount}">報到日</label>
      <input type="date" id="memberDate${memberCount}" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-2">
      <label for="location${memberCount}">工作地點</label>
      <input type="text" id="location${memberCount}" placeholder="台北12樓辦公室" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-2">
      <label for="extension${memberCount}">聯絡分機</label>
      <input type="text" id="extension${memberCount}" placeholder="000" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-4">
      <label for="position${memberCount}">部門職位</label>
      <input type="text" id="position${memberCount}" placeholder="公司_組別_職務" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-4">
      <label for="supervisor${memberCount}">部門主管</label>
      <input type="text" id="supervisor${memberCount}" placeholder="名字（管轄範圍）" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-4">
      <label for="dirSupervisor${memberCount}">直屬主管</label>
      <input type="text" id="dirSupervisor${memberCount}" placeholder="名字（管轄範圍）" class="input-base" />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-12">
      <label for="memberIntro${memberCount}">自我介紹區塊</label>
      <textarea id="memberIntro${memberCount}" class="w-full input-base"></textarea>
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-12">
      <label for="memberImg${memberCount}">圖片上傳</label>
      <p class="text-sm -my-2 text-gray-400">檔案可為png, jpeg或jpg，檔案大小不超過2MB。</p>
      <input onchange="uploadFile(event)" type="file" id="memberImg${memberCount}" class="w-fit pt-3 text-sm" />
    </div>
  </div>
</div>
`

const newMemberModelTemplate = `
          <div class="form frame drop-shadow-sm h-fit bg-white p-10 rounded-lg">
            <div class="basicInfo flex flex-col gap-5">

              <div class="title">
                <p id="selectedModelTitle" class="text-2xl font-bold text-black/70 ">
                  新進成員公告模板
                </p>
                <p id="selectedModelDescription" class="text-sm text-black/50 pt-2">
                  請選擇模板，並填妥模板表格；點選「更新瀏覽圖」查看目前填入狀況；點選「寄出」會將該公告寄送到您填寫的信箱。
                </p>
              </div>

              <div class="diver"></div>
              
              <div class="title flex items-center gap-1">
                <svg xmlns="http://www.w3.org/3000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                </svg>
                <p class="font-bold text-xl">基本資料</p>
              </div>

              <div class="inputBox flex-col flex gap-2">
                <label for="yourEmail" class="">您的信箱</label>
                <input type="email" id="yourEmail" placeholder="公告信件將發送至此信箱" class="w-1/2 input-base" />
              </div>

              <div class="inputBox flex-col flex gap-2">
                <label for="greetingText" class="">公告主旨</label>
                <textarea id="greetingText" class="w-full input-base"></textarea>
              </div>

            </div>
            <div class="diver"></div>
            <div class="noticeInfo flex flex-col gap-0">
              <div class="title flex items-center mt-5 mb-2 gap-1">
                <svg xmlns="http://www.w3.org/3000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                  <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                </svg>
                <p class="font-bold text-xl ">公告內容</p>
              </div>
              <!-- $02.1 Template rendered part -->
              <div id="allMembers">
                <!-- member -->
                ${firstMemberTemplate}
              </div>
            </div>
              <!-- add btn -->
              <div class="my-5">
                <button onClick="addMembers()" id="addMemberBtn" class="border w-full border-gray-300 border-md border-dashed rounded-lg p-2 text-center text-md text-black/50 hover:bg-gray-100 transition-all">
                  新增成員
                </button>
              </div>
            <!---------- $03. btn group------------>
            <div class="btn pt-5 pb-3">
              <button onclick="updateNotice()" id="updateBtn" class="btn-outline">更新瀏覽圖</button>
              <button onclick="sendBtn()" id="sendBtn" class="btn-default">寄出</button>
            </div>
            <input type="checkbox" id="checkAll" checked />
            <label for="checkAll" class="text-black/50 text-sm pl-1">
                將內容儲存為草稿
            </label>
            <!-- --------------------------- -->
          </div>
`

const testModelTemplate = `
<div class="form frame drop-shadow-sm h-fit bg-white p-10 rounded-lg">
          <div class="basicInfo flex flex-col gap-5">
            <div class="title">
              <p id="selectedModelTitle" class="text-2xl font-bold text-black/70">
                測試模板
              </p>
              <p id="selectedModelDescription" class="text-sm text-black/50 pt-2">
                請於左側選擇模板，並上下對照填妥下列表格，點選「更新公告」查看目前填入狀況；點選「寄出」會將該公告寄送到您填寫的信箱。
              </p>
            </div>
          </div>
        </div>
`
const noticeModelTemplate = `<p> This is a notice model </p>`
const viewerTemplate = `<div class="mt-5 w-full h-fit bg-white p-10 rounded-lg"><p class="text-sm text-black/40">瀏覽區域</p></div>`

/* List */
let modelList = [
  {
    name: '新進成員公告模板',
    active: true,
    template: newMemberModelTemplate,
    viewer: viewerTemplate,
    bindingElement: bindingAddMemberElement
  },
  /**
  {
    name: '測試模板',
    active: true,
    template: testModelTemplate,
    viewer: viewerTemplate,
    bindingElement: ''
  },
  {
    name: '未啟用的模板',
    active: false,
    template: testModelTemplate,
    viewer: viewerTemplate,
  } */
]

// ----------------------//
// $1. Select model and render it
// ----------------------//

document.addEventListener('DOMContentLoaded', () => {
  const menuTemplate = renderMenu(modelList);
  menuContainer.innerHTML = menuTemplate;
  menuClicked();
})

function menuClicked() {
  const models = document.querySelectorAll('.model.model-active');
  models.forEach((model) => {
    model.addEventListener('click', () => {
      clearModel();
      selectModel(model);
      renderModel(selectedModel);
      loadDraftFromLocalStorage();
      const { addMemberBtn, sendBtn, allMembers, updateBtn, viewer } = bindingAddMemberElement();
    })
  })
}

/* Render menu */
function renderMenu(modelList) {
  return modelList
    .map(model => `
      <p
      ${model.active ? 'class="model model-active transition-all p-2 text-nowrap rounded-sm cursor-pointer hover:bg-gray-100"' : 'class="model transition-all text-nowrap rounded-sm p-2 rounded-sm" style="color: #9CA3AF;text-wrap: nowrap;width: 100%"'}
      >
        ${model.name}
      </p>
    `)
    .join('');
}

/* Select Model */
function selectModel(model) {
  showLoading();
  if (model.closest('.model-active')) {
    selectedModel = model.innerHTML.trim();
  }
}

/* Render model */
function renderModel(selectedModel) {
  const model = modelList.find(m => m.name === selectedModel);
  if (model) {
    noticeRenderedPart.innerHTML = model.template;
    viewer.innerHTML = model.viewer;
    model.bindingElement;
  } else {
    console.log('No matching model found');
  }
}

function clearModel() {
  noticeRenderedPart.innerHTML = `${viewerTemplate}`;
  viewer.innerHTML = `${viewerTemplate}`;
}

// ----------------------//
// $2. Insert a new member
// ----------------------//

/* Add and delete members */
function addMembers() {
  memberCount++;
  const newMemberTemplate = `
    <div class="member pt-3" data-member-id="${memberCount}">
      <div class="title flex items-center gap-3 pt-3">
        <div class="flex items-center gap-1 pb-3">
          <svg xmlns="http://www.w3.org/3000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
          <p class="w-fit font-semibold text-lg">新成員<span>${memberCount}</span></p>
          <div onclick="deleteMember(event)" class="icon hover:bg-gray-100 p-1 rounded-full cursor-pointer">
            <svg xmlns="http://www.w3.org/3000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ef4444" class="cursor-pointer">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="form-grid grid grid-cols-12 gap-y-5 gap-x-2">
        <div class="inputBox flex-col flex gap-2 col-span-3">
          <label for="memberName${memberCount}" class="">成員姓名</label>
          <input type="text" id="memberName${memberCount}" placeholder="姓名Name" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-3">
          <label for="memberEmail${memberCount}">Email</label>
          <input type="text" id="memberEmail${memberCount}" placeholder="sample@t3ex-group.com" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-2">
          <label for="memberDate${memberCount}">報到日</label>
          <input type="date" id="memberDate${memberCount}" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-2">
          <label for="location${memberCount}">工作地點</label>
          <input type="text" id="location${memberCount}" placeholder="台北12樓辦公室" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-2">
          <label for="extension${memberCount}">聯絡分機</label>
          <input type="text" id="extension${memberCount}" placeholder="000" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-4">
          <label for="position${memberCount}">部門職位</label>
          <input type="text" id="position${memberCount}" placeholder="公司_組別_職務" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-4">
          <label for="supervisor${memberCount}">部門主管</label>
          <input type="text" id="supervisor${memberCount}" placeholder="名字（管轄範圍）" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-4">
          <label for="dirSupervisor${memberCount}">直屬主管</label>
          <input type="text" id="dirSupervisor${memberCount}" placeholder="名字（管轄範圍）" class="input-base" />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-12">
          <label for="memberIntro${memberCount}">自我介紹區塊</label>
          <textarea id="memberIntro${memberCount}" class="w-full input-base"></textarea>
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-12">
          <label for="memberImg${memberCount}">圖片上傳</label>
          <p class="text-sm -my-2 text-gray-400">檔案可為png, jpeg或jpg，檔案大小不超過2MB，比例1:1為佳。</p>
          <input onchange="uploadFile(event)" type="file" id="memberImg${memberCount}" class="w-fit pt-3 text-sm" />
        </div>
      </div>
    </div>
  `
  allMembers.insertAdjacentHTML('beforeend', newMemberTemplate);
}

function deleteMember(e) {
  e.target.closest('.member').remove();
}

/* Binding elements */
function bindingAddMemberElement() {
  const addMemberBtn = document.querySelector('#addMemberBtn');
  const allMembers = document.querySelector('#allMembers');
  const updateBtn = document.querySelector('#updateBtn');
  const sendBtn = document.querySelector('#sendBtn');
  let viewer = document.querySelector('#viewer')
  viewer.classList.add('bg-white')
  return { addMemberBtn, sendBtn, allMembers, updateBtn, viewer }
}

// ----------------------//
// $3. Valid and update notice
// ----------------------//

/* MAIN ACTIONS */
sendedContent = ``;

function updateNotice() {
  let yourEmail = document.getElementById('yourEmail');
  let greetingText = document.getElementById('greetingText');
  let checkAll = document.getElementById('checkAll');

  if (validateInput(yourEmail) && validateInput(greetingText)) {

    showLoading();
    showToaster('更新完成！', 'info', 3000);
    const members = document.querySelectorAll('.member');
    const poster = renderPoster(members);
    viewer.innerHTML = '';
    viewer.appendChild(poster);
    sendedContent = poster;

    if (checkAll?.checked) {
      saveDraftToLocalStorage();
      showToaster('已儲存為草稿', 'info', 3000);

    } else {
      clearLocalStorage();
    }

    return true;
  } else {
    if (!validateInput(yourEmail)) {
      showToaster('請填寫您的Email', 'error', 3000);
    }
    if (!validateInput(greetingText)) {
      showToaster('請輸入公告主旨', 'error', 3000);
    }
    return false;
  }
}

/* Select all inputs */
function selectAllInputs() {
  const allInputs = document.querySelectorAll('input, textarea');
  return allInputs;
}

/* Validation */
function validateInput(input) {
  let isCompleted = true;
  if (input.value.trim() === '') {
    isCompleted = false;
    if (input.type == 'file') {
      let invalideInput = errorStyle(input);
      invalideInput.addEventListener('input', () => {
        input.style.border = '0px solid white';
        isCompleted = false;
      });
    } else {
      let invalideInput = errorStyle(input);
      invalideInput.addEventListener('input', () => {
        input.style.border = '0px solid white';
        isCompleted = false;
      });
    }
  }
  return isCompleted;
}

/* Error style */
function errorStyle(input) {
  input.style.border = '1px solid red';
  return input;
}

/* Update poster */
function renderPoster(members) {
  // Get greeting 
  const greeting = document.getElementById('greetingText').value;

  // Members
  const result = membersForEach(members).join('')
  const membersContainer = document.createElement('div');
  membersContainer.innerHTML = result;

  // Poster
  const poster = `
      <div>
        <table border="0" width="900" cellpadding="20" cellspacing="0">
          <thead>
            <tr>
              <td style="background-color: #f4f4f4"></td>
              <td style="background-color: #f4f4f4"></td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="background-color: #f4f4f4"></td>
              <td style="background-color: #fff">
                <img 
                width="850" height="auto"
                src="data:image/png;base64,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" alt="" />
              </td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4"></td>
              <td align="justify" style="background-color: #fff" width="850">
                <p id="greeting" style="font-family: '微軟正黑體', sans-serif; font-size: 20px; font-weight: 400; padding: 20px 20px; margin: 0; line-height: 32px;">
                  各位同仁，
                  我們誠摯歡迎下列新進同仁加入台驊集團，希望大家能給予他們溫暖的問候以及強而有力的幫助；在茶水間相遇時，不吝嗇與他們聊天，可分享你在台驊的經驗，讓他們感受到各位的熱情；中午用餐相遇時，可以邀請他們共進午餐唷！以下是他們的聯絡方式，趕緊邀約他們吧~
                </p>
              </td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4"></td>
              <td id="container" style="background-color: #fff">
                <!-- Update poster -->
              </td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style="padding-bottom: 100px; margin: 0; background-color: #f4f4f4;"></td>
              <td style="background-color: #f4f4f4"></td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
          </tbody>
        </table>
      </div>
  `
  const newMemberModelPoster = document.createElement('div');
  newMemberModelPoster.innerHTML = poster;

  const container = newMemberModelPoster.querySelector('#container');
  const greetingElement = newMemberModelPoster.querySelector('#greeting');
  container.appendChild(membersContainer);
  greetingElement.textContent = greeting;

  return newMemberModelPoster;
}

/* Member forEach */
function membersForEach(members) {
  return Array.from(members).map((member) => {
    const memberCount = member.getAttribute('data-member-id');
    const name = document.getElementById(`memberName${memberCount}`).value;
    const email = document.getElementById(`memberEmail${memberCount}`).value;
    const startDate = document.getElementById(`memberDate${memberCount}`).value;
    const position = document.getElementById(`position${memberCount}`).value;
    const dirSupervisor = document.getElementById(`dirSupervisor${memberCount}`).value;
    const supervisor = document.getElementById(`supervisor${memberCount}`).value;
    const location = document.getElementById(`location${memberCount}`).value;
    const extension = document.getElementById(`extension${memberCount}`).value;
    const introduction = document.getElementById(`memberIntro${memberCount}`).value;
    let imageSrc = document.getElementById(`memberImg${memberCount}`).src;
    // let imageSrc = document.getElementById(`memberImg${memberCount}`).src;
    let imageId = document.getElementById(`memberImg${memberCount}`).id;
    let dataGuid = document.getElementById(`memberImg${memberCount}`).getAttribute('data-guid');
    let fileType = document.getElementById(`memberImg${memberCount}`).getAttribute('data-filetype');
    let imageBase64 = document.getElementById(`memberImg${memberCount}`).getAttribute('data-filetype');
    return `
        <!-- intro start -->
        <table width="850" height="100%" style="font-family: '微軟正黑體', sans-serif;padding: 0; margin: 0; margin-top: 10px" border="0" cellpadding="5" cellspacing="0">
          <tr>
            <td width="400" valign="top" style="padding: 10px;background-color: #fff; text-align: center">
              <!-- 300x320 -->
              <img class="profileImg" width="450" height="auto" style="border-radius: 10px;margin-bottom: 30px" src="${imageSrc}" id="${imageId}" alt="" />
            </td>
            <td valign="top" height="auto">
              <table valign="top" height="100%" border="0" cellpadding="5" cellspacing="0">
                <tr>
                  <td valign="top" align="justify" width="450" style="padding: 20px; background-color: #fff";>
                    <p style="padding: 0; margin: 0; font-family: '微軟正黑體', sans-serif; font-size: 16px; font-weight: 500;">自我介紹 Self-Introduction</p>
                    <p style="padding: 0; margin: 0; margin-top: 10px; font-family: '微軟正黑體', sans-serif; font-size: 24px; font-weight: 800;">${name}</p>
                    <p style="padding: 0; margin: 0; margin-top: 10px; margin-bottom:10px; font-family: '微軟正黑體', sans-serif; font-size: 16px; line-height: 26px">${introduction}</p>

                  </td>
                </tr>
                <tr>
                  <td  valign="bottom" align="justify" width="450" style="display: table-cell; vertical-align: bottom; padding: 20px; background-color: #fff";>
                    ${ startDate ?
                      `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">到職日期 <span style="color: rgb(134, 134, 134); padding-left: 10px; font-weight: 400">${startDate}</span></p>` :
                      ''
                    }
                    ${ position ? `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">部門職位 <span style="color: rgb(134, 134, 134); padding-left: 8px; font-weight: 400">${position}</span></p>` :
                      ''
                    }
                    ${ dirSupervisor ? `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">直屬主管 <span style="color: rgb(134, 134, 134); padding-left: 8px; font-weight: 400">${dirSupervisor}</span></p>` :
                      ''
                    }
                    ${ supervisor ? `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">部門主管 <span style="color: rgb(134, 134, 134); padding-left: 8px; font-weight: 400">${supervisor}</span></p>` :
                      ''
                    }
                    ${ location ? `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">工作地點 <span style="color: rgb(134, 134, 134); padding-left: 8px; font-weight: 400">${location}</span></p>` :
                      ''
                    }
                    ${ extension ? `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">聯絡分機 <span style="color: rgb(134, 134, 134); padding-left: 8px; font-weight: 400">${extension}</span></p>` :
                      ''
                    }
                    ${ email ? `<p style="padding: 0; padding-bottom: 5px; margin: 0; font-family: '微軟正黑體', sans-serif; color: rgb(70,70,70); font-weight: 600; font-size: 16px;">E-mail <span style="color: rgb(134, 134, 134); padding-left: 8px; font-weight: 400">${email}</span></p>` :
                      ''
                    }
                    <p style="margin: 10px"></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr><td height="1" style="background-color:#cccccc; line-height:1px; font-size:1px;">&nbsp;</td></tr>
        </table>
        <!-- intro end -->`;
  });
}

// ----------------------//
// $4. Image upload
// ----------------------//

isValidateImg = false

/** */
function uploadFile(event) {
  const file = event.target.files[0];
  const isValidateImg = checkFiles(file);
  const imgElement = document.getElementById(event.target.id);

  if (isValidateImg) {
    // 壓縮後再設定到 img
    compressImage(file, 450)
      .then((base64Data) => {
        // 顯示壓縮後的圖片
        imgElement.src = base64Data;

        // 取檔名副檔名
        const fileType = file.name.split('.').pop();
        // 自訂 data-* 屬性
        imgElement.dataset.filetype = fileType;
        imgElement.dataset.srcBase64 = base64Data;

        console.log('壓縮後的 Base64：', base64Data);
      })
      .catch((error) => {
        console.error('圖片壓縮失敗：', error);
      });
  }

  // if (isValidateImg) {
  //   // const guid = _generateGuid();
  //   // fileReader(file).then((res) => {
  //   //   img.src = res;
  //   // });
  //   const img = document.getElementById(event.target.id);
  //   fileReader(file).then(base64Data => {
  //     img.src = base64Data;

  //     console.log('img.src', img.src);
  //     const fileType = file.name.split('.').pop();
  //     img.dataset.filetype = fileType;
  //     img.dataset.srcBase64 = img.src;
  //   });
  //   // img.dataset.guid = guid;
  //   // sendToServer(file, guid);
  // }
}

function checkFiles(file) {
  if (file) {
    const fileType = file.name.split('.').pop();
    const fileSize = file.size;
    let isValidateFile = true;
    if (fileSize > 3000000) {
      showToaster("檔案須小於2mb", "error", 3000);
      isValidateFile = false;
    }
    if (fileType !== 'jpeg' && fileType !== 'png' && fileType !== 'jpg' && fileType !== 'PNG' && fileType !== 'JPEG' && fileType !== 'JPG') {
      showToaster("檔案僅接受jpg, png, jpeg格式", "error", 3000);
      isValidateFile = false;
    } else {
      return isValidateFile;
    }
    return isValidateFile;
  }
};
/**
function sendToServer(file, guid) {
  console.log('準備上傳:', file, guid);
  const formdata = new FormData();
  formdata.append('guid', guid);
  formdata.append('File', file);


  fetch('https://netapi-test.t3ex-group.com/api/Announcement/file', {
    method: 'POST',
    body: formdata,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      console.log('上傳成功:', res);
      showToaster('上傳成功', 'info', 3000);
    })
    .catch((error) => {
      console.error('上傳失敗:', error);

      // http status code
      let statusCode = error.message.match(/\d+/) ? parseInt(error.message.match(/\d+/)[0]) : null;

      if (statusCode === 400 || statusCode === 415) {
        showToaster('格式錯誤', 'error', 3000);
      } else if (statusCode === 500 || statusCode === 502 || statusCode === 503 || statusCode === 504) {
        showToaster('伺服器錯誤，請聯絡管理人員', 'error', 3000);
      } else {
        showToaster('圖片上傳伺服器失敗，請稍後再試', 'error', 3000);
      }
    });
}

 */


//----------------------//
// $5. generate guid and file reader, compress img
//----------------------//

function _generateGuid() {
  var date = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    date += performance.now();
  }
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function fileReader(file) {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.onerror = function () {
        reject(new Error("error"));
      };
      reader.readAsDataURL(file);
    } else {
      reject(new Error("No file"));
    }
  });
}

// compress image
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 設定縮小後的固定寬度
        const targetWidth = 450;
        const aspectRatio = img.height / img.width;
        const targetHeight = targetWidth * aspectRatio;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(function (blob) {
          if (blob) {
            const webpFile = new File([blob], "converted.webp", { type: "image/webp" });
            const preview = document.getElementById('preview');
            if (preview) {
              preview.src = URL.createObjectURL(webpFile);
              preview.style.display = "block";
            }
            resolve(webpFile);
          } else {
            reject(new Error("圖片轉換失敗"));
          }
        }, 'image/webp', 0.8);
      };
    };
    reader.onerror = (error) => reject(error);
  });
}

function compressImage(file, widthFixed) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 固定寬度，依照原圖比例計算高度
        const targetWidth = widthFixed;
        const aspectRatio = img.height / img.width;
        const targetHeight = targetWidth * aspectRatio;

        // 設定 canvas 尺寸
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 將圖片繪製到 canvas（等比縮放）
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // 將 canvas 轉為 Base64
        // 第二個參數 (0~1) 表示壓縮品質，0.8 代表 80% 品質
        // 若不想壓縮可改成 1，或使用 'image/png' 。
        const newBase64 = canvas.toDataURL('image/jpeg', 0.8);

        resolve(newBase64);
      };

      img.onerror = function (err) {
        reject(err);
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

// ----------------------//
// $6. Send email
// ----------------------//

const sendenTemplateStart = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Announcement</title>
  </head>
  <body>`
const sendenTemplateEnd = `  </body>
      </html>`

function sendBtn() {
  if (validateInput(yourEmail) && validateInput(greetingText)) {
    const imgs = sendedContent.querySelectorAll('.profileImg');
    imgs.forEach(img => {
      const guid = img.getAttribute('data-guid');
      const fileType = img.getAttribute('data-filetype');
      // const newSrc = `https://netapi-test.t3ex-group.com/uploads/announcement/newEmployee/${guid}.${fileType}`
      // img.src = newSrc;
      // console.log('newSrc', newSrc);
    })
    const fullTemplate = `${sendenTemplateStart}${sendedContent.outerHTML}${sendenTemplateEnd}`;
    const email = document.getElementById('yourEmail').value;
    updateNotice()
    sendToEmail(email, fullTemplate)
    console.log('sendBtn', email, fullTemplate);
  } else {
    showToaster('請填寫完整資料', 'error', 3000);
  }
}

function sendToEmail(email, fullTemplate) {
  const raw = JSON.stringify({
    "Email": email,
    "HtmlBody": fullTemplate
  })
  console.log('raw:', raw);
  fetch('https://netapi-test.t3ex-group.com/api/Announcement/email', {
    method: 'POST',
    body: raw,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      showToaster('寄送成功!!', 'info', 3000);
      console.log('寄送成功!!', res)
    })
    .catch((error) => {
      console.error('寄送失敗QQ', error);

      // http status code
      let statusCode = error.message.match(/\d+/) ? parseInt(error.message.match(/\d+/)[0]) : null;
      if (statusCode === 400 || statusCode === 415) {
        showToaster('格式錯誤', 'error', 3000);
      } else if (statusCode === 500 || statusCode === 502 || statusCode === 503 || statusCode === 504) {
        showToaster('伺服器錯誤，請聯絡管理人員', 'error', 3000);
      } else {
        showToaster('寄送失敗，請稍後再試', 'error', 3000);
      }


    });
}

// ----------------------//
// $7. Toaster
// ----------------------//

const container = document.getElementById("toaster-container");

function showToaster(message, type = "info") {
  const container = document.getElementById("toaster-container");
  if (!container) return;
  const toaster = document.createElement("div");
  toaster.className = `toaster ${type} toaster-show`;
  toaster.textContent = message;
  container.appendChild(toaster);
  setTimeout(() => {
    toaster.classList.add("toaster-hide");
    setTimeout(() => {
      toaster.remove();
    }, 500);
  }, 3000);
}

// ----------------------//
// $8. Logo
// ----------------------//

const logo = document.getElementById('logo');
logo.classList.add('cursor-pointer');
logo.addEventListener('click', () => {
  window.location.reload();
  window.scrollTo(0, 0);
})

// ----------------------//
// $9. Loading
// ----------------------//

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

// ----------------------//
// $9. Menu
// ----------------------//

const menu = document.getElementById('menu');
menu.addEventListener('click', (event) => {
  event.stopPropagation();
  menuContainer.classList.toggle('hidden');
});
menuContainer.addEventListener('click', () => {
  menuContainer.classList.add('hidden');
});
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuContainer.contains(event.target)) {
    menuContainer.classList.add('hidden');
  }
});

// ----------------------//
// $10. Save to LocalStorage
// ----------------------//


// ----------------------//
// $11. Save to localStorage - save drafts
// ----------------------//

// function saveDraftBtnClicked() {
//   if (updateNotice()) {
//     saveDraftToLocalStorage();
//     showToaster('儲存成功', 'info', 3000);
//   } else {
//     showToaster('儲存失敗，請再試一次', 'error', 3000);
//   }
// }

// save draft to localStorage
function saveDraftToLocalStorage() {
  let members = [];
  let yourEmail = document.getElementById('yourEmail');
  let greetingText = document.getElementById('greetingText');
  document.querySelectorAll('.member').forEach(member => {
    let memberId = member.getAttribute('data-member-id');
    let data = {
      name: document.getElementById(`memberName${memberId}`).value,
      email: document.getElementById(`memberEmail${memberId}`).value,
      date: document.getElementById(`memberDate${memberId}`).value,
      location: document.getElementById(`location${memberId}`).value,
      extension: document.getElementById(`extension${memberId}`).value,
      position: document.getElementById(`position${memberId}`).value,
      supervisor: document.getElementById(`supervisor${memberId}`).value,
      dirSupervisor: document.getElementById(`dirSupervisor${memberId}`).value,
      intro: document.getElementById(`memberIntro${memberId}`).value
    };
    members.push(data);
  });
  localStorage.setItem('draftMembers', JSON.stringify(members));
  // 同時將 Email 和 公告主旨存入草稿
  localStorage.setItem('draftEmail', yourEmail.value);
  localStorage.setItem('draftGreeting', greetingText.value);
}

// load drafts from localStorage
function loadDraftFromLocalStorage() {
  let members = JSON.parse(localStorage.getItem('draftMembers') || '[]');
  members.forEach((data, index) => {
    if (index > 0) addMembers();
    let memberId = index + 1;
    document.getElementById(`memberName${memberId}`).value = data.name;
    document.getElementById(`memberEmail${memberId}`).value = data.email;
    document.getElementById(`memberDate${memberId}`).value = data.date;
    document.getElementById(`location${memberId}`).value = data.location;
    document.getElementById(`extension${memberId}`).value = data.extension;
    document.getElementById(`position${memberId}`).value = data.position;
    document.getElementById(`supervisor${memberId}`).value = data.supervisor;
    document.getElementById(`dirSupervisor${memberId}`).value = data.dirSupervisor;
    document.getElementById(`memberIntro${memberId}`).value = data.intro;
  });
  // 載入草稿時，同步填入 Email 和 公告主旨欄位
  const savedEmail = localStorage.getItem('draftEmail') || '';
  const savedGreeting = localStorage.getItem('draftGreeting') || '';
  if (document.getElementById('yourEmail')) {
    document.getElementById('yourEmail').value = savedEmail;
  }
  if (document.getElementById('greetingText')) {
    document.getElementById('greetingText').value = savedGreeting;
  }

}


// Clean local storagee
function clearLocalStorage() {
  localStorage.removeItem('draftMembers');
  localStorage.removeItem('draftEmail');
  localStorage.removeItem('draftGreeting');
}

