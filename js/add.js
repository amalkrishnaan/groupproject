document.getElementById('addStudentForm').addEventListener('submit', function (event) {
  event.preventDefault();

  let studentName = document.getElementById('studentName').value;
  let rollNumber = document.getElementById('rollNumber').value;
  let chemistryMarks = document.getElementById('chemistryMarks').value;
  let physicsMarks = document.getElementById('physicsMarks').value;
  let mathsMarks = document.getElementById('mathsMarks').value;

  let students = JSON.parse(localStorage.getItem('students')) || [];

  let studentExists = students.some(student => student.rollNumber === rollNumber);

  if (studentExists) {
    document.getElementById('notificationBar').style.display = 'block';
  } else {
    students.push({ name: studentName, rollNumber, chemistry: chemistryMarks, physics: physicsMarks, maths: mathsMarks });
    localStorage.setItem('students', JSON.stringify(students));

    window.location.href = '../index.html';
  }
});