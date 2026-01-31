(function () {
    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .naga-chatbot-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Lato', sans-serif;
        }

        .naga-chat-btn {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #FFD700, #b8860b);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .naga-chat-btn:hover {
            transform: scale(1.1);
        }

        .naga-chat-btn i {
            font-size: 28px;
            color: #000;
        }

        .naga-chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: #121212;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(255, 215, 0, 0.2);
            transform-origin: bottom right;
            animation: popIn 0.3s ease forwards;
        }

        @keyframes popIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }

        .naga-chat-header {
            background: linear-gradient(135deg, #FFD700, #b8860b);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #000;
        }

        .naga-chat-header h3 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .naga-chat-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #000;
            opacity: 0.7;
            transition: 0.2s;
        }

        .naga-chat-close:hover {
            opacity: 1;
        }

        .naga-chat-body {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
            background: #0f0f0f;
        }

        .chat-msg {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.95rem;
            line-height: 1.5;
            position: relative;
        }

        .chat-msg.bot {
            background: #1e1e1e;
            color: #e0e0e0;
            border-bottom-left-radius: 2px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .chat-msg.user {
            background: rgba(255, 215, 0, 0.15);
            color: #FFD700;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
            border: 1px solid rgba(255, 215, 0, 0.2);
        }

        .chat-options {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 10px;
        }

        .chat-option-btn {
            background: transparent;
            border: 1px solid rgba(255, 215, 0, 0.3);
            color: #ccc;
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: 0.2s;
        }

        .chat-option-btn:hover {
            background: var(--primary);
            background: #FFD700;
            color: #000;
            border-color: #FFD700;
        }

        .naga-chat-footer {
            padding: 15px;
            border-top: 1px solid #222;
            text-align: center;
            font-size: 0.8rem;
            color: #666;
            background: #121212;
        }

        /* Scrollbar */
        .naga-chat-body::-webkit-scrollbar {
            width: 6px;
        }
        .naga-chat-body::-webkit-scrollbar-track {
            background: #0f0f0f;
        }
        .naga-chat-body::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 3px;
        }
    `;
    document.head.appendChild(style);

    // Inject HTML
    const widget = document.createElement('div');
    widget.className = 'naga-chatbot-widget';
    widget.innerHTML = `
        <div class="naga-chat-window" id="nagaChatWindow">
            <div class="naga-chat-header">
                <h3><i class="fa-solid fa-robot"></i> NAGA AI Assistant</h3>
                <button class="naga-chat-close" onclick="toggleChat()"><i class="fa-solid fa-times"></i></button>
            </div>
            <div class="naga-chat-body" id="nagaChatBody">
                <div class="chat-msg bot">
                    Hello! I am the NAGA Legal Assistant. How can I help you today?
                </div>
                <div class="chat-options" id="initialOptions">
                    <button class="chat-option-btn" onclick="handleOption('tools')">Explore AI Tools</button>
                    <button class="chat-option-btn" onclick="handleOption('consult')">Consultation</button>
                    <button class="chat-option-btn" onclick="handleOption('contact')">Contact Details</button>
                    <button class="chat-option-btn" onclick="handleOption('bail')">Check Bail Eligibility</button>
                </div>
            </div>
            <div class="naga-chat-footer">
                Powered by Naga Law Chambers AI
            </div>
        </div>
        <div class="naga-chat-btn" onclick="toggleChat()">
            <i class="fa-solid fa-comment-dots"></i>
        </div>
    `;
    document.body.appendChild(widget);

    // Logic
    window.toggleChat = function () {
        const win = document.getElementById('nagaChatWindow');
        if (win.style.display === 'flex') {
            win.style.display = 'none';
        } else {
            win.style.display = 'flex';
        }
    };

    window.handleOption = function (option) {
        const body = document.getElementById('nagaChatBody');

        // Add User Msg
        let userText = '';
        if (option === 'tools') userText = 'Explore AI Tools';
        if (option === 'consult') userText = 'Consultation';
        if (option === 'contact') userText = 'Contact Details';
        if (option === 'bail') userText = 'Check Bail Eligibility';

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg user';
        userMsg.innerText = userText;
        body.appendChild(userMsg);

        // Scroll to bottom
        body.scrollTop = body.scrollHeight;

        // Simulate typing delay
        setTimeout(() => {
            let botText = '';
            let buttons = '';

            if (option === 'tools') {
                botText = "We have 9+ AI Legal Tools available. You can draft agreements, check evidence strength, or get a legal opinion instantly.";
                buttons = `<a href="tools.html" class="chat-option-btn" style="text-decoration:none; display:inline-block;">Go to Dashboard</a>`;
            } else if (option === 'consult') {
                botText = "You can consult with Advocate S. Nagendra Naik directly via WhatsApp or Phone.";
                buttons = `
                    <a href="https://wa.me/919440000417" target="_blank" class="chat-option-btn" style="text-decoration:none; display:inline-block;">Chat on WhatsApp</a>
                    <a href="tel:+919440000417" class="chat-option-btn" style="text-decoration:none; display:inline-block;">Call Now</a>
                `;
            } else if (option === 'contact') {
                botText = "📍 **Office:** District Court Premises, Anantapur.<br>📞 **Phone:** +91 9440000417<br>✉️ **Email:** contact@nagalawchambers.com";
            } else if (option === 'bail') {
                botText = "Use our AI Bail Checker to see if an offense is Bailable or Non-Bailable under IPC/BNS.";
                buttons = `<a href="bail.html" class="chat-option-btn" style="text-decoration:none; display:inline-block;">Open Bail Checker</a>`;
            }

            const botMsg = document.createElement('div');
            botMsg.className = 'chat-msg bot';
            botMsg.innerHTML = botText;
            body.appendChild(botMsg);

            if (buttons) {
                const btnContainer = document.createElement('div');
                btnContainer.className = 'chat-options';
                btnContainer.innerHTML = buttons;
                body.appendChild(btnContainer);
            }

            body.scrollTop = body.scrollHeight;
        }, 600);
    };

})();
