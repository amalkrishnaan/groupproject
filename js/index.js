document.addEventListener('DOMContentLoaded', function () {
  loadStudents();
});

function loadStudents() {
  let students = JSON.parse(localStorage.getItem('students')) || [];
  const studentTableBody = document.getElementById('studentTableBody');
  studentTableBody.innerHTML = '';

  students.forEach(function (student, index) {
   
    let totalMarks = parseFloat(student.chemistry) + parseFloat(student.physics) + parseFloat(student.maths);
    let percentage = (totalMarks / 300) * 100;

    let percentageClass = percentage < 70 ? 'low' : 'high';

    let row = `<tr id="row-${index}">
      <td id="name-${index}">${student.name}</td>
      <td id="rollNumber-${index}">${student.rollNumber}</td>
      <td id="chemistry-${index}">${student.chemistry}</td>
      <td id="physics-${index}">${student.physics}</td>
      <td id="maths-${index}">${student.maths}</td>
      <td id="percentage-${index}" class="percentage ${percentageClass}">${percentage.toFixed(2)}%</td> <!-- New Column with conditional styling -->
      <td>
        <button class="btn btn-edit" id="edit-btn-${index}" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    studentTableBody.insertAdjacentHTML('beforeend', row);
  });
}

function searchStudents() {
  let input = document.getElementById('searchInput').value.toLowerCase();
  let rows = document.querySelectorAll('#studentTableBody tr');

  rows.forEach(function (row) {
    let nameCell = row.querySelector('td:nth-child(1)');
    let name = nameCell.textContent.toLowerCase();
    if (name.includes(input)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function editStudent(index) {
  let nameField = document.getElementById(`name-${index}`);
  let rollNumberField = document.getElementById(`rollNumber-${index}`);
  let chemistryField = document.getElementById(`chemistry-${index}`);
  let physicsField = document.getElementById(`physics-${index}`);
  let mathsField = document.getElementById(`maths-${index}`);

  nameField.innerHTML = `<input type="text" id="edit-name-${index}" value="${nameField.textContent}">`;
  rollNumberField.innerHTML = `<input type="number" id="edit-rollNumber-${index}" value="${rollNumberField.textContent}" readonly>`;
  chemistryField.innerHTML = `<input type="number" id="edit-chemistry-${index}" value="${chemistryField.textContent}">`;
  physicsField.innerHTML = `<input type="number" id="edit-physics-${index}" value="${physicsField.textContent}">`;
  mathsField.innerHTML = `<input type="number" id="edit-maths-${index}" value="${mathsField.textContent}">`;

  let editButton = document.getElementById(`edit-btn-${index}`);
  editButton.textContent = "Save";
  editButton.classList.remove('btn-edit');
  editButton.classList.add('btn-save');
  editButton.setAttribute('onclick', `saveStudent(${index})`);
}

function saveStudent(index) {
  let updatedName = document.getElementById(`edit-name-${index}`).value;
  let updatedChemistry = document.getElementById(`edit-chemistry-${index}`).value;
  let updatedPhysics = document.getElementById(`edit-physics-${index}`).value;
  let updatedMaths = document.getElementById(`edit-maths-${index}`).value;

  let students = JSON.parse(localStorage.getItem('students')) || [];

  students[index].name = updatedName;
  students[index].chemistry = updatedChemistry;
  students[index].physics = updatedPhysics;
  students[index].maths = updatedMaths;

  localStorage.setItem('students', JSON.stringify(students));

  loadStudents(); 
}

function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
  }
}