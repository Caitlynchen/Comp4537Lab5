const url = "https://webdev2.my-little-tech.com/COMP4537/labs/5/api/v1/sql/";

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
            console.error('Error:', error);
            responseElement.innerText += 'Error: ' + error.message + '\n';
        }
    }
};

document.getElementById('queryButton').onclick = async () => {
    const query = document.getElementById('Input').value;
    console.log(query);
    const method = query.trim().toUpperCase().startsWith('SELECT') ? 'GET' : 'POST';
    const responseElement = document.getElementById('queryResponse');
    if (method == "GET"){
        const response = await fetch(url+query);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        responseElement.innerText = data;
    }else{
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql: query })
            });
            if (response.ok) { // Checks if the status code is in the range 200-299
                const responseData = await response.json(); // Assuming the response is JSON
                console.log('Response Content:', responseData);
                responseElement.innerText += JSON.stringify(responseData) + '\n';
            } else {
                console.error('Error:', response.status, response.statusText);
                responseElement.innerText += `Error: ${response.status} ${response.statusText}\n`;
            }
        } catch (error) {
            console.error('Error:', error);
            responseElement.innerText += 'Error: ' + error.message + '\n';
        }
    }

    // fetch(utl, {
    //     method: method
    // })
    // .then(response => response.json())
    // .then(data => {
    //     document.getElementById('queryResponse').innerText = JSON.stringify(data);
    // });
};