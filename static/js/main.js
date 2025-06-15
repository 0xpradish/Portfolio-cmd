let inPsqlMode = false;
let currentDatabase = null;

const databases = {
    portfolio: {
        education: [
            ['Institution', 'Degree', 'Field', 'Year', 'GPA'],
            ['Karpagam Academy of Higher Edu.', 'Bachelor of Technology', 'AI and Data Science', '2020-2024', '8.7/10'],
            ['Stanes Anglo Indian Hr Sec Sch.', 'HSC', 'Computer Science', '2018-2020', '72%']
        ],
        skills: [
            ['Type', 'Skills'],
            ['Programming/Scripting', 'Python, Scala, SQL, Linux Shell Scripting'],
            ['Distributed Computation', 'Apache Hadoop, Apache Spark, Apache Flink'],
            ['Data Warehouses & Databases', 'Hive, AWS Redshift, Snowflake, MySQL,PostgreSQL, Cassandra, MongoDB'],
            ['Workflow & Messaging', 'Apache Airflow, Apache Kafka'],
            ['Web Frameworks', 'FastAPI'],
            ['AWS', 'S3, EMR, Lambda, CloudWatch, DynamoDB, Redshift, Athena, Glue, SNS, SQS, Kinesis,Step Functions'],
        ],
        certificates: [
            ['Certification'],
            ['Microsoft Certified: Azure AI Fund.'],
            ['Microsoft Certified: Azure Fund.'],
            ['HackerRank - SQL (Advanced)']
        ],
        experience: null,
        projects: [
            ['Title','Description'],
            ['Bitcoin Real-Time Data Streaming Pipeline','A real-time data pipeline streaming Bitcoin prices.'],
            ['Milkopolis','milkPolis is a fun 2D Pygame adventure game.'],
        ],
    }
};

const experienceResponsibilities = {
    "Mindgraph Technologies - Data Engineer": [
        "Developed incremental loading patterns for aviation data management, achieving significant improvement in batch processing efficiency",
        "Led a team of 2 and collaborated with business stakeholders to ensure on-time delivery and regular updates",
        "Would receive an impossible task from the client, enter a brief existential crisis, cry in binary, magically find a workaround at 2 AM, and implement it with tears, caffeine, and questionable sanity.(sarcasm)"
    ],
    "Mindgraph Technologies - Data Engineer Intern": [
        "Deployed an end-to-end solution for a leading Philippines airline, aggregating a 360° view of customer journeys.",
        "Built data pipelines from scratch, optimizing aggregation from 10+ sources and automating the ETL process.",
        "Developed a high-performance backend powering a dashboard used by top exec"
    ],
    "Kyungpook National University - Research Intern": [
        "Conducted research on 'Self-Referential Weight Matrix', exploring novel neural network architectures for efficient data representation",
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

function updatePrompt() {
    const promptSpan = document.querySelector('.prompt');
    if (promptSpan) {
        if (!inPsqlMode) {
            promptSpan.textContent = 'usr/pradish>';
        } else if (currentDatabase) {
            promptSpan.textContent = `${currentDatabase}=#`;
        } else {
            promptSpan.textContent = 'psql>';
        }
    }
}

const commands = {
    // Database connection commands
    'show databases': () => {
        const data = [
            ['Schema', 'Name'],
            ['public', 'portfolio']
        ];
        return generateTableFromArray(data);
    },

    'use portfolio': () => {
        if (!inPsqlMode) {
            return "ERROR: You must be in psql mode to use this command";
        }
        currentDatabase = 'portfolio';
        updatePrompt();
        return `Connected to database "portfolio"`;
    },

    // Table commands (require database connection)
    'show tables': () => {
        if (!currentDatabase) {
            return "ERROR: No database selected. Use 'use portfolio' to connect to a database first.";
        }
        const data = [
            ['Schema', 'Name', 'Type', 'Owner'],
            ['public', 'education', 'table', 'pradish'],
            ['public', 'skills', 'table', 'pradish'],
            ['public', 'experience', 'table', 'pradish'],
            ['public', 'certificates', 'table', 'pradish'],
            ['public', 'projects', 'table', 'pradish']
        ];
        return generateTableFromArray(data);
    },

    'select * from education': () => {
        if (!currentDatabase) {
            return "ERROR: No database selected. Use 'use portfolio' to connect to a database first.";
        }
        return generateTableFromArray(databases.portfolio.education);
    },

    'select * from skills': () => {
        if (!currentDatabase) {
            return "ERROR: No database selected. Use 'use portfolio' to connect to a database first.";
        }
        return generateTableFromArray(databases.portfolio.skills);
    },

    'select * from certificates': () => {
        if (!currentDatabase) {
            return "ERROR: No database selected. Use 'use portfolio' to connect to a database first.";
        }
        return generateTableFromArray(databases.portfolio.certificates);
    },

    'select * from projects': () => {
        if (!currentDatabase) {
            return "ERROR: No database selected. Use 'use portfolio' to connect to a database first.";
        }
        return generateTableFromArray(databases.portfolio.projects);
    },

    'select * from experience': () => {
        if (!currentDatabase) {
            return "ERROR: No database selected. Use 'use portfolio' to connect to a database first.";
        }
        generateExperienceTable();
        return databases.portfolio.experience;
    },
    
    help: () => `Available commands:
\\h or help : Show help
\\l or show databases : List all databases
use [database_name] : Connect to a database
\\dt or show tables : List tables (requires database connection)
\\q : Quit psql
clear : Clear screen
select * from [table_name] : View table contents (requires database connection)`,

    // Shortcuts
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
        const currentPrompt = inPsqlMode ? (currentDatabase ? `${currentDatabase}=#` : 'psql>') : 'usr/pradish>';
        commandLine.innerHTML = `<span class="prompt">${currentPrompt}</span> ${command}`;
        output.appendChild(commandLine);

        if (!inPsqlMode) {
            if (command === 'psql') {
                inPsqlMode = true;
                currentDatabase = null;
                userInput.placeholder = "Type 'help' for available commands or 'use portfolio' to connect to database";

                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                typeOutput(resultDiv, 'Connected to PranamSQL shell.\nType \\q to exit.\nType "use portfolio" to connect to the portfolio database.', () => {
                    updatePrompt();
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
                currentDatabase = null;
                userInput.placeholder = "Type 'psql' to enter shell";

                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                typeOutput(resultDiv, 'Disconnected from PranamSQL shell.', () => {
                    updatePrompt();
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
                    // Check if result contains HTML table
                    if (result.includes('<table')) {
                        resultDiv.innerHTML = result;
                    } else {
                        typeOutput(resultDiv, result);
                    }
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