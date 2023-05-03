const resetData = document.querySelectorAll('.resetData');
const polynomialDegrees = document.querySelectorAll('.polynomialDegrees');
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

let polynomialArr = [];
let inputs = [];
let total = 0;

const degreeItems = [
    {
        a: 0,
        b: 0,
        c: 0,
         
        1 : secondDegree.onclick = () => {
            polynomialArr.push(cubic, quartic, cubicForm, quadraticForm);

            polynomialArr.forEach(listItem => {
                listItem.classList.add("hidden");
            });

            quadratic.classList.remove("hidden");
            quadraticForm.classList.remove("hidden");
        },

        2 : quadraticForm.onsubmit = () => {
            arrayFilter(degreeItems[0], quadraticInput);
            quadraticInput.value = "";
        }
    },

    {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
         
        3 : thirdDegree.onclick = () => {
            polynomialArr.push(quadratic, quartic, quadraticForm, quarticForm);

            polynomialArr.forEach(listItem => {
                listItem.classList.add("hidden");
            });

            cubic.classList.remove("hidden");
            cubicForm.classList.remove("hidden");
        },

        4 : cubicForm.onsubmit = () => {
            arrayFilter(degreeItems[1], cubicInput);
            cubicInput.value = "";
        }
    },

    {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,

        4 : fourthDegree.onclick = () => {
            polynomialArr.push(quadratic, cubic, quadratic, cubicForm);

            polynomialArr.forEach(listItem => {
                listItem.classList.add("hidden");
            });
            
            quartic.classList.remove("hidden");
            quarticForm.classList.remove("hidden");
        },

        5 : quarticForm.onsubmit = () => {
            arrayFilter(degreeItems[2], quarticInput);
            quarticInput.value = "";
        }
    }
];

function calculatePolynomial(item, form){
    const objectKeys = Object.keys(item);

    console.log("hello");
    console.log(form);

};

function arrayFilter(item, form) {
    const objectKeys = Object.keys(item);
    const splicedItems = objectKeys.splice(0, 2);
    inputs.push(form.value);
    total++;

    for (let i = 0; i < objectKeys.length; i++) {
        objectKeys[i] = inputs[i];
    };

    if (inputs.length === objectKeys.length){
        form.classList.add('hidden')
        calculatePolynomial(item, form);
    } ;

    resetData.forEach(resetBtn => {
        resetBtn.addEventListener('click', (e) => {
            inputs = [];
            form.classList.remove('hidden');
        });
    });
};   