let inPsqlMode = false;

const databases = {
    portfolio: {
        education: [
            ['Institution', 'Degree', 'Field', 'Year', 'GPA'],
            ['Karpagam Academy of Higher Edu.', 'Bachelor of Technology', 'AI and Data Science', '2020-2024', '8.7/10'],
            ['Stanes Anglo Indian Hr Sec Sch.', 'HSC', 'Computer Science', '2018-2020', '72%']
        ],
        skills: [
            ['Type', 'Skills'],
            ['Programming', 'Python'],
            ['Big Data', 'SQL • Spark • Pyspark • Hadoop • Hive • Pandas'],
            ['AWS', 'Glue • S3 • DynamoDB • Lambda • Step Fn • Redshift • EC2'],
            ['Web Frameworks', 'FastAPI'],
            ['Add. Technologies', 'Linux • Airflow • Kafka • MySQL • Git • Github • Docker']
        ],
        certificates: [
            ['Certification'],
            ['Microsoft Certified: Azure AI Fund.'],
            ['Microsoft Certified: Azure Fund.'],
            ['HackerRank - SQL (Advanced)']
        ],
        experience: null
    }
};

const experienceResponsibilities = {
    "Mindgraph Technologies - Data Engineer": [
        "Optimized the Customer 360 pipeline with Python, Spark, and AWS, reducing runtime from 8 to 5 hours",
        "Developed APIs with FastAPI for dashboards, enhancing insights for over 150M customers"
    ],
    "Mindgraph Technologies - Data Engineer Intern": [
        "Optimized the Customer 360 pipeline with Python, Spark, and AWS, reducing runtime from 8 to 5 hours",
        "Developed APIs with FastAPI for dashboards, enhancing insights for over 150M customers"
    ],
    "Kyungpook National University - Research Intern": [
        "Researched 'Self-Referential Weight Matrix' for innovative neural network architectures",
        "Explored advancements in smart contracts for consumer electronics"
    ]
};

function generateExperienceTable() {
    const roles = [
        {
            company: "Mindgraph Technologies",
            role: "Data Engineer",
            location: "Coimbatore",
            year: "Jun 2024-Present",
            key: "Mindgraph Technologies - Data Engineer"
        },
        {
            company: "Mindgraph Technologies",
            role: "Data Engineer Intern",
            location: "Coimbatore",
            year: "Jun 2023-Jun 2024",
            key: "Mindgraph Technologies - Data Engineer Intern"
        },
        {
            company: "Kyungpook National University",
            role: "Research Intern",
            location: "Daegu",
            year: "Feb 2023-Mar 2023",
            key: "Kyungpook National University - Research Intern"
        }
    ];

    let table = '<table style="border-collapse: collapse;  ">';
    table += `
    <thead>
        <tr style="border: 1px dashed white;">
            <th style="border: 1px dashed white; padding: 8px; text-align: left;">Company</th>
            <th style="border: 1px dashed white; padding: 8px; text-align: left;">Role</th>
            <th style="border: 1px dashed white; padding: 8px; text-align: left;">Location</th>
            <th style="border: 1px dashed white; padding: 8px; text-align: left;">Year</th>
        </tr>
    </thead>
    <tbody>`;
    
    roles.forEach(({ company, role, location, year, key }) => {
        const escapedKey = key.replace(/'/g, "\\'");

        table += `
        <tr style="border: 1px dashed white;">
            <td style="border: 1px dashed white; padding: 8px;">${company}</td>
            <td style="border: 1px dashed white; padding: 8px;"><a href="#" class="role-link" data-role="${escapedKey}">${role}</a></td>
            <td style="border: 1px dashed white; padding: 8px;">${location}</td>
            <td style="border: 1px dashed white; padding: 8px;">${year}</td>
        </tr>`;
    });

    table += '</tbody></table>';
    databases.portfolio.experience = table;
}


function generateTableFromArray(data) {
    let table = '<table style="border-collapse: collapse; table-layout: auto; max-width: 300px; ">';
    table += '<thead><tr>';
    data[0].forEach(header => {
        table += `<th style="border: 1px dashed white; padding: 8px; text-align: left; white-space: nowrap;">${header}</th>`;
    });
    table += '</tr></thead><tbody>';

    for (let i = 1; i < data.length; i++) {
        table += '<tr>';
        data[i].forEach(cell => {
            table += `<td style="border: 1px dashed white; padding: 8px; text-align: left; white-space: nowrap;">${cell}</td>`;
        });
        table += '</tr>';
    }

    table += '</tbody></table>';
    return table;
}



function showResponsibilities(role) {
    const popup = document.getElementById('responsibilityPopup');
    const content = document.getElementById('popupContent');
    const responsibilities = experienceResponsibilities[role];

    if (!responsibilities) return;

    content.innerHTML = `<h3 style="color: #4CAF50; margin-bottom: 20px;">Responsibilities for ${role.split(' - ')[1]}</h3>`;
    content.innerHTML += '<ul style="list-style-type: none; padding-left: 0;">';
    responsibilities.forEach(resp => {
        content.innerHTML += `<li style="margin-bottom: 10px;">• ${resp}</li>`;
    });
    content.innerHTML += '</ul>';

    popup.style.display = 'block';
}

function closePopup() {
    document.getElementById('responsibilityPopup').style.display = 'none';
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('role-link')) {
        e.preventDefault();
        const role = e.target.getAttribute('data-role');
        showResponsibilities(role);
    }
});

function typeOutput(element, text, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(type, 30);
        } else if (callback) {
            callback();
        }
    }
    type();
}

const commands = {
    'show databases': () => {
        const data = [
            ['Schema', 'Name'],
            ['public', 'portfolio']
        ];
        return generateTableFromArray(data);
    },

    'show tables': () => {
        const data = [
            ['Schema', 'Name', 'Type', 'Owner'],
            ['public', 'education', 'table', 'pradish'],
            ['public', 'skills', 'table', 'pradish'],
            ['public', 'experience', 'table', 'pradish'],
            ['public', 'certificates', 'table', 'pradish']
        ];
        return generateTableFromArray(data);
    },

    'select * from education': () => generateTableFromArray(databases.portfolio.education),
    'select * from skills': () => generateTableFromArray(databases.portfolio.skills),
    'select * from certificates': () => generateTableFromArray(databases.portfolio.certificates),
    'select * from experience': () => {
        generateExperienceTable();
        return databases.portfolio.experience;
    },

    help: () => `Available commands:
\\h or help : Show help
\\l or show databases : List all databases
\\dt or show tables : List tables
\\q : Quit psql
clear : Clear screen
select * from [table_name] : View table contents`,

    '\\h': () => commands.help(),
    '\\l': () => commands['show databases'](),
    '\\dt': () => commands['show tables'](),
    clear: () => {
        document.getElementById('output').innerHTML = '';
        return '';
    }
};

const userInput = document.getElementById('userInput');
const output = document.getElementById('output');

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const command = userInput.value.toLowerCase().trim();

        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="prompt">${inPsqlMode ? 'psql>' : 'usr/pradish>'}</span> ${command}`;
        output.appendChild(commandLine);

        if (!inPsqlMode) {
            if (command === 'psql') {
                inPsqlMode = true;
                userInput.placeholder = "Type 'help' for available commands";

                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                typeOutput(resultDiv, 'Connected to PranamSQL shell.\nType \\q to exit.', () => {
                    const promptSpan = document.querySelector('.prompt');
                    if (promptSpan) promptSpan.textContent = 'psql>';
                });
                output.appendChild(resultDiv);
            } else {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                typeOutput(resultDiv, "Type 'psql' to enter the PranamSQL shell");
                output.appendChild(resultDiv);
            }
        } else {
            if (command === '\\q') {
                inPsqlMode = false;
                userInput.placeholder = "Type 'psql' to enter shell";

                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                typeOutput(resultDiv, 'Disconnected from PranamSQL shell.', () => {
                    const promptSpan = document.querySelector('.prompt');
                    if (promptSpan) promptSpan.textContent = 'usr/pradish>';
                });
                output.appendChild(resultDiv);
            } else if (command === 'clear') {
                output.innerHTML = '';
            } else {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                const commandResult = commands[command];
                if (commandResult) {
                    const result = commandResult();
                    resultDiv.innerHTML = result;
                } else {
                    typeOutput(resultDiv, "ERROR: Invalid command. Type 'help' for available commands");
                }
                output.appendChild(resultDiv);
            }
        }

        userInput.value = '';
        output.scrollTop = output.scrollHeight;
    }
});

userInput.focus();

document.querySelector('.terminal').addEventListener('click', function() {
    userInput.focus();
});
