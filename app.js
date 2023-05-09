const resetData = document.querySelectorAll('.resetData');
const polynomialDegrees = document.querySelectorAll('.polynomialDegrees');
const polynomialContainer = document.getElementById('polynomialContainer');
const secondDegree = document.getElementById("2ndDegree");
const thirdDegree = document.getElementById("3rdDegree");
const fourthDegree = document.getElementById("4thDegree");
const quadratic = document.getElementById("quadratic");
const quadraticForm = document.getElementById("quadraticForm");
const quadraticInput = document.getElementById("quadraticInput");
const cubic = document.getElementById("cubic");
const cubicForm = document.getElementById("cubicForm");
const cubicInput = document.getElementById("cubicInput");
const quartic = document.getElementById("quartic");
const quarticForm = document.getElementById("quarticForm");
const quarticInput = document.getElementById("quarticInput");
const outputSum = document.getElementById("outputSum");
const outputContanier = document.getElementById("outputContainer");
const inputNumsLabel = document.getElementById("inputNumsLabel");

let polynomialArr = [];
let inputs = [];
let coefficients = [];
let total = 0;

const degreeItems = [
    {
        a: document.getElementById("a"),
        b: document.getElementById("b"),
        c: document.getElementById("c"),
         
        1 : secondDegree.onclick = () => {
            polynomialArr.push(cubic, quartic, cubicForm, quarticForm);

            polynomialArr.forEach(listItem => {
                listItem.remove();
            });

            polynomialContainer.append(quadratic, quadraticForm);
            quadratic.classList.remove("hidden");
            quadraticForm.classList.remove("hidden");
            clearData(degreeItems[0], quadraticInput);
        },

        2 : quadraticForm.onsubmit = () => {
            arrayFilter(degreeItems[0], quadraticInput);
            quadraticInput.value = "";
        }
    },

    {
        a: document.getElementById("a2"),
        b: document.getElementById("b2"),
        c: document.getElementById("c2"),
        d: document.getElementById("d2"),
         
        3 : thirdDegree.onclick = () => {
            polynomialArr.push(quadratic, quartic, quadraticForm, quarticForm);

            polynomialArr.forEach(listItem => {
                listItem.remove();
            });

            polynomialContainer.append(cubic, cubicForm);
            cubic.classList.remove("hidden");
            cubicForm.classList.remove("hidden");
            clearData(degreeItems[1], cubicInput);
        },

        4 : cubicForm.onsubmit = () => {
            arrayFilter(degreeItems[1], cubicInput);
            cubicInput.value = "";
        }
    },

    {
        a: document.getElementById("a3"),
        b: document.getElementById("b3"),
        c: document.getElementById("c3"),
        d: document.getElementById("d3"),
        e: document.getElementById("e3"),

        4 : fourthDegree.onclick = () => {
            polynomialArr.push(quadratic, cubic, quadraticForm, cubicForm);

            polynomialArr.forEach(listItem => {
                listItem.remove();
            });
            
            polynomialContainer.append(quartic, quarticForm);
            quartic.classList.remove("hidden");
            quarticForm.classList.remove("hidden");
            clearData(degreeItems[2], quarticInput);
        },

        5 : quarticForm.onsubmit = () => {
            arrayFilter(degreeItems[2], quarticInput);
            quarticInput.value = "";
        }
    }
];

function calculatePolynomial(item){
    const objectKeys = Object.keys(item);
    outputContanier.classList.remove("hidden");

    inputs.length === 3 ? `${calculateQuadratic()}`
    : inputs.length === 4 ? `${calculateCubic()}` : inputs.length === 5 ? 
    `${calculateQuartic()}` : console.log("out of range");
};

function calculateQuadratic(){
    const discrim = Math.pow(inputs[1], 2) - 4 * inputs[0] * inputs[2];

    if (discrim >= 0){
        const root1 = ((-inputs[1] + Math.sqrt(discrim)) / (2 * inputs[0])).toFixed(2);
        const root2 = ((-inputs[1] - Math.sqrt(discrim)) / (2 * inputs[0])).toFixed(2);
        outputSum.textContent = `x1 = ${root1}, x2 = ${root2}`;
        return `${root1}, ${root2}`;
    }
    
    else if (discrim === 0){
        const root = (-inputs[1] / (2 * inputs[0])).toFixed(2);
        outputSum.textContent = `${root}`;
        return `one root ${root}`;
    }
    
    else {
        console.log("no real roots");
    }
}

function calculateCubic(){
    let a = inputs[0];
    let b = inputs[1];
    let c = inputs[2];
    let d = inputs[3];

    if (a === 0){
        return "a cannot be zero";
    }

    const discriminant = Math.pow(b, 2) - 3 * a * c;
    const delta = (2 * Math.pow(b, 3)) - (9 * a * b * c) + (27 * a * a * d);

    if (discriminant > 0){
        const alpha = ((-b + Math.sqrt(discriminant)) / (3 * a));
        const beta = ((-b - Math.sqrt(discriminant)) / (3 * a));
        outputSum.textContent = `x1 = ${alpha.toFixed(2)}, x2 = ${beta.toFixed(2)}, x3 = ${((-b / (3 * a)) - (alpha + beta) / 2).toFixed(2)}`;
        return `The cubic equation has three real roots: ${alpha.toFixed(2)}, ${beta.toFixed(2)}, and ${((-b / (3 * a)) - (alpha + beta) / 2).toFixed(2)}`;
    }

    else if (discriminant === 0){
        const alpha = (-b / (3 * a));
        outputSum.textContent = `x1 = ${alpha.toFixed(2)}`;
        return `The cubic equation has one real root: ${alpha.toFixed(2)}`;
    }

    else {
        const alpha = ((-b / (3 * a)) + (2 * Math.cbrt((-delta + Math.sqrt(-discriminant * discriminant * discriminant)) / (2 * a * a * a))) + (2 * Math.cbrt((-delta - Math.sqrt(-discriminant * discriminant * discriminant)) / (2 * a * a * a))));
        outputSum.textContent = `x1 = ${alpha.toFixed(2)}`;
        return `The cubic equation has one real root: ${alpha.toFixed(2)}`;
    }

}

function calculateQuartic(){
    
};

function arrayFilter(item, form) {
    const objectKeys = Object.keys(item);
    const splicedKeys = objectKeys.splice(0, 2);
    coefficients.push(item.a, item.b, item.c);
    let nonDuplicateCoefficients = [...new Set(coefficients)];
    inputs.push(form.value);
    
    for (let i = 0; i < objectKeys.length; i++) {
        objectKeys[i] = inputs[i];
    };
    
    if (objectKeys.length === 4){
        nonDuplicateCoefficients.push(item.d);
    }
    
    else if (objectKeys.length > 4){ 
        nonDuplicateCoefficients.push(item.d, item.e);
    };

    nonDuplicateCoefficients[total].textContent = inputs[total];
    total += 1;
    
    inputs.length === objectKeys.length ? calculatePolynomial(item, form) + form.parentElement.remove() : console.log("Input More Numbers");
};   

function clearData(objArrayItem, form){
    polynomialArr = [];
    coefficients = [];  
    inputs = [];
    polynomialContainer.appendChild(form.parentElement);
    
    objArrayItem.a.textContent = "a";
    objArrayItem.b.textContent = "b";
    objArrayItem.c.textContent = "c";
    total = 0;

    if (Object.keys(objArrayItem).length === 6){
        objArrayItem.d.textContent = "d";
    }
    
    else if (Object.keys(objArrayItem).length === 7){ 
        objArrayItem.d.textContent = "d";
        objArrayItem.e.textContent = "e";
    }

    outputSum.textContent = "";
};