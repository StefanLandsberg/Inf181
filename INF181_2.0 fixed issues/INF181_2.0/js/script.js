function handleGuestSignIn() {
    const reason = "guest"; 
    switch (reason) {
        case "data-visualization":
            window.location.href = "data-visualization.html";
            break;
        case "information-quality":
            window.location.href = "information-quality.html";
            break;
        case "guest": 
            alert("Signing in as a guest!");
            break;
        default:
            alert("Invalid reason selected.");
    }
}
let complexTransitionTime = 3000    // <-- for complex animation
let transitionTime = 1000           // <-- 100 ms - time our animation will last
let previousTime, start = 0;        // <-- stores data on animation
let angle = 180;                    // <-- angle of gradient
let animationDirection = 'forwards' // <-- stores the animation direction
let complexAnDirection = 'forwards' // <-- for continuous animation
let element = 'gradient-button-transition'; // <-- id of our button
let intervalFrame;                          // <-- stores the interval frame
let complexIntervalFrame;                   // <-- for 'always on' gradient transition
let currentPct = 0;                         // <-- current percentage through the animation
let complexCurrentPct = 0;                  // <-- current pct for complex animation
let elapsed = 0;                            // <-- number of frames which have ellapsed 
let complexElapsed = 0;                     // <-- complex elapsed time

// GRADIENT COLORS
const gradientStopOne = [
    { pct: 0,  color: { r: 255, g: 113, b: 71 } }, // The first color in your gradient
    { pct: 100, color: { r: 0, g: 55, b: 255 } }   // The color you want your first color to transition to
];
const gradientStopTwo = [
    { pct: 0,  color: { r: 224, g: 65, b: 127 } }, // The second color in your gradient
    { pct: 100, color: { r: 0, g: 173, b: 255 } }  // The color you want your second color to transition to
]
const complexGradientOne = [
    { pct: 0,  color: { r: 224, g: 65, b: 127 } }, 
    { pct: 33, color: { r: 0, g: 173, b: 255 } },
    { pct: 66, color: { r: 203, g: 252, b: 5 } },
    { pct: 100, color: { r: 98, g: 5, b: 252 } }
]
const complexGradientTwo = [
    { pct: 0,  color: { r: 255, g: 113, b: 71 } },
    { pct: 33,  color: { r: 0, g: 55, b: 255 } },
    { pct: 66, color: { r:30, g: 177, b: 7 } },
    { pct: 100, color: { r:228, g: 44, b: 200 } }
]

let c1 = gradientStopOne[0].color;
let c2 = gradientStopTwo[0].color;
document.getElementById('gradient-button-transition').style.background = `linear-gradient(${angle}deg, rgb(${c1.r}, ${c1.g}, ${c1.b}), rgb(${c2.r}, ${c2.g}, ${c2.b}))`;


const getColor = function(pct, colorSet) {
    for (var i = 1; i < colorSet.length - 1; i++) {
        if (pct < colorSet[i].pct) {
            break;
        }
    }
    
    var lower = colorSet[i - 1];
    var upper = colorSet[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}


const animateGradient = function() {
    if(intervalFrame === undefined) {
        intervalFrame = setInterval(() => {
            let time = transitionTime / 1000; 
            let numberOfFrames = time * 30; 
            
            
            if(animationDirection === 'forwards') {
               
                elapsed += 1;
                
                currentPct = Math.min(elapsed / numberOfFrames, 1) * 100;
            }
            else {
                
                elapsed -= 1;
               
                currentPct = Math.max(elapsed / numberOfFrames, 0) * 100;
            }
            
           
            let colorOne = getColor(currentPct, gradientStopOne);
            let colorTwo = getColor(currentPct, gradientStopTwo);

            
            let generateGradient = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;

            
            document.getElementById(element).style.backgroundImage = generateGradient;

            // End the interval when we're done
            if(currentPct === 100 || currentPct === 0) {
                clearInterval(intervalFrame);
                intervalFrame = undefined;
            }
        }, 16.667); // 60 frames per second
    }
};

// This is our animation which we run on hover
const complexGradientAnimation = function() {
    if(complexIntervalFrame === undefined) {
        complexIntervalFrame = setInterval(() => {
            let time = complexTransitionTime / 1000;
            let numberOfFrames = time * 30; // 60 frames per second -> 1 second = 60 frames
            
            if(complexCurrentPct >= 100) {
                complexAnDirection = 'backwards';
            }
            else if(complexCurrentPct <= 0) {
                complexAnDirection = 'forwards';
            }
            // If the animation is going forward
            if(complexAnDirection == 'forwards') {
                // Add 1 to elapsed
                complexElapsed += 1;
                // The elapsed frames out of max frames
                complexCurrentPct = Math.min(complexElapsed / numberOfFrames, 1) * 100;
            }
            else if(complexAnDirection === 'backwards') {
                // Otherwise we're going back - subtract 1 from ellapsed
                complexElapsed -= 1;
                // The elapsed frames out of max frames
                complexCurrentPct = Math.max(complexElapsed / numberOfFrames, 0) * 100;
            }

            // Calculate current color in this time for each gradient color
            let colorOne = getColor(complexCurrentPct, complexGradientOne);
            let colorTwo = getColor(complexCurrentPct, complexGradientTwo);

            // Generate CSS string
            let generateGradient = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;

            // Add it to our background.
            document.getElementById('complex-gradient-transition').style.backgroundImage = generateGradient;

        }, 16.667); // 60 frames per second
    }
};

// On hover, run our animation
document.getElementById('gradient-button-transition').addEventListener('mouseover', function() {
    animationDirection = 'forwards';
    animateGradient();
});

// On hover out, run our animation again, but backwards
document.getElementById('gradient-button-transition').addEventListener('mouseleave', function() {
    animationDirection = 'backwards';
    animateGradient();
});

complexGradientAnimation();

function handleLogin() {
    const select = document.getElementById("reason");
    const selectedValue = select.value;

    // Redirect the user to the selected page
    window.location.href = selectedValue;

    // Prevent the default form submission
    return false;
}