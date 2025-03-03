const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

pageTurnBtn.forEach((el, idx) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId)

        if (pageTurn.classList.contains("turn")) {
            pageTurn.classList.remove("turn");
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - idx
            }, 500);
        } else {
            pageTurn.classList.add("turn");
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + idx
            }, 500);
        }
    }
})

//Event for Contact Me Button
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, idx) => {
        setTimeout(() => {
            page.classList.add('turn')

            setTimeout(() => {
                page.style.zIndex = 20 + idx
            }, 500);
        }, (idx + 1) * 200 + 100)
    })
}

//Event for reverse

let totalPage = pages.length;
let pageNumber = 0;

function reverseIdx() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPage - 1;
    }
}

//Event for Back Profile Button

const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, idx) => {
        setTimeout(() => {
            reverseIdx();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIdx();
                pages[pageNumber].style.zIndex = 10 + idx
            }, 500);

        }, (idx + 1) * 200 + 100)
    })
}

//Event for animation
const coverRight = document.querySelector('.cover-right');

setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

pages.forEach((_, idx) => {
    setTimeout(() => {
        reverseIdx();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIdx();
            pages[pageNumber].style.zIndex = 10 + idx
        }, 500);

    }, (idx + 1) * 200 + 2100)
})

const themeToggleBtn = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.innerHTML = `<i class='bx bxs-sun' ></i>`;
} else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.innerHTML = `<i class='bx bx-moon'></i>`;
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Save the current theme preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = `<i class='bx bxs-sun' ></i>`;
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = `<i class='bx bxs-moon' ></i>`;
    }
});

//Event for scroll
document.body.addEventListener('mousemove', (e) => {

    gsap.to('#circle', {
        x: e.clientX,
        y: e.clientY,
    });
});


// feth massage
document.getElementById("messageForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let massage = document.getElementById("message").value.trim();

    if (!name || !email || !massage) {
        showResponse("Please fill in all fields!", "error");
        return;
    }

    let data = { Name: name, Email: email, Massage: massage }; 

    fetch("https://sheetdb.io/api/v1/c07zzio786ep7", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: [data] }) 
    })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);
            showResponse("Message Sent Successfully!", "success");
            document.getElementById("messageForm").reset();
        })
        .catch(error => {
            console.error("Error:", error);
            showResponse("Error sending message.", "error");
        });
});

//Show and Hide Response Message
function showResponse(message, type) {
    let responseDiv = document.getElementById("response");

    responseDiv.textContent = message;
    responseDiv.className = type;  // Apply success or error class
    responseDiv.style.display = "block";

    // Hide message
    setTimeout(() => {
        responseDiv.style.display = "none";
    }, 3000);
}




