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
guideButton.addEventListener("click", startGuide);



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
  }
};

const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  isDragging = false;
  console.log("isDragging:", isDragging);
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
btnAddNewMember.addEventListener('click', () => {
  memberCount++;

  const member = document.createElement('div');
  member.className = 'member formGrid';
  member.setAttribute('data-member-id', memberCount)

  // member form template
  memberFormTemplate = `
  
     <div
      style="grid-column: span 12; font-weight: 700; font-size: 16px"
    >
      <p style="display: inline-block">
        新成員(<span>${memberCount}</span>)<svg
          onclick="deleteMember(event)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon delete"
          style="vertical-align: middle; width: 20px; height: 20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
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

  member.innerHTML = memberFormTemplate;
  members.appendChild(member);

})


function deleteMember(e) {
  e.target.closest('.member').remove();
}


//----------------------//
// $3. Update poster
//----------------------//


document.getElementById('btnUpdate').addEventListener('click', () => {

  let isCompleted = true;

  const iframe = document.getElementById('poster');
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  const container = iframeDoc.querySelector('#container');
  const bottomPanel = document.querySelector('#bottomPanel');
  const greeting = document.getElementById('greeting').value;

  isCompleted = (validateRequired(selectAllInputs(bottomPanel)));
  clearError(selectAllInputs(bottomPanel));
  console.log("isCompleted:", isCompleted);

  if (isCompleted) {
    container.innerHTML = '';
    const members = document.querySelectorAll('.member');
    container.insertAdjacentHTML('beforeend', membersForEach(members).join(''));
    // console.log(membersForEach(members));
    iframeDoc.querySelector('#greeting').innerText = greeting;
    showToaster('更新完成', 'info', 2000);
  } else {
    showToaster('表單未完成。', 'error', 2000);
  }

});

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
        style="padding: 0; margin: 0; margin-top: 10px"
        border="0"
        cellpadding="5"
        cellspacing="0"
      >
        <tr>
          <td>
            <img
              style="border-radius: 10px; width: 350px"
              src="assets/${imageName}"
              alt=""
            />
          </td>
          <td style="padding: 10px">
            <p style="font-size: 14px; font-weight: 500;">自我介紹 Self-Introduction</p>
            <p style="font-size: 20px; font-weight: 800;">${name}</p>
            <p style="font-size: 16px;">${introduction}</p>
            <div style="border-top: 1px solid #e0e0e0; width: 100%; margin: 10px 0;"></div>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">報到日期 <span style="color: rgb(134, 134, 134);">${startDate}</span></p>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">部門職位 <span style="color: rgb(134, 134, 134);">${position}</span></p>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">直屬主管 <span style="color: rgb(134, 134, 134);">${dirSupervisor}</span></p>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">部門主管 <span style="color: rgb(134, 134, 134);">${supervisor}</span></p>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">工作地點 <span style="color: rgb(134, 134, 134);">${location}</span></p>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">聯絡分機 <span style="color: rgb(134, 134, 134);">${extension}</span></p>
            <p style="color: rgb(66, 66, 66); font-weight: 700; font-size: 14px;">E-mail <span style="color: rgb(134, 134, 134);">${email}</span></p>
          </td>
        </tr>
      </table>
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

//----------------------//
// $5. isVisible sidebar
//----------------------//

const iconFold = document.querySelectorAll('.iconFold');

let isVisible = true;

iconFold.forEach((icon) => {
  icon.addEventListener('click', () => {
    isVisible = !isVisible;
    isVisibleSidebar(isVisible);
    console.log(isVisible);
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

// document.addEventListener('DOMContentLoaded', () => {
//   const greeting = document.getElementById('greeting');
//   const saveCheckbox = document.getElementById('save');
//   const btnUpdate = document.getElementById('btnUpdate');

//   const savedGreeting = getCookies('greeting');
//   if (savedGreeting) {
//     greeting.value = savedGreeting;
//   } else {
//     console.log('xxx');
//   }
//   btnUpdate.addEventListener('click', () => {
//     const currentGreeting = greeting.value;
//     if (saveCheckbox.checked) {
//       setCookies("greeting", savedGreeting, 30);
//       console.log(currentGreeting);
//     } else {
//       console.log('xxx');
//     }

//   })

// });

// function setCookies(name, value, days) {
//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = `expires=${date.toUTCString()}`
//   document.cookie = `${name}=${value};${expires};path=/`;
// }

// function getCookies(name) {
//   const nameEQ = `${name}=`;
//   const cookies = document.cookie.split(";"); 
//   for (let cookie of cookies) {
//     while (cookie.charAt(0) === " ") cookie = cookie.substring(1);
//     if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
//   }

// }




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
