
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
let chartColorCode = ``;
let chartColorTable = ``;
let chartColorBlock = ``;

const colorChart = (anArray) => {
    let temp = ``;
    for (let i = 0; i < anArray.length; i++){
        chartColorCode += (anArray[i] + `|`);
        chartColorTable += `:----------:|`;
        temp = anArray[i].slice(1);
        chartColorBlock += `![${anArray[i]}](https://via.placeholder.com/150x300/${temp}/000000?text=+)  |`;
    }

    chartColorCode = chartColorCode.slice(0, -1);
    chartColorTable = chartColorTable.slice(0, -1);
    chartColorBlock = chartColorBlock.slice(0, -1);
}



const generateREADME = (answers3) => 
`# ${answers3.projectTitle}

&nbsp;

## Description

&nbsp;

${answers3.Description}

&nbsp;

[Link to GitHub repository](${answers3.linkToGitHub})

&nbsp;

[Link to deployed page](${answers3.linkToDeployed})

&nbsp;

## Table of Contents

&nbsp;

* [Image of Project](#Image-of-Project)
* [Resources Used](#Resources-Used)
* [Colors Used](#Colors-Used)
* [License](#License)

&nbsp;

## Image of Project

&nbsp;

[Table of Contents](#Table-of-Contents)

&nbsp;

## Resources Used

[Table of Contents](#Table-of-Contents)

&nbsp;

## Colors Used

&nbsp;

${chartColorCode}
${chartColorTable}
${chartColorBlock}

[Table of Contents](#Table-of-Contents)

&nbsp;

## License
&nbsp;


[Table of Contents](#Table-of-Contents)
`;

'use strict';



let outputFuncName = [];
let outputFuncDesc = [];
let outputFuncPath = [];
let outputResourceName = [];
let outputResourceLink = [];
let outputMain = [];
let outputColors = [];

const questionsFunc = [
    {
        type: 'input',
        name: 'FunctionalitySectionName',
        message: "Please provide a name for the functionality section.",
    },
    {
        type: 'input',
        name: 'FunctionalitySectionDesc',
        message: "Please describe the first functionality?",
    },
    {
        type: 'input',
        name: 'picturePath',
        message: "Please submit the path to the picture that corresponds to the functionality",
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to enter another functionality (just hit enter for YES)?',
        default: true,
    },
];

const questionsColor = [
    {
        type: 'input',
        name: 'color',
        message: 'Please provide the hex code for the color used.',
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Would you like to enter another color hex code (just hit enter for YES)?',
        default: true,
    },
];

const questionsResource = [
    {
        type: 'input', 
        name: 'resourceName',
        message: 'Please provide the name of the resource used.',
    },
    {
        type: 'input',
        name: 'resourceLink',
        message: 'Please provide a link to the resources page.',
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Would you like to enter another resource (just hit enter for YES)?',
        default: true,
    },
];

var questionsMain = [
    {
        type: 'input', 
        name: 'projectTitle', 
        message: 'What is the title of the website?',
    },
    {
        type: 'input',
        name: 'Description',
        message: 'Please provide a brief description.',
    },
    {
        type: 'input', 
        name: 'linkToGitHub', 
        message: 'Please provide a link to the repository.',
    },
    {
        type: 'input',
        name: 'linkToDeployed',
        message: 'Please provide a link to the deployed page.',
    },
    {
        type: 'input', 
        name: 'indexHTML', 
        message: 'What is the path for the image of the website?',
    },
    {
        type: 'list',
        name: 'licenseType',
        message: 'What license would you like to use?',
        choices: ['Apache License 2.0', 'GNU General Public License', 'GN Library or "Lesser" General Public License (LGPL)', 'MIT License', 'Mozilla Public License 2.0'],
    },
];

function askFunc() {
    inquirer.prompt(questionsFunc).then((answers) => {
        // output.push(answers.tvShow);
        outputFuncName.push(answers.FunctionalitySectionName);
        outputFuncDesc.push(answers.FunctionalitySectionDesc);
        outputFuncPath.push(answers.picturePath);
        
        if (answers.askAgain) {
            askFunc();
        }
        else{
            askResource();
        } 
    });
}

function askResource (){
    inquirer.prompt(questionsResource).then((answers2) => {
        outputResourceName.push(answers2.resourceName);
        outputResourceLink.push(answers2.resourceLink);
        if (answers2.askAgain){
            askResource();
        }
        else {
            askColor();
        }
    });
}



function askColor(){
    inquirer.prompt(questionsColor).then((answers4) => {
        outputColors.push(answers4.color);
        if (answers4.askAgain){
            askColor();
        }
        else{
            askMain();
        }
    });
}

function askMain (){
    inquirer.prompt(questionsMain).then((answers3) => {
        outputMain.push(answers3.projectTitle);
        outputMain.push(answers3.Description);
        outputMain.push(answers3.linkToGitHub);
        outputMain.push(answers3.linkToDeployed);
        outputMain.push(answers3.indexHTML);
        outputMain.push(answers3.licenseType);
        
        console.log('questionFuncName:', outputFuncName.join(', '));
        console.log("questionFuncDesc:", outputFuncDesc.join(', '));
        console.log('questionFuncPath: ', outputFuncPath.join(', '));
        console.log('questionResourceName:', outputResourceName.join(', '));
        console.log("questionResourceLink:", outputResourceLink.join(', '));
        console.log('questionMain: ', outputMain.join(', '));
        console.log('questionColors: ', outputColors.join(', '));
        
        colorChart(outputColors);
        
        const readMePageContent = generateREADME(answers3);
        fs.writeFile('README.md', readMePageContent, (err) =>
            err ? console.log(err) : console.log('Successfully created README.md')
        );
    });
}


askFunc();


