let ajaxImpl = (str) => {
    let tbody = document.getElementById("tbody");
    fetch(`/searchCourse?cname=${str}`)
        .then((res) => res.json())
        .then((data) => {
            //Using DOM display data on webpage
            tbody.innerHTML = "";  // refresh each time
            data.forEach((item, index) => {
                let row = document.createElement("tr");
                let col1 = document.createElement("td");
                col1.innerHTML = "" + (index + 1);
                row.appendChild(col1);

                let col2 = document.createElement("td");
                col2.innerHTML = "" + item.cname;
                row.appendChild(col2);

                let col3 = document.createElement("td");
                col3.innerHTML = `<a href="/deleteCourse?cid=${item.cid}"><i class="fa-solid fa-trash text-danger"></i></a>`;
                row.appendChild(col3);

                let col4 = document.createElement("td");
                col4.innerHTML = `<a href="/edit?cid=${item.cid}"><i class="fa-solid fa-pen text-primary"></i></a>`;
                row.appendChild(col4);
                
                tbody.appendChild(row);
            });
        })
        .then((err) => {
            console.log("Some Problem!!!", err);
        })
}
setTimeout(() => {
    const alertbox = document.getElementById("alert");
    if (alertbox) {
        alertbox.style.display = "none";
    }
}, 5000);
