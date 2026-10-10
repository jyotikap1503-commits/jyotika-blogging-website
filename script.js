```javascript
// Select HTML elements
const searchInput = document.getElementById("searchInput");
const blogContainer = document.getElementById("blogContainer");
const noResults = document.getElementById("noResults");

const categoryButtons = document.querySelectorAll(".category-btn");
const addBlogBtn = document.getElementById("addBlogBtn");
const blogForm = document.getElementById("blogForm");

const darkModeBtn = document.getElementById("darkModeBtn");

const blogModal = document.getElementById("blogModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

let selectedCategory = "All";

// Search and category filter
function filterBlogs() {
    const searchText = searchInput.value.toLowerCase().trim();
    const blogCards = document.querySelectorAll(".blog-card");

    let visibleCount = 0;

    blogCards.forEach(function(card) {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText) ||
            category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.classList.remove("hidden");
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }
    });

    noResults.classList.toggle("hidden", visibleCount !== 0);
}

// Search event
searchInput.addEventListener("input", filterBlogs);

// Category buttons
categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterBlogs();
    });
});

// Show and hide Add Blog form
addBlogBtn.addEventListener("click", function() {
    blogForm.classList.toggle("hidden");

    if (!blogForm.classList.contains("hidden")) {
        blogForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

// Add a new blog
blogForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("blogTitle").value.trim();
    const category = document.getElementById("blogCategory").value;
    const description = document.getElementById("blogDescription").value.trim();

    if (!title || !category || !description) {
        alert("Please fill in all fields.");
        return;
    }

    // Create card safely using DOM methods
    const card = document.createElement("article");
    card.className = "blog-card";
    card.dataset.category = category;
    card.dataset.title = title;

    const content = document.createElement("div");
    content.className = "blog-content";

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = category;

    const heading = document.createElement("h3");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    paragraph.textContent =
        description.length > 130
            ? description.substring(0, 130) + "..."
            : description;

    const readButton = document.createElement("button");
    readButton.className = "read-btn";
    readButton.textContent = "Read More →";

    readButton.addEventListener("click", function() {
        showBlogDetails(title, description);
    });

    content.append(badge, heading, paragraph, readButton);
    card.appendChild(content);

    blogContainer.prepend(card);

    // Reset the form
    blogForm.reset();
    blogForm.classList.add("hidden");

    // Show the new blog
    selectedCategory = "All";
    categoryButtons.forEach(function(btn) {
        btn.classList.toggle("active", btn.dataset.category === "All");
    });

    searchInput.value = "";
    filterBlogs();

    alert("Your blog has been added successfully!");
});

// Show blog details
function showBlogDetails(title, content) {
    modalTitle.textContent = title;
    modalContent.textContent = content;

    blogModal.classList.remove("hidden");
}

// Read More buttons for existing blogs
document.querySelectorAll(".read-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        showBlogDetails(
            button.dataset.title,
            button.dataset.content
        );
    });
});

// Close modal
closeModal.addEventListener("click", function() {
    blogModal.classList.add("hidden");
});

// Close modal when clicking outside the content
blogModal.addEventListener("click", function(event) {
    if (event.target === blogModal) {
        blogModal.classList.add("hidden");
    }
});

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        blogModal.classList.add("hidden");
    }
});

// Dark mode
darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    darkModeBtn.textContent = isDark ? "☀️" : "🌙";
});

// Contact form demo
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    contactMessage.textContent =
        "Thank you! Your message has been received in this demo.";

    contactMessage.classList.remove("hidden");

    contactForm.reset();
});
```