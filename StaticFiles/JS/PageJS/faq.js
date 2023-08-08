//Control the accordian for the FAQ page
$(document).ready(function () {
    var acc = document.getElementsByClassName("accordion");
    var i;
    var accLength = acc.length;
    for (i = 0; i < accLength; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.padding = "0px 18px";
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.padding = "18px 18px";
            }
        });
    }
}
);
