//----------------------//
// INDEX
//----------------------//
//
// $0. Poster
// $1. Resizer
// $2. Insert member's form
// $3. Update poster
// $4. Save as sample
//
//  $99. Toaster

//----------------------//
// $1. Resizer
//----------------------//
const resizer = document.querySelector('#dragTrigger');
const topPanel = document.querySelector('#topPanel');
const bottomPanel = document.querySelector('#bottomPanel');
const posterReview = document.querySelector('.posterReview');
const dragableContainer = document.querySelector('#dragableContainer');

let isDragging = false;
// console.log(isDragging);

resizer.addEventListener('mousedown', () => {
  isDragging = true;
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      // e.preventDefault();
      console.log(isDragging);
      const containerRect = dragableContainer.getBoundingClientRect();
      const newHeight = e.clientY - containerRect.top;

      const minHeight = 100;
      const maxHeight = containerRect.height - 100;
      const adjustedHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));


      topPanel.style.flex = `0 0 ${adjustedHeight}px`;
      bottomPanel.style.flex = `0 0 ${containerRect.height - adjustedHeight}px`;
      posterReview.style.height = `${adjustedHeight}px`;

    } else {
      isDragging = false;
    }
  });
});

document.addEventListener('mouseup', (e) => {
  if (isDragging) {
    isDragging = false;
  }
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
  
    <p style="grid-column: span 12; font-weight: 700; font-size: 16px">
      新成員(<span>${memberCount}</span>)
    </p>
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

  // isCompleted = (validateRequired(selectAllInputs(bottomPanel)));
  // clearError(selectAllInputs(bottomPanel));
  // console.log(isCompleted);

  if (isCompleted){
    container.innerHTML = '';
    const members = document.querySelectorAll('.member');
    container.insertAdjacentHTML('beforeend', membersForEach(members).join(''));
    // console.log(membersForEach(members));
      iframeDoc.querySelector('#greeting').innerText = greeting;
    } else{
      showToaster('請將表單填寫完整', 'error', 2000);
    }

  // console.log('update poster');
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

function selectAllInputs(e){
  const allInputs = e.querySelectorAll('input, textarea');
  return allInputs;
}

function validateRequired(allInputs) {
  let isCompleted = true;
  allInputs.forEach((input)=>{
    if(input.value.trim() === ''){
      error(input);
      isCompleted = false;
    }
  })
  return isCompleted;
}

function error(input) {
  input.style.border = '1px solid red';
}

function clearError(inputs){
  inputs.forEach((input)=>{
    input.addEventListener('input',(e)=>{
      e.target.style.border = '1px solid #e0e0e0';
    })
  })
 
  
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

document.getElementById("btnUpdate").addEventListener("click", async () => {
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

});
