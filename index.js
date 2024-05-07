//const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

// Create a readline interface to read user input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt the user to enter the YouTube URL
rl.question('Enter the YouTube URL: ', async (url) => {
    try {
        // Prompt the user to select the format (mp3/mp4)
        rl.question('Enter the format (mp3/mp4): ', async (format) => {
            // Prompt the user to select the quality
            rl.question('Enter the quality (highest/lowest): ', async (quality) => {
                // Construct the download link based on the selected format
                const downloadLink = `/download${format === 'mp3' ? 'mp3' : 'mp4'}?url=${encodeURIComponent(url)}&quality=${quality}`;

                // Make a GET request to the download endpoint
                const response = await axios.get(downloadLink, { responseType: 'arraybuffer' });

                // Write the response data to a file
                fs.writeFileSync(`video.${format}`, Buffer.from(response.data));

                console.log(`Video downloaded successfully as video.${format}`);

                // Close the readline interface
                rl.close();
            });
        });
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        // Close the readline interface
        rl.close();
    }
});
