const inquirer = require("inquirer");
const fs = require("fs");
const prompts = inquirer.createPromptModule();

// questions to ask users
const Questions = [
  {
    type: "input",
    message: "What is the title of your project?",
    name: "title",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Give a description of your project",
    name: "description",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "describe how your project can be installed",
    name: "installation",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "describe how your project can be used",
    name: "usage",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "confirm",
    message:
      "do you have any external resources (videos, images) that be further used to describle",
    name: "has_external_link",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "describe the the type of resource you want to link",
    name: "external_link_text",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
    when: (answers) => answers.has_external_link,
  },
  {
    type: "input",
    message: "enter the link to your resource",
    name: "external_link",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
    when: (answers) => answers.external_link_text,
  },
  {
    type: "list",
    message: "what type of license do you have",
    name: "license",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
    choices: [
      "MIT License",
      "GNU General Public License (GPL)",
      "Apache License",
      "BSD Licenses",
    ],
  },
  {
    type: "input",
    message: "describe how other people can contribute to this project",
    name: "contributing",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "confirm",
    message: "do you have any test running for this project",
    name: "confirm_test",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "describe the tests that can be ran on this project",
    name: "tests",
    validate: (value) => {
      if (!value) {
        return "Please enter a value to continue";
      }
      return true;
    },
    when: (answers) => answers.confirm_test,
  },
];

prompts(Questions).then((answers) => {
  const template = generateTemplate(answers);
  createFile(answers.title, template);
});

// readme file template
const generateTemplate = (options) => `
# ${options.title}

## About this Project
${options.description}

### Table of content
1.[Installation](#installation)

2.[Usage](#usage)

3.[License](#license)

4.[Contributing](#usage)

${
  options.confirm_test
    ? `
5.[Tests](#tests)
`
    : ""
}

### Installation
${options.installation}

### Usage
${options.installation}
${
  options.has_external_link
    ? `
**Additional Resource**
[${options.external_link_text}](${options.external_link})
`
    : ""
}

### License
This project is licensed under the ${options.license}

### Contributing
${options.contributing}

${
  options.has_external_link
    ? `
### Tests
${options.tests}
`
    : ""
}
`;

// create readme file
const createFile = (fileName, template) => {
  fs.writeFile(`./${fileName.split(" ").join("_")}.md`, template, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File generated successfully");
  });
};
