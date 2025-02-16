const url = "https://webdev2.my-little-tech.com/COMP4537/labs/5/api/v1/sql";
import {userMessages} from "./lang/messages/en/user.js";

document.getElementById('insertButton').onclick = async () => {
    const data = [
        { name: 'Sara Brown', birthdate: '1901-01-01' },
        { name: 'John Smith', birthdate: '1941-01-01' },
        { name: 'Jack Ma', birthdate: '1961-01-30' },
        { name: 'Elon Musk', birthdate: '1999-01-01' }
    ];
    const responseElement = document.getElementById('insertResponse');

    for (const item of data) {
        const query = `INSERT INTO patient (name, dateOfBirth) VALUES ('${item.name}', '${item.birthdate}')`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql: query })
            });
            const responseData = await response.json();
            responseElement.innerText += JSON.stringify(responseData) + '\n';
        } catch (error) {
            console.error(userMessages.error, error);
            responseElement.innerText += userMessages.error + error.message + '\n';
        }
    }
};

document.getElementById('queryButton').onclick = async () => {
    const query = document.getElementById('Input').value;
    console.log(query);
    //const method = query.trim().toUpperCase().startsWith('SELECT') ? 'GET' : 'POST';
    const responseElement = document.getElementById('queryResponse');
    if (query.trim().toUpperCase().startsWith('SELECT')){
        const response = await fetch(url+'/'+query, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
        if (!response.ok) {
            throw new Error(userMessages.respondNotOk);
        }
        const data = await response.text();
        responseElement.innerText = data;
    }else if (query.trim().toUpperCase().startsWith('INSERT')){
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql: query })
            });
            if (response.ok) { 
                const responseData = await response.json(); 
                console.log('Response Content:', responseData);
                responseElement.innerText += JSON.stringify(responseData) + '\n';
            } else {
                console.error(userMessages.error, response.status, response.statusText);
                responseElement.innerText += `Error: ${response.status} ${response.statusText}\n`;
            }
        } catch (error) {
            console.error(userMessages.error, error);
            responseElement.innerText += userMessages.error + error.message + '\n';
        }
    }else{
	responseElement.innerText += userMessages.notSopport;
    }
};
