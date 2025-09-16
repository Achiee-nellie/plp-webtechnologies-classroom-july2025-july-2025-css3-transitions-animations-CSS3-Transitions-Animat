/* ==========================================================================
   JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES
   ========================================================================== */

// Global Variables (demonstrating global scope)
let globalCounter = 0;
const ANIMATION_DURATION = 1000;

/**
 * Mathematical Functions with Parameters and Return Values
 */

// Function with parameters that returns a calculated value
function calculateArea(length, width = 1) {
    // Local variables (demonstrating local scope)
    const area = length * width;
    const perimeter = 2 * (length + width);
    
    // Return an object with multiple values
    return {
        area: area,
        perimeter: perimeter,
        dimensions: `${length} x ${width}`
    };
}

// Function that takes a callback parameter (higher-order function)
function processNumber(number, operation) {
    // Local scope variable
    let result;
    
    switch(operation) {
        case 'square':
            result = number * number;
            break;
        case 'cube':
            result = number * number * number;
            break;
        case 'factorial':
            result = calculateFactorial(number);
            break;
        default:
            result = number;
    }
    
    return result;
}

// Recursive function demonstrating scope and return values
function calculateFactorial(n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    // Recursive case - function calling itself
    return n * calculateFactorial(n - 1);
}

// Function demonstrating closure and scope
function createCounter(initialValue = 0) {
    // This variable is in the function's local scope
    let count = initialValue;
    
    // Return a function that has access to the outer scope
    return function(increment = 1) {
        count += increment;
        return count;
    };
}

// Array manipulation function with parameters
function processArray(arr, operation = 'sum') {
    if (!Array.isArray(arr)) {
        return { error: 'Input must be an array' };
    }
    
    let result;
    
    switch(operation) {
        case 'sum':
            result = arr.reduce((acc, curr) => acc + curr, 0);
            break;
        case 'average':
            result = arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
            break;
        case 'max':
            result = Math.max(...arr);
            break;
        case 'min':
            result = Math.min(...arr);
            break;
        default:
            result = arr;
    }
    
    return {
        operation: operation,
        result: result,
        originalArray: [...arr], // Spread operator to avoid mutation
        arrayLength: arr.length
    };
}

/**
 * Functions that demonstrate scope concepts
 */
function demonstrateFunctions() {
    const input = document.getElementById('numberInput').value;
    const number = parseInt(input) || 5;
    const output = document.getElementById('functionOutput');
    
    // Test various functions with parameters and return values
    const areaResult = calculateArea(number, number + 2);
    const squareResult = processNumber(number, 'square');
    const factorialResult = processNumber(number, 'factorial');
    const arrayResult = processArray([1, number, number*2, number*3], 'average');
    
    // Demonstrate closure
    const counter = createCounter(10);
    const firstCount = counter(5);
    const secondCount = counter(3);
    
    // Update global variable to show global scope
    globalCounter++;
    
    const resultText = `
 Input Number: ${number}

 Area Calculation (${number} x ${number + 2}):
   • Area: ${areaResult.area}
   • Perimeter: ${areaResult.perimeter}
   • Dimensions: ${areaResult.dimensions}

 Number Processing:
   • Square of ${number}: ${squareResult}
   • Factorial of ${number}: ${factorialResult}

 Array Processing [1, ${number}, ${number*2}, ${number*3}]:
   • Average: ${arrayResult.result.toFixed(2)}
   • Original Array: [${arrayResult.originalArray.join(', ')}]

🔄 Closure Counter (started at 10):
   • After adding 5: ${firstCount}
   • After adding 3: ${secondCount}

🌐 Global Counter: ${globalCounter} (incremented each time)
    `;
    
    output.textContent = resultText;
    
    // Add visual feedback with animation
    output.style.transform = 'scale(0.95)';
    setTimeout(() => {
        output.style.transform = 'scale(1)';
    }, 150);
}

function showScopeDemo() {
    const output = document.getElementById('scopeOutput');
    
    // Demonstrate different scopes
    let localVar = 'I am local to showScopeDemo()';
    
    function innerFunction() {
        let innerVar = 'I am local to innerFunction()';
        // Can access variables from outer scope
        return `Inner function can see: "${localVar}" and "${innerVar}"`;
    }
    
    // Function to show variable shadowing
    function shadowingExample() {
        let globalCounter = 999; // This shadows the global variable
        return `Inside shadowingExample, globalCounter is: ${globalCounter}`;
    }
    
    const result = `
 SCOPE DEMONSTRATION:

 Local Scope:
   • localVar (in showScopeDemo): "${localVar}"
   
 Nested Function Scope:
   • ${innerFunction()}
   
 Global Scope Access:
   • Global counter: ${globalCounter}
   • ANIMATION_DURATION constant: ${ANIMATION_DURATION}ms
   
 Variable Shadowing:
   • ${shadowingExample()}
   • But global globalCounter is still: ${globalCounter}

 Key Points:
   • Inner functions can access outer scope variables
   • Global variables are accessible everywhere
   • Local variables shadow global ones with same name
   • const/let have block scope, var has function scope
    `;
    
    output.textContent = result;
    
    // Animate the output
    output.style.opacity = '0';
    output.style.transform = 'translateY(20px)';
    setTimeout(() => {
        output.style.opacity = '1';
        output.style.transform = 'translateY(0)';
        output.style.transition = 'all 0.5s ease';
    }, 100);
}

/* ==========================================================================
   COMBINING CSS ANIMATIONS WITH JAVASCRIPT
   ========================================================================== */

/**
 * Animation Control Functions
 * These functions demonstrate adding/removing CSS classes to trigger animations
 */

function animateBox(animationType) {
    const box = document.getElementById('animationBox');
    
    // Remove any existing animation classes
    box.className = 'animation-box';
    
    // Force a reflow to ensure the class removal takes effect
    box.offsetHeight;
    
    // Add the new animation class
    box.classList.add(animationType);
    
    // Optional: Remove the animation class after it completes
    setTimeout(() => {
        box.classList.remove(animationType);
    }, ANIMATION_DURATION);
    
    // Update the box text to show which animation is running
    const originalText = box.textContent;
    box.textContent = `${animationType.toUpperCase()}!`;
    
    setTimeout(() => {
        box.textContent = originalText;
    }, ANIMATION_DURATION);
}

function resetBox() {
    const box = document.getElementById('animationBox');
    
    // Remove all animation classes
    box.className = 'animation-box';
    box.textContent = 'Animate Me!';
    
    // Add a subtle reset animation
    box.style.transform = 'scale(0.9)';
    setTimeout(() => {
        box.style.transform = 'scale(1)';
        box.style.transition = 'transform 0.3s ease';
    }, 100);
}

/**
 * Modal Functions - Dynamic content with CSS animations
 */
function showModal(title, message) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    
    // Set dynamic content
    modalTitle.textContent = title;
    modalText.textContent = message;
    
    // Remove hidden class and add show class for CSS animation
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10); // Small delay to ensure the transition works
}

function hideModal() {
    const modal = document.getElementById('modal');
    
    // Remove show class to trigger exit animation
    modal.classList.remove('show');
    
    // Add hidden class after animation completes
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

/**
 * Loading Animation Functions
 * Demonstrates starting/stopping animations with JavaScript
 */
function simulateLoading() {
    const loadingContainer = document.getElementById('loadingContainer');
    const button = event.target;
    
    // Show loading animation
    loadingContainer.classList.remove('hidden');
    setTimeout(() => {
        loadingContainer.classList.add('show');
    }, 10);
    
    // Disable the button
    button.disabled = true;
    button.textContent = 'Loading...';
    
    // Simulate async operation with setTimeout
    const loadingTime = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
        // Hide loading animation
        loadingContainer.classList.remove('show');
        
        setTimeout(() => {
            loadingContainer.classList.add('hidden');
            
            // Re-enable button
            button.disabled = false;
            button.textContent = 'Start Loading';
            
            // Show completion message in modal
            showModal('Loading Complete!', `Loading finished in ${(loadingTime/1000).toFixed(1)} seconds!`);
        }, 300);
    }, loadingTime);
}

/**
 * Card Flip Functions
 * Interactive elements with CSS transforms triggered by JavaScript
 */
function flipCard(cardElement) {
    // Toggle the flipped class to trigger CSS animation
    cardElement.classList.toggle('flipped');
    
    // Add visual feedback with a subtle scale effect
    cardElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cardElement.style.transform = 'scale(1)';
        cardElement.style.transition = 'transform 0.2s ease';
    }, 100);
    
    // Optional: Play a sound effect or add haptic feedback
    // This demonstrates how you could extend the interaction
    if (navigator.vibrate) {
        navigator.vibrate(50); // Haptic feedback on mobile devices
    }
}

/**
 * Advanced Animation Functions
 * More complex combinations of JavaScript and CSS
 */

// Function to create dynamic elements with animations
function createAnimatedElement(type = 'div', className = '', content = '') {
    const element = document.createElement(type);
    element.className = className;
    element.textContent = content;
    
    // Start invisible for fade-in effect
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    
    return element;
}

// Function to animate element appearance
function animateElementIn(element, delay = 0) {
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay);
}

// Chain animations function
function chainAnimations(element, animations, interval = 1000) {
    let currentIndex = 0;
    
    function runNextAnimation() {
        if (currentIndex < animations.length) {
            const animation = animations[currentIndex];
            
            // Remove previous animation classes
            element.className = element.className.replace(/\b(bounce|spin|shake|glow)\b/g, '');
            
            // Add new animation class
            if (animation) {
                element.classList.add(animation);
            }
            
            currentIndex++;
            setTimeout(runNextAnimation, interval);
        }
    }
    
    runNextAnimation();
}

/**
 * Utility Functions for Animation Management
 */

// Function to detect animation support
function supportsAnimation() {
    const element = document.createElement('div');
    const animationSupport = 'animation' in element.style || 
                            'webkitAnimation' in element.style || 
                            'mozAnimation' in element.style;
    return animationSupport;
}

// Function to get random animation
function getRandomAnimation() {
    const animations = ['bounce', 'spin', 'shake', 'glow'];
    return animations[Math.floor(Math.random() * animations.length)];
}

// Function to animate multiple elements in sequence
function animateSequence(elements, animationClass, stagger = 200) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
            
            // Remove animation class after completion
            setTimeout(() => {
                element.classList.remove(animationClass);
            }, ANIMATION_DURATION);
        }, index * stagger);
    });
}

/**
 * Event Listeners and Initialization
 * Functions that run when the page loads
 */

// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Interactive CSS & JavaScript Experience Loaded!');
    console.log(`📊 Animation support: ${supportsAnimation() ? '✅' : '❌'}`);
    console.log(`🌐 Global counter initialized: ${globalCounter}`);
    
    // Add keyboard shortcuts for modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            hideModal();
        }
    });
    
    // Add click outside modal to close
    document.getElementById('modal').addEventListener('click', function(event) {
        if (event.target === this) {
            hideModal();
        }
    });
    
    // Add random animations to demonstrate automated effects
    setTimeout(() => {
        const animationBox = document.getElementById('animationBox');
        if (animationBox) {
            // Chain random animations every 5 seconds as a demo
            setInterval(() => {
                if (!animationBox.classList.contains('bounce') && 
                    !animationBox.classList.contains('spin') && 
                    !animationBox.classList.contains('shake') && 
                    !animationBox.classList.contains('glow')) {
                    
                    const randomAnimation = getRandomAnimation();
                    animateBox(randomAnimation);
                }
            }, 8000);
        }
    }, 3000);
});

/**
 * Performance and Optimization Functions
 */

// Debounce function to limit function calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance-critical events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Advanced Demonstration Functions
 * These show more complex interactions between JavaScript and CSS
 */

// Function that creates a particle effect using CSS animations
function createParticleEffect(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        // Random direction and distance
        const angle = (Math.PI * 2 * i) / count;
        const distance = Math.random() * 100 + 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.style.animation = `particle-${i} 1s ease-out forwards`;
        
        // Inject keyframes for this particle
        const keyframes = `
            @keyframes particle-${i} {
                to {
                    transform: translate(${endX - x}px, ${endY - y}px);
                    opacity: 0;
                    scale: 0;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        document.body.appendChild(particle);
        
        // Clean up
        setTimeout(() => {
            particle.remove();
            styleSheet.remove();
        }, 1000);
    }
}

// Add click effects to animation box
document.addEventListener('DOMContentLoaded', function() {
    const animationBox = document.getElementById('animationBox');
    if (animationBox) {
        animationBox.addEventListener('click', function(event) {
            createParticleEffect(event.clientX, event.clientY, 8);
        });
    }
});
