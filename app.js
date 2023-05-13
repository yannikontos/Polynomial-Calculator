const resetData = document.querySelectorAll('.resetData');
const polynomialDegrees = document.querySelectorAll('.polynomialDegrees');
const polynomialContainer = document.getElementById('polynomialContainer');
const secondDegree = document.getElementById("2ndDegree");
const thirdDegree = document.getElementById("3rdDegree");
const firstDegree = document.getElementById("1stDegree");
const quadratic = document.getElementById("quadratic");
const quadraticForm = document.getElementById("quadraticForm");
const quadraticInput = document.getElementById("quadraticInput");
const cubic = document.getElementById("cubic");
const cubicForm = document.getElementById("cubicForm");
const cubicInput = document.getElementById("cubicInput");
const linear = document.getElementById("linear");
const linearForm = document.getElementById("linearForm");
const linearInput = document.getElementById("linearInput");
const outputSum = document.getElementById("outputSum");
const outputContanier = document.getElementById("outputContainer");
const inputNumsLabel = document.getElementById("inputNumsLabel");

let polynomialArr = [];
let inputs = [];
let coefficients = [];
let total = 0;

const degreeItems = [
        {
            a: document.getElementById("a1"),
            b: document.getElementById("b1"),
    
            1 : firstDegree.onclick = () => {
                polynomialArr.push(quadratic, cubic, quadraticForm, cubicForm);
    
                polynomialArr.forEach(listItem => {
                    listItem.remove();
                });
                
                polynomialContainer.append(linear, linearForm);
                linear.classList.remove("hidden");
                linearForm.classList.remove("hidden");
                clearData(degreeItems[0], linearInput);
            },
    
            2 : linearForm.onsubmit = () => {
                arrayFilter(degreeItems[0], linearInput);
                linearInput.value = "";
            }
        },
    {
        a: document.getElementById("a2"),
        b: document.getElementById("b2"),
        c: document.getElementById("c2"),
         
        3 : secondDegree.onclick = () => {
            polynomialArr.push(cubic, linear, cubicForm, linearForm);

            polynomialArr.forEach(listItem => {
                listItem.remove();
            });

            polynomialContainer.append(quadratic, quadraticForm);
            quadratic.classList.remove("hidden");
            quadraticForm.classList.remove("hidden");
            clearData(degreeItems[1], quadraticInput);
        },

        4 : quadraticForm.onsubmit = () => {
            arrayFilter(degreeItems[1], quadraticInput);
            quadraticInput.value = "";
        }
    },

    {
        a: document.getElementById("a3"),
        b: document.getElementById("b3"),
        c: document.getElementById("c3"),
        d: document.getElementById("d3"),
         
        5 : thirdDegree.onclick = () => {
            polynomialArr.push(quadratic, linear, quadraticForm, linearForm);

            polynomialArr.forEach(listItem => {
                listItem.remove();
            });

            polynomialContainer.append(cubic, cubicForm);
            cubic.classList.remove("hidden");
            cubicForm.classList.remove("hidden");
            clearData(degreeItems[2], cubicInput);
        },

        6 : cubicForm.onsubmit = () => {
            arrayFilter(degreeItems[2], cubicInput);
            cubicInput.value = "";
        }
    }
];

function calculatePolynomial(item){
    const objectKeys = Object.keys(item);
    outputContanier.classList.remove("hidden");

    inputs.length === 3 ? `${calculateQuadratic()}`
    : inputs.length === 4 ? `${calculateCubic()}` : inputs.length < 3 ? 
    `${calculateLinear()}` : console.log("out of range");
};

function calculateLinear(){
    const [a, b] = inputs;

    const root = -b / a;
    outputSum.textContent = `x1 = ${root}`;
};

function calculateQuadratic(){
    const [a, b, c] = inputs;
    const discrim = Math.pow(b, 2) - 4 * a * c;

    if (discrim >= 0){
        const root1 = ((-b + Math.sqrt(discrim)) / (2 * a)).toFixed(2);
        const root2 = ((-b - Math.sqrt(discrim)) / (2 * a)).toFixed(2);
        outputSum.textContent = `x1 = ${root1}, x2 = ${root2}`;
        return `${root1}, ${root2}`;
    }
    
    else if (discrim === 0){
        const root = (-b / (2 * a)).toFixed(2);
        outputSum.textContent = `${root}`;
        return `one root ${root}`;
    }
    
    else {
        outputSum.textContent = `no real roots`;
    }
}

function calculateCubic(){
    const [a, b, c, d] = inputs;

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

function arrayFilter(item, form) {
    const objectKeys = Object.keys(item);
    const splicedKeys = objectKeys.splice(0, 2);
    coefficients.push(item.a, item.b);
    let nonDuplicateCoefficients = [...new Set(coefficients)];
    inputs.push(form.value);
    
    for (let i = 0; i < objectKeys.length; i++) {
        objectKeys[i] = inputs[i];
    };
    
    if (objectKeys.length === 3){
        nonDuplicateCoefficients.push(item.c);
    }
    
    else if (objectKeys.length > 3){ 
        nonDuplicateCoefficients.push(item.c);
        nonDuplicateCoefficients.push(item.d);
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
    total = 0;

    if (Object.keys(objArrayItem).length === 5){
        objArrayItem.c.textContent = "c";
    }
    else if (Object.keys(objArrayItem).length === 6){
        objArrayItem.d.textContent = "d";
    }

    outputSum.textContent = "";
};
