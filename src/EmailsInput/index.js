/**
 * Emails Input Realization
 */
'use strict';

// Isolate the implementation inside EmailsInput function
window.EmailsInput = (function() {

    // CONSTANTS
    // Names for random email
    var NAMES = ['Samad','Sweet','Cristina','Mckenzie','Connar','Tang','Maddison','Flores','Luis','Irvine','Vinnie','Magana','Halimah','Costa','Selin','Parkes','Amayah','Serrano','Tony','Porter', 'STOP_CORONAVIRUS'];

    // Domain for random email
    var DOMAINS = ['gmail.com', 'mail.com','amazon.com','github.com','mail.ru'];

    // Default class prefix for each component class
    var DEFAULT_PREFIX = 'emails_input_block';

    // Email check regular expression
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /**
     * Create new EmailsInput component
     * @param {object} options Component Options
     * @param {HTMLElement} options.container DOM node
     * @param {string|HTMLElement} [options.title] Title for block above input
     */
    function createComponent(options) {

        // Nodes properties
        var fieldComponent = Field();
        var titleNode = createTitleNode();
        var addButton = createAddButton();
        var countButton = createCountButton();

        if (options && options.container && options.container.nodeName) {
            createBlock();
        } else {
            console.error('Component usage error. HTML container required');
        }

        // Create block with title and buttons
        function createBlock() {
            var block = document.createElement('div');
            addClass(block);
            block.appendChild(createHeadNode());
            block.appendChild(createButtonsNode());
            addClass(options.container, 'sizes');
            options.container.appendChild(block);
            return block;
        }

        /**
         * Create head block, add class
         * @returns {HTMLDivElement}
         */
        function createHeadNode() {
            var headBlock = document.createElement('div');
            addClass(headBlock, 'head');
            headBlock.appendChild(titleNode);
            headBlock.appendChild(fieldComponent.inputBlock);
            return headBlock;
        }

        /**
         * Fill title node
         * @returns {HTMLDivElement}
         */
        function createTitleNode() {
            var titleBlock = document.createElement('div');
            addClass(titleBlock, 'title');
            titleBlock.innerHTML = options.title || [
                'Share',
                '<b>Board name</b>',
                'with others'
            ].join(' ');
            return titleBlock;
        }

        /**
         * Create buttons block
         * @returns {HTMLDivElement}
         */
        function createButtonsNode() {
            var buttonsBlock = document.createElement('div');
            buttonsBlock.appendChild(addButton);
            buttonsBlock.appendChild(countButton);
            addClass(buttonsBlock, 'buttons');
            [addButton, countButton].map(function(item) {
                addClass(item, 'button');
            });
            return buttonsBlock;
        }

        /**
         * Create Add button
         * @returns {HTMLButtonElement}
         */
        function createAddButton() {
            var addButton = document.createElement('button');
            addButton.onclick = addEmailToField;
            addButton.innerText = 'Add email';
            return addButton;
        }

        /**
         * Create count button
         * @returns {HTMLButtonElement}
         */
        function createCountButton() {
            var countButton = document.createElement('button');
            countButton.onclick = function() {
                alert(fieldComponent.getCount());
            };
            countButton.innerText = 'Get emails count';
            return countButton;
        }

        /**
         * Add random email to field
         * @param {Event} [_event]
         * @param {string} [email]
         */
        function addEmailToField(_event, email) {
            fieldComponent.addEmail(email || getRandomEmailForField());
        }

        /**
         * Get email for emails filed
         * @param {Field} field
         * @param {number} [duplicatePrefix]
         * @return {string}
         */
        function getRandomEmailForField(field, duplicatePrefix) {
            var name = NAMES[randomInteger(0, NAMES.length - 1)],
                email = [
                    duplicatePrefix ? [name, duplicatePrefix].join('') : name,
                    DOMAINS[randomInteger(0, DOMAINS.length - 1)]
                ].join('@');
            if (fieldComponent.isEmailExist(email)) {
                email = getRandomEmailForField(field, randomInteger(0, 100));
            }
            return email;
        }

        /**
         * Get random integer from min to max
         * @param {number} min
         * @param {number} max
         * @return {number}
         */
        function randomInteger(min, max) {
            var rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }

        // Interface for interaction. Can be
        return {
            addEmail: function(email) {
                return addEmailToField(null, email);
            },
            getCount: fieldComponent.getCount
        };
    }

    // COMPONENTS:

    // Field logic
    var Field = (function() {
        return function Field() {
            var emails = [];
            var input = createInput();
            var inputBlock = createBlock();

            /**
             * Create, subscribe, add classes for input
             * @returns {HTMLInputElement}
             */
            function createInput() {
                var inputElement = document.createElement('input');
                inputElement.onkeydown = processKeyDown;
                inputElement.onblur = processFocusOut;
                inputElement.onpaste = processPaste;
                inputElement.placeholder = 'add more people ...';
                addClass(inputElement, 'input');
                return inputElement;
            }

            /**
             * Create, subscribe, add classes for input
             * @returns {HTMLInputElement}
             */
            function createBlock() {
                var inputBlockElement = document.createElement('div');
                addClass(inputBlockElement, 'field');
                inputBlockElement.onclick = function() {
                    input.focus();
                }
                inputBlockElement.appendChild(input);
                return inputBlockElement;
            }

            // EVENTS HANDLERS

            /**
             * Process mouse key
             * @param {Event} event
             */
            function processKeyDown(event) {
                if (event.key === ',' || event.key === 'Enter') {
                    addEmails(input.value);
                    input.value = null;
                    event.preventDefault();
                }
            }

            /**
             * Process loosing focus from inputBlock
             */
            function processFocusOut() {
                if (input.value) {
                    addEmails(input.value);
                    input.value = null;
                }
            }

            /**
             * Paste event handler
             * @param {Event} event
             */
            function processPaste(event) {
                addEmails(event.clipboardData.getData('text'));
                event.preventDefault();
            }

            // EMAILS LIST EDIT METHODS

            /**
             * Get number of valid emails
             * @returns {number}
             */
            function getValidEmailsCount() {
                return emails.filter(function(item) {
                    return item.isValid;
                }).length;
            }

            /**
             * Add multiple emails
             * @param {string} emailsString
             */
            function addEmails(emailsString) {
                if (emailsString) {
                    var newEmails = emailsString.split(/\s*,\s*/);
                    if (newEmails) {
                        newEmails.forEach(addEmail);
                    }
                }
            }

            /**
             * Add email to inputBlock
             * @param {string} email
             */
            function addEmail(email) {
                var addingEmail = email.trim();
                if (addingEmail && typeof addingEmail === 'string') {
                    var existingEmailId = getEmailExistId(addingEmail);
                    if (!existingEmailId) {
                        var emailInstance = Email(addingEmail, {
                            onItemRemove: removeItem
                        });
                        inputBlock.insertBefore(emailInstance.node, input);
                        emails.push(emailInstance.getProperties());
                    } else {
                        markExistEmail(existingEmailId);
                    }
                }
            }

            /**
             * Mark email that already exist
             * @param {number} id
             */
            function markExistEmail(id) {
                var foundEmail = inputBlock.querySelector('[email-id=' + id + ']');
                var existedClass = DEFAULT_PREFIX + '_existed';
                if (foundEmail) {
                    foundEmail.classList.add(existedClass);
                    setTimeout(function() {
                        foundEmail.classList.remove(existedClass);
                    }, 300)
                }
            }

            /**
             * Check for the existence of a new email in emails list
             * @param {string} emailForCheck
             * @returns {boolean}
             */
            function getEmailExistId(emailForCheck) {
                var id;
                emails.every(function(item) {
                    var isSameEmail = item.email === emailForCheck;
                    id = isSameEmail ? item.id : undefined;
                    return !isSameEmail;
                });
                return id;
            }

            /**
             * Remove email from component
             * @param {number} id
             * @param {HTMLElement} node
             */
            function removeItem(id, node) {
                emails = emails.filter(function(item) {
                    return item.id !== id;
                });
                inputBlock.removeChild(node);
            }

            // Interface for interaction
            return {
                inputBlock: inputBlock,
                getCount: function() {
                    return [
                        'Valid: ' + getValidEmailsCount(),
                        'Total: ' + emails.length
                    ].join('\n');
                },
                isEmailExist: function(email) {
                    return !!getEmailExistId(email);
                },
                addEmail: addEmail
            }
        }
    }());

    // Email block logic
    var Email = (function() {
        return function Email(email, handlers) {
            email = email.trim();
            var id = generateId();
            var node = createEmailBlock();

            // Interaction interface
            return {
                node: node,
                getProperties: function() {
                    return {
                        id: id,
                        email: email,
                        isValid: isValid(),
                        node: node
                    }
                }
            }

            // Get random id for email
            function generateId() {
                return 'f'+(~~(Math.random()*1e8)).toString(16);
            }

            /**
             * Create block with email text and close button
             * @returns {HTMLDivElement}
             */
            function createEmailBlock() {
                var block = document.createElement('div'),
                    closeButton = createCloseButton(),
                    emailBlock = document.createElement('div');

                block.setAttribute('email-id', id);
                addClass(block, 'email');
                addClass(block, isValid() ? 'valid' : 'invalid');
                emailBlock.innerText = email;
                block.appendChild(emailBlock);
                block.appendChild(closeButton);
                return block;
            }

            /**
             * Create close button, add class and subscribe on click
             * @returns {HTMLDivElement}
             */
            function createCloseButton() {
                var closeButton = document.createElement('div');
                closeButton.innerText = '✖';
                addClass(closeButton, 'close')
                closeButton.onclick = function() {
                    handlers.onItemRemove(id, node);
                };
                return closeButton;
            }

            /**
             * Check email validation
             * @returns {boolean}
             */
            function isValid() {
                return EMAIL_REGEXP.test(String(email).toLowerCase());
            }
        }
    }());

    /**
     * Add className to any node
     * @param {HTMLElement} node
     * @param {string} [postfix]
     */
    function addClass(node, postfix) {
        node.classList.add([
            DEFAULT_PREFIX,
            postfix ? '_' : '',
            postfix
        ].join(''))
    }

    return createComponent;
})();
