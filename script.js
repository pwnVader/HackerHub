function filterTools() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    let toolCards = document.querySelectorAll('.tool-card');
    let foundAny = false;

    toolCards.forEach(tool => {
        let title = tool.querySelector('h4').textContent.toLowerCase();
        let description = tool.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchInput) || description.includes(searchInput)) {
            tool.style.display = 'block'; 
            foundAny = true;
        } else {
            tool.style.display = 'none'; 
        }
    });

    const noResultsMessage = document.getElementById('no-results-message');
    if (!foundAny) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }

    updateShowMoreButtonVisibility();
}

function updateShowMoreButtonVisibility() {
    let categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        let tools = category.querySelectorAll('.tool-card');
        let button = category.querySelector('.show-more-btn');
        
        let visibleTools = Array.from(tools).filter(tool => tool.style.display !== 'none');
        
        if (visibleTools.length > 3) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
        
        tools.forEach((tool, index) => {
            if (index >= 3) {
                tool.style.display = 'none'; // Ocultar las herramientas adicionales
            }
        });

        if (button && !visibleTools.some(tool => tool.style.display === 'none')) {
            button.classList.add('show-more');
            button.classList.remove('show-less');
        }
    });
}

function toggleTools(category) {
    let tools = document.querySelectorAll(`#${category} .tool-card`);
    let button = document.querySelector(`#${category} .show-more-btn`);
    
    let isVisible = Array.from(tools).slice(3).some(tool => tool.style.display === 'block');
    
    tools.forEach((tool, index) => {
        if (index >= 3) { 
            tool.style.display = isVisible ? 'none' : 'block'; 
        }
    });
    
    if (button) {
        button.classList.toggle('show-more', isVisible);  
        button.classList.toggle('show-less', !isVisible);  
    }
}
