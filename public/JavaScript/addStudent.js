document.querySelectorAll(".course-option").forEach((item)=>{
    item.addEventListener("click",(e)=>{
        e.preventDefault();
        const text = item.textContent;
        const dropdownBtn = document.getElementById("dropdownBtn");
        const cid = item.getAttribute("data-id");
        dropdownBtn.textContent = text;
        dropdownBtn.value = text;
        document.getElementById("courseid").value= parseInt(cid);
    });
});
setTimeout(() => {
    const alertbox = document.getElementById("alert");
    if (alertbox) {
        alertbox.style.display = "none";
    }
}, 2000);

// form validaion
let nameValidate=(input)=>{
    let name = input.value.trim();
    let nameRegex = /^[A-Z][a-zA-Z\s_]*$/;
    let check = nameRegex.test(name);

    input.style.color = check?"gray":"red";
    input.style.borderColor = check?"black":"red";

    if(!check){
        input.style.boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.5)";
        setTimeout(()=>{
            input.style.borderColor = "";
            input.style.boxShadow = "";
        },3000);
    }
    else{
        input.style.boxShadow = "";
    }
    return check;
};
let emailValidate=(input)=>{
    let email = input.value.trim();
    let emailRegex = /^[a-z._0-9]+@[a-z0-9]+\.[a-z]{2,}$/;
    let check = emailRegex.test(email);

    input.style.color = check?"gray":"red";
    input.style.borderColor = check?"black":"red";

    if(!check){
        input.style.boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.5)";
        setTimeout(()=>{
            input.style.borderColor = "";
            input.style.boxShadow = "";
        },3000);
    }
    else{
        input.style.boxShadow = "";
    }
    return check;
};
let contactValidate=(input)=>{
    let contact = input.value.trim();
    let contactRegex = /^(\+91[\-\s]?|0)?[6-9][0-9]{9}$/;
    let check = contactRegex.test(contact);

    input.style.color = check?"gray":"red";
    input.style.borderColor = check?"black":"red";

    if(!check){
        input.style.boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.5)";
        setTimeout(()=>{
            input.style.borderColor = "";
            input.style.boxShadow = "";
        },3000);
    }
    else{
        input.style.boxShadow = "";
    }
    return check;
};
document.getElementById("frm").addEventListener("submit",(e)=>{
        let name = document.getElementById("sname");
        let email = document.getElementById("semail");
        let contact = document.getElementById("scontact");
        let cid = document.getElementById("courseid").value;

        
        let check1 = nameValidate(name);
        let check3 = contactValidate(contact);

        let optional = document.getElementById("semail").value;
        let check2 = true;
        if(optional!==""){
           check2 = emailValidate(email);
        }
        
        
        if(!check1 || !check3 || !check2){
            alert("Please fill the correct data!!!");
            e.preventDefault();
        }
        if(!cid){
            alert("Please select the course!!!");
            e.preventDefault();
        }
});