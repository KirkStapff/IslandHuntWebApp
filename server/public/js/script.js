document.querySelector(".btn").addEventListener("click", function () {
    document.querySelector(".date").innerHTML = new Date();
    fetch('/test', {
    }).then(res => res.text()).then(json =>{
        window.alert(json);
    })
  });