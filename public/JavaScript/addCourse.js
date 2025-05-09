setTimeout(() => {
    const alertbox = document.getElementById("alert");
    if (alertbox) {
        alertbox.style.display = "none";
    }
}, 2000);

// course name validation
let courseValidate = (input) => {
    let course = input.value.trim();
    let courseRegex = /^[A-Z][a-zA-Z\s+0-9]*$/;
    let check = courseRegex.test(course);

    input.style.color = check ? "gray" : "red";
    input.style.borderColor = check ? "black" : "red";
    if(!check){
        input.style.boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.5)";
        setTimeout(()=>{
            input.style.borderColor="";
            input.style.boxShadow="";
        },3000);
    }
    else{
        input.style.boxShadow="";
    }
    return check;
};
document.getElementById("frm").addEventListener("submit",(e)=>{
    let c = document.getElementById("cname");
    let check = courseValidate(c);
    if(!check){
        alert("Please enter the correct course name!!!");
        e.preventDefault();
    }
});