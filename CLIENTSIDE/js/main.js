async function Display() {
const res= await fetch("http://localhost:3000/getdata");
    const donors=await res.json();
    str=``;
    donors.map((stdnt)=>{ 
        str+=`<tr>
                <td>${stdnt.Name}</td>
               <td>${stdnt.rollnumber}</td>
               <td>${stdnt.chem}</td>
               <td>${stdnt.phy}</td>
               <td>${stdnt.maths}</td>
               <td></td>
              <td>
        <button class="editbtn" onclick="handleEdit('${stdnt._id}')">Edit</button>
        <button class="deletebtn" onclick="handleDelete('${stdnt._id}')">Delete </button></td>
         </tr>
     `
 });
 document.getElementById("getting").innerHTML=str;
}

Display();

async function handleDelete(id){
    const res=await fetch("http://localhost:3000/delete",{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        "body":id
    });
    console.log(res);
    const data= await res.text();
    if(data=="success"){
        alert("successfully deleted")
        Display();
    }
    else{
        alert("Deletion Failed")
    }
}

async function handleEdit(id) {
    let name =document.getElementById(`name-${id}`);
    name.disabled=false;
    let rollnumber =document.getElementById(`rollnumber-${id}`);
    email.disabled=false;
    let chem =document.getElementById(`chem-${id}`);
    pno.disabled=false;
    let phy =document.getElementById(`phy-${id}`);
    bgrp.disabled=false;
    let maths =document.getElementById(`maths-${id}`);
    gender.disabled=false;
}