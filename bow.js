var svg = document.querySelector("svg");
var cursor = svg.createSVGPoint();
var arrows = document.querySelector(".arrows");
let target = {x: 900, y: 249.5};
let pivot = {x: 100, y: 250};

function aim(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    var point = cursor.matrixTransform(svg.getScreenCTM().inverse());
    
    // Calculate angle
    var dx = point.x - pivot.x;
    var dy = point.y - pivot.y;
    var angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Rotate bow and arrow
    document.querySelector(".bow").setAttribute("transform", `translate(${pivot.x},${pivot.y}) rotate(${angle})`);
    document.querySelector(".arrow-angle").setAttribute("transform", `translate(${pivot.x},${pivot.y}) rotate(${angle})`);
}

function draw(e) {
    randomAngle = Math.random() * Math.PI * 0.03 - 0.015;
    gsap.to(".arrow-angle use", 0.3, {opacity: 1});
    window.addEventListener("mousemove", aim);
    window.addEventListener("mouseup", loose);
    aim(e);
}

function loose() {
    window.removeEventListener("mousemove", aim);
    window.removeEventListener("mouseup", loose);
    
    // Arrow shooting animation
    const arrow = document.querySelector(".arrow-angle");
    const startX = pivot.x;
    const startY = pivot.y;
    const angle = parseFloat(arrow.getAttribute("transform").match(/rotate\(([^)]+)\)/)[1]);
    
    // Animate to random TP
    const tps = [2.26030, 2.27430, 2.28560].map(tp => 
        target.x + (tp - 2.25430) * 100000
    );
    const randomTP = tps[Math.floor(Math.random() * tps.length)];
    
    gsap.to(arrow, {
        x: randomTP - startX,
        y: (Math.random() * 100) - 50,
        rotation: angle + Math.random() * 30,
        duration: 1,
        ease: "power2.out"
    });
}

// Initialize
aim({clientX: 320, clientY: 300});
window.addEventListener("mousedown", draw);