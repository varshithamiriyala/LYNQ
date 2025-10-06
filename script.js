

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageName = this.getAttribute('data-page');
            const targetPage = document.getElementById(pageName + '-page');

            // Remove active class from all nav buttons and pages
            navButtons.forEach(btn => btn.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));

            // Add active class to clicked button and target page
            this.classList.add('active');
            targetPage.classList.add('active');
        });
    });

    // Like button functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
            this.textContent = this.classList.contains('liked') ? 'Liked' : 'Like';
        });
    });

    // Create post functionality
    const createPostButton = document.querySelector('.create-post button');
    const createPostTextarea = document.querySelector('.create-post textarea');

    createPostButton.addEventListener('click', function() {
        const content = createPostTextarea.value.trim();
        if (content) {
            // In a real app, this would send to server
            alert('Post created: ' + content);
            createPostTextarea.value = '';
        } else {
            alert('Please enter some content for your post.');
        }
    });

    // Message input functionality (simple demo)
    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.placeholder = 'Type a message...';
    messageInput.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 20px;
        right: 20px;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 25px;
        background: white;
        display: none;
        z-index: 50;
    `;
    document.body.appendChild(messageInput);

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        padding: 12px 20px;
        background: linear-gradient(45deg, #1877f2, #8b5cf6);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        display: none;
        z-index: 50;
    `;
    document.body.appendChild(sendButton);

    // Show message input when messages page is active
    const messagesPage = document.getElementById('messages-page');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (messagesPage.classList.contains('active')) {
                    messageInput.style.display = 'block';
                    sendButton.style.display = 'block';
                } else {
                    messageInput.style.display = 'none';
                    sendButton.style.display = 'none';
                }
            }
        });
    });
    observer.observe(messagesPage, { attributes: true });

    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        if (message) {
            const bubbleContainer = document.querySelector('.message-bubbles');
            const newBubble = document.createElement('div');
            newBubble.className = 'bubble sent';
            newBubble.textContent = message;
            bubbleContainer.appendChild(newBubble);
            messageInput.value = '';
            bubbleContainer.scrollTop = bubbleContainer.scrollHeight;
        }
    });

    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Fun page video controls
    const videos = document.querySelectorAll('.reel video');
    videos.forEach(video => {
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
    });
});
