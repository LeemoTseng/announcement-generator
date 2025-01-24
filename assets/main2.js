//----------------------//
// INDEX
//----------------------//
//
// $0. Template and variables
// $1. Select model and render it
// $2. Insert a new member
// $3. Update notice
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
let firstMemberTemplate = `
<div class="member pt-8" data-member-id="${memberCount}">
  <div class="title flex items-center gap-3 pb-3">
    <div class="flex items-center gap-1 pb-3">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
      <p class="w-fit font-semibold text-lg">新成員<span>${memberCount}</span></p>
      <div
        style="cursor: pointer"
        class="icon hover:bg-gray-100 p-1 rounded-full cursor-pointer"
      >
      </div>
    </div>
  </div>
  <div class="form-grid grid grid-cols-12 gap-y-5 gap-x-2">
    <div class="inputBox flex-col flex gap-2 col-span-3">
      <label for="memberName${memberCount}" class="">成員姓名</label>
      <input
        type="text"
        id="memberName${memberCount}"
        placeholder="姓名Name"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-3">
      <label for="memberEmail${memberCount}">Email</label>
      <input
        type="text"
        id="memberEmail${memberCount}"
        placeholder="sample@t3ex-group.com"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-2">
      <label for="memberDate${memberCount}">報到日</label>
      <input
        type="date"
        id="memberDate${memberCount}"
        placeholder=""
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-2">
      <label for="location${memberCount}">工作地點</label>
      <input
        type="text"
        id="location${memberCount}"
        placeholder="台北12樓辦公室"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-2">
      <label for="extension${memberCount}">聯絡分機</label>
      <input
        type="text"
        id="extension${memberCount}"
        placeholder="000"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-4">
      <label for="position${memberCount}">部門職位</label>
      <input
        type="text"
        id="position${memberCount}"
        placeholder="公司_組別_職務"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-4">
      <label for="supervisor${memberCount}">部門主管</label>
      <input
        type="text"
        id="supervisor${memberCount}"
        placeholder="名字（管轄範圍）"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-4">
      <label for="dirSupervisor${memberCount}">直屬主管</label>
      <input
        type="text"
        id="dirSupervisor${memberCount}"
        placeholder="名字（管轄範圍）"
        class="input-base"
      />
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-12">
      <label for="memberIntro${memberCount}">自我介紹區塊</label>
      <textarea
        name=""
        id="memberIntro${memberCount}"
        class="w-full input-base"
      ></textarea>
    </div>
    <div class="inputBox flex-col flex gap-2 col-span-12">
      <label for="memberImg${memberCount}">圖片上傳</label>
      <p class="text-sm -my-2 text-gray-400">
        檔案可為png, jpeg或jpg，檔案大小不超過2MB，比例1:1為佳。
      </p>
      <input type="file" id="memberImg${memberCount}" class="w-fit pt-3 text-sm" />
    </div>
  </div>
</div>
`
const newMemberModelTemplate = `
          <div class="form frame drop-shadow-sm  h-fit bg-white p-10 rounded-lg">
            <div class="basicInfo flex flex-col gap-5">

              <div class="title">
                <p id="selectedModelTitle"
                  class="text-2xl font-bold text-black/70 ">
                  新進成員公告模板
                </p>
                <p
                  id="selectedModelDescription"
                  class="text-sm text-black/50 pt-2"
                >
                  請於左側選擇模板，並上下對照填妥下列表格，點選「更新公告」查看目前填入狀況；點選「寄出」會將該公告寄送到您填寫的信箱。
                </p>
              </div>

              <div class="diver"></div>
              
              <div class="title flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path
                    d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                  />
                </svg>
                <p class="font-bold text-xl">基本資料</p>
              </div>

              <div class="inputBox flex-col flex gap-2">
                <label for="yourEmail" class="">您的信箱</label>
                <input
                  type="email"
                  id="yourEmail"
                  placeholder="公告信件將發送至此信箱"
                  class="w-1/2 input-base"
                />
                <div class="check pl-2 flex items-center">
                  <input type="checkbox" id="checkEmail" />
                  <label for="checkEmail" class="text-black/50 text-sm pl-1">
                    儲存此Email
                  </label>
                </div>
              </div>

              <div class="inputBox flex-col flex gap-2">
                <label for="greetingText" class="">公告主旨</label>
                <textarea name="" id="greetingText" class="w-full input-base"></textarea>
                <div class="check pl-2 flex items-center">
                  <input type="checkbox" id="check" />
                  <label for="check" class="text-black/50 text-sm pl-1">
                    寄出後暫存此公告主旨
                  </label>
                </div>
              </div>

            </div>
            <div class="diver"></div>
            <div class="noticeInfo flex flex-col gap-0">
              <div class="title flex items-center pt-3 gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path
                    d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"
                  />
                </svg>
                <p class="font-bold text-xl">公告內容</p>
              </div>
              <!-- $02.1 Template rendered part -->
              <div id="allMembers">
                <!-- member -->
                ${firstMemberTemplate}

              </div>
            </div>
              <!-- add btn -->
                <div class="my-5">
                  <button
                    onClick="addMembers()"
                    id="addMemberBtn"
                    class="border w-full border-gray-300 border-md border-dashed rounded-lg p-2 text-center text-md text-black/50 hover:bg-gray-100 transition-all"
                  >
                    新增成員
                  </button>
                </div>
            <!---------- $03. btn group------------>
            <div class="btn pt-5">
              <button onclick="updateNotice()" id="updateBtn" class="btn-outline">更新瀏覽圖</button>
              <button onclick="" id="sendBtn" class="btn-default">寄出</button>
            </div>
            <!-- --------------------------- -->
          </div>
          
          
          `
const testModelTemplate = `
<div class="form frame drop-shadow-sm h-fit bg-white p-10 rounded-lg">
          <div class="basicInfo flex flex-col gap-5">
            <div class="title">
              <p
                id="selectedModelTitle"
                class="text-2xl font-bold text-black/70"
              >
                測試模板
              </p>
              <p
                id="selectedModelDescription"
                class="text-sm text-black/50 pt-2"
              >
                請於左側選擇模板，並上下對照填妥下列表格，點選「更新公告」查看目前填入狀況；點選「寄出」會將該公告寄送到您填寫的信箱。
              </p>
            </div>
          </div>
        </div>
`
const noticeModelTemplate = `<p> This is a notice model </p>`
const viewerTemplate = ``


/* List */
let modelList = [
  {
    name: '新進成員公告模板',
    active: true,
    template: newMemberModelTemplate,
    viewer: viewerTemplate,
    bindingElement: bindingAddMemberElement
  },
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
  }
]

// ----------------------//
// $1. Select model and render it
// ----------------------//


/* MAIN ACTIONS */

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
      bindingAddMemberElement();
    })
  })
}

/* Render menu */
function renderMenu(modelList) {
  return modelList
    .map(model =>`
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
  noticeRenderedPart.innerHTML = '';
  viewer.innerHTML = '';
}

// ----------------------//
// $2. Insert a new member
// ----------------------//


/* MAIN ACTIONS */

/* Add and  delete members */
function addMembers() {
  memberCount++;
  const newMemberTemplate = `
    <div class="member pt-8" data-member-id="${memberCount}">
      <div class="title flex items-center gap-3 pb-3">
        <div class="flex items-center gap-1 pb-3">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>
          <p class="w-fit font-semibold text-lg">新成員<span>${memberCount}</span></p>
          <div
            onclick="deleteMember(event)"
            class="icon hover:bg-gray-100 p-1 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ef4444"
              class="cursor-pointer"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="form-grid grid grid-cols-12 gap-y-5 gap-x-2">
        <div class="inputBox flex-col flex gap-2 col-span-3">
          <label for="memberName${memberCount}" class="">成員姓名</label>
          <input
            type="text"
            id="memberName${memberCount}"
            placeholder="姓名Name"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-3">
          <label for="memberEmail${memberCount}">Email</label>
          <input
            type="text"
            id="memberEmail${memberCount}"
            placeholder="sample@t3ex-group.com"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-2">
          <label for="memberDate${memberCount}">報到日</label>
          <input
            type="date"
            id="memberDate${memberCount}"
            placeholder=""
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-2">
          <label for="location${memberCount}">工作地點</label>
          <input
            type="text"
            id="location${memberCount}"
            placeholder="台北12樓辦公室"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-2">
          <label for="extension${memberCount}">聯絡分機</label>
          <input
            type="text"
            id="extension${memberCount}"
            placeholder="000"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-4">
          <label for="position${memberCount}">部門職位</label>
          <input
            type="text"
            id="position${memberCount}"
            placeholder="公司_組別_職務"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-4">
          <label for="supervisor${memberCount}">部門主管</label>
          <input
            type="text"
            id="supervisor${memberCount}"
            placeholder="名字（管轄範圍）"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-4">
          <label for="dirSupervisor${memberCount}">直屬主管</label>
          <input
            type="text"
            id="dirSupervisor${memberCount}"
            placeholder="名字（管轄範圍）"
            class="input-base"
          />
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-12">
          <label for="memberIntro${memberCount}">自我介紹區塊</label>
          <textarea
            name=""
            id="memberIntro${memberCount}"
            class="w-full input-base"
          ></textarea>
        </div>
        <div class="inputBox flex-col flex gap-2 col-span-12">
          <label for="memberImg${memberCount}">圖片上傳</label>
          <p class="text-sm -my-2 text-gray-400">
            檔案可為png, jpeg或jpg，檔案大小不超過2MB，比例1:1為佳。
          </p>
          <input type="file" id="memberImg${memberCount}" class="w-fit pt-3 text-sm" />
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

  return { addMemberBtn, allMembers, updateBtn, sendBtn, viewer }
}

// ----------------------//
// $3. Valid and update notice
// ----------------------//

/* MAIN ACTIONS */

let isCompleted = false;

function updateNotice() {
  const allInputs = selectAllInputs();
  validateInput(allInputs);
  // if (isCompleted){
  const members = document.querySelectorAll('.member')
  const poster = renderPoster(members);
  console.log('poster',poster);
  viewer.innerHTML = '';
  viewer.appendChild(poster);
  console.log('viewer', viewer);
  // }
}

/* Select all inputs */
function selectAllInputs() {
  const allInputs = document.querySelectorAll('input, textarea');
  return allInputs;

}

/* Validation */
function validateInput(allInputs) {
  allInputs.forEach(input => {
    if (input.value === '') {
      let invalideInput = errorStyle(input);
      invalideInput.addEventListener('input', () => {
        input.style.border = '0px solid white';
      })
      return isCompleted = false;
    } else {
      return isCompleted = true;
    }
  })
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
                  src="https://material.t3ex-group.com/announcement/header.png"
                  alt=""
                />
              </td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
            <tr>
              <td style="background-color: #f4f4f4"></td>
              <td style="background-color: #fff" width="850">
                <p
                  id="greeting"
                  style="
                    font-family: '微軟正黑體', sans-serif;
                    font-size: 20px;
                    font-weight: 400;
                    padding: 10px 10px;
                    margin: 0;
                    line-height: 32px;
                  "
                >
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
                <!-- Update poster -->
                <!-- Update poster -->
                <!-- Update poster -->
                <!-- Update poster -->
              </td>
              <td style="background-color: #f4f4f4"></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td
                style="
                  padding-bottom: 100px;
                  margin: 0;
                  background-color: #f4f4f4;
                "
              ></td>
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
    // let imageSrc = document.getElementById(`memberImg${memberCount}`).dataset.guid;
    let imageSrc = '';
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
                src="${imageSrc}"
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
        <!-- intro end -->`;
  })
}








