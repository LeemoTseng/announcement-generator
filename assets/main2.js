//----------------------//
// INDEX
//----------------------//
//
// $0. template
// $1. Select model and render it
//
//
//
//
//----------------------//


// ----------------------//
// $0. template
// ----------------------//


/* models template */
const newMemberModelTemplate = `
          <div class="form frame drop-shadow-sm  h-fit bg-white p-10 rounded-lg">
            <div class="basicInfo flex flex-col gap-5">
              <div class="title">
                <p
                  id="selectedModelTitle"
                  class="text-2xl font-bold text-black/70"
                >
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
                <label for="email" class="">您的信箱</label>
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
                <label for="email" class="">公告主旨</label>
                <textarea name="" id="" class="w-full input-base"></textarea>
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
                <div class="member pt-8">
                  <div class="title flex items-center gap-3 pb-3">
                    <p class="w-fit font-semibold text-lg">新成員(1)</p>
                    <div
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
                  <div class="form-grid grid grid-cols-12 gap-y-5 gap-x-2">
                    <div class="inputBox flex-col flex gap-2 col-span-3">
                      <label for="email" class="">成員姓名</label>
                      <input
                        type="text"
                        id=""
                        placeholder="姓名Name"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-3">
                      <label for="">Email</label>
                      <input
                        type="text"
                        id=""
                        placeholder="sample@t3ex-group.com"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-2">
                      <label for="">報到日</label>
                      <input
                        type="date"
                        id=""
                        placeholder=""
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-2">
                      <label for="">工作地點</label>
                      <input
                        type="text"
                        id=""
                        placeholder="台北12樓辦公室"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-2">
                      <label for="">聯絡分機</label>
                      <input
                        type="text"
                        id=""
                        placeholder="000"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-4">
                      <label for="">部門職位</label>
                      <input
                        type="text"
                        id=""
                        placeholder="公司_組別_職務"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-4">
                      <label for="">部門主管</label>
                      <input
                        type="text"
                        id=""
                        placeholder="名字（管轄範圍）"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-4">
                      <label for="">直屬主管</label>
                      <input
                        type="text"
                        id=""
                        placeholder="名字（管轄範圍）"
                        class="input-base"
                      />
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-12">
                      <label for="">自我介紹區塊</label>
                      <textarea
                        name=""
                        id=""
                        class="w-full input-base"
                      ></textarea>
                    </div>
                    <div class="inputBox flex-col flex gap-2 col-span-12">
                      <label for="">圖片上傳</label>
                      <p class="text-sm -my-2 text-gray-400">
                        檔案可為png, jpeg或jpg，檔案大小不超過2MB
                      </p>
                      <input type="file" id="" class="w-fit pt-3 text-sm" />
                    </div>
                  </div>
                </div>
                <!-- add btn -->
                <div class="my-5">
                  <button
                    class="border w-full border-gray-300 border-md border-dashed rounded-lg p-2 text-center text-md text-black/50 hover:bg-gray-100 transition-all"
                  >
                    新增成員
                  </button>
                </div>
              </div>
            </div>
              <!---------- $03. btn group------------>
            <div class="btn pt-5">
              <button class="btn-outline">更新瀏覽圖</button>
              <button class="btn-default">寄出</button>
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
const viewerTemplate = `
    <div class="drop-shadow-sm mt-5 w-full h-fit bg-white p-10 rounded-lg">
      <div class="title flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-480H200v480Zm80-280v-80h400v80H280Zm0 160v-80h240v80H280Z"/></svg>
        <p class="font-bold text-xl">瀏覽圖</p>
      </div>
      <div
        class="img w-[800px] h-[800px] border border-red-500 mx-auto"
      ></div>
    </div>
`

// ----------------------//
// $1. Select model and render it
// ----------------------//


/* DOM elements and variables */
let noticeRenderedPart = document.querySelector('#noticeRenderedPart')

let menuContainer = document.querySelector('#menuContainer')
let selectedModel = ''

let models = document.querySelectorAll('.model')
let modelList = [
  {
    name: '新進成員公告模板',
    active: true,
    template: newMemberModelTemplate,
    viewer: viewerTemplate
  },
  {
    name: '測試模板',
    active: true,
    template: testModelTemplate,
    viewer: viewerTemplate
  },
  {
    name: '未啟用的模板',
    active: false,
    template: testModelTemplate,
    viewer: viewerTemplate
  }
]

/* MAIN ACTIONS */

document.addEventListener('DOMContentLoaded', () => {
  const menuTemplate = renderMenu(modelList);
  menuContainer.innerHTML = menuTemplate;
  menuClicked();
})

function menuClicked() {
  clearModel();
  const models = document.querySelectorAll('.model');
  models.forEach((model) => {
    model.addEventListener('click', () => {
      selectModel(model);
      renderModel(selectedModel);
    })
  })
}

/* Render menu */
function renderMenu(modelList) {
  return modelList
    // .filter(model => model.active)
    .map(model => `
      <p
      ${model.active ? 'class="model model-active transition-all p-2 text-nowrap rounded-sm  cursor-pointer hover:bg-gray-100"' : 'class="model transition-all text-nowrap rounded-sm p-2 rounded-sm text-black/40"'}
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

  } else {
    console.log('No matching model found');
  }
}

function clearModel() {
  noticeRenderedPart.innerHTML = '';
  viewer.innerHTML = '';
}









