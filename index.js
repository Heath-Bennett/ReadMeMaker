
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const getLicense = (type) => {
    let license = ``;
    switch(type) {
        case 'Apache License 2.0':
            license = `Licensed under the Apache License, Version 2.0 (the "License");
            you may not use this file except in compliance with the License.
            You may obtain a copy of the License at
            
            http://www.apache.org/licenses/LICENSE-2.0
            
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            See the License for the specific language governing permissions and
            limitations under the License.`

            break;
        case 'GNU General Public License':
            license = `This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.
            
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
            
            You should have received a copy of the GNU General Public License
            along with this program.  If not, see <http://www.gnu.org/licenses/>.`

            break;
        case 'MIT License':
            license = `Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`

            break;

    }     
    return license;
};

const questions = [
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
        name: 'installation', 
        message: 'What is the installation process required?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use it?'
    },
    {
        type: 'list',
        name: 'licenseType',
        message: 'What license would you like to use?',
        choices: ['Apache License 2.0', 'GNU General Public License', 'MIT License'],
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Enter names of contributors.  If none, enter a way for someone to contact you to request being a contributor.',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter ways this project was tested.',
    },
    {
        type: 'input',
        name: 'question',
        message: 'Enter contact information where questions should be sent.',
    },

];


const generateREADME = (answers) =>
`# ${answers.projectTitle}
 
&nbsp;

## Description

${answers.Description}

&nbsp;

## Table of Contents

* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)

&nbsp;

## Installation

${answers.installation}

&nbsp;

## Usage

${answers.usage}

&nbsp;

## License

${getLicense(answers.licenseType)}

&nbsp;

## Contributing

${answers.contributors}

&nbsp;

## Tests

${answers.test}

&nbsp;

## Questions

${answers.question}

`;

function init (){
    inquirer.prompt(questions).then((answers) => {
        const readMePageContent = generateREADME(answers);
        fs.writeFile('sampleREADME.md', readMePageContent, (err) =>
            err ? console.log(err) : console.log('Successfully created sampleREADME.md')
        );
    });
}

init();