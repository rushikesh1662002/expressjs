let ajaxImpl = (str) => {
    let tbody = document.getElementById("tbody");
    fetch(`/searchStudent?sname=${str}`)
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
                col2.innerHTML = "" + item.sname;
                row.appendChild(col2);

                let col3 = document.createElement("td");
                col3.innerHTML = "" + item.semail;
                row.appendChild(col3);

                let col4 = document.createElement("td");
                col4.innerHTML = "" + item.scontact;
                row.appendChild(col4);

                let col5 = document.createElement("td");
                col5.innerHTML = "" + item.cname;
                row.appendChild(col5);

                let col6 = document.createElement("td");
                col6.innerHTML = `<a href="/deleteStudentById?sid=${item.sid}"><i class="fa-solid fa-trash text-danger"></i></a>`;
                row.appendChild(col6);

                let col7 = document.createElement("td");
                col7.innerHTML = `<a href="/updateStudentById?sid=${item.sid}"><i class="fa-solid fa-pen text-primary"></i></a>`;
                row.appendChild(col7);
                
                tbody.appendChild(row);
            });
        })
        .then((err) => {
            console.log("Ajax error!!!", err);
        })
}
setTimeout(() => {
    const alertbox = document.getElementById("alert");
    if (alertbox) {
        alertbox.style.display = "none";
    }
}, 3000);
