document.querySelectorAll(".course-option").forEach((item)=>{
    item.addEventListener("click",(e)=>{
        e.preventDefault();
        const text = item.textContent;
        const dropdownBtn = document.getElementById("dropdownBtn");
        const cid = item.getAttribute("data-id");
        dropdownBtn.textContent = text;
        dropdownBtn.value = text;
        document.getElementById("courseid").value= parseInt(cid);

        document.forms["frm"].submit();
    });
});
setTimeout(() => {
    const alertbox = document.getElementById("alert");
    if (alertbox) {
        alertbox.style.display = "none";
    }
}, 2000);