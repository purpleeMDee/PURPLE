document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Stories Page Functionality
    const storyGrid = document.getElementById('story-grid');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (storyGrid && typeof stories !== 'undefined') {
        let currentStories = [...stories];

        const renderStories = () => {
            storyGrid.innerHTML = '';
            if (currentStories.length === 0) {
                storyGrid.innerHTML = '<p class="no-results">No stories found. Try a different search or filter.</p>';
                return;
            }
            currentStories.forEach(story => {
                const storyCard = document.createElement('div');
                storyCard.classList.add('story-card');
                storyCard.dataset.category = story.category;

                storyCard.innerHTML = `
                    <a href="${story.url}">
                        <img src="${story.image}" alt="${story.title}">
                        <div class="story-card-content">
                            <h3>${story.title}</h3>
                            <p>${story.description}</p>
                        </div>
                    </a>
                `;
                storyGrid.appendChild(storyCard);
            });
        };

        const filterStories = (searchTerm, category) => {
            let filteredStories = [...stories];

            // Filter by search term
            if (searchTerm) {
                searchTerm = searchTerm.toLowerCase();
                filteredStories = filteredStories.filter(story =>
                    story.title.toLowerCase().includes(searchTerm) ||
                    story.description.toLowerCase().includes(searchTerm)
                );
            }

            // Filter by category
            if (category && category !== 'all') {
                filteredStories = filteredStories.filter(story => story.category === category);
            }

            currentStories = filteredStories;
            renderStories();
        };

        // Initial render
        renderStories();

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value;
                const activeFilter = document.querySelector('.filter-btn.active').dataset.category;
                filterStories(searchTerm, activeFilter);
            });
        }

        // Filter functionality
        if (filterBtns) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const category = btn.dataset.category;
                    const searchTerm = searchInput ? searchInput.value : '';
                    filterStories(searchTerm, category);
                });
            });
        }
    }
});
