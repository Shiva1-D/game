


Installation Instructions for the Multiplayer Game Server
-----------------------------------------------------------

1. Ensure Node.js is installed:
   - Visit https://nodejs.org/ and download the latest LTS version if you don't have Node.js installed.
   - Verify installation by running:
     node -v

2. Navigate to your project directory:
   - Open a terminal (or command prompt) and change to the directory containing your server.js file.
     Example:
       cd path/to/your/project

3. Install required packages:
   - Run the following command to install Express and Socket.io:
       npm install express socket.io

4. Start the server:
   - Run the command:
       node server.js
   - You should see a message like "Server running on port 3000" in the terminal.

5. Access the game:
   - Open your web browser and navigate to:
       http://localhost:3000/
   - For a specific game room (bonus feature), use a URL like:
       http://localhost:3000/your_unique_game_id
     Replace "your_unique_game_id" with any unique identifier to start a separate game instance.

6. Additional Notes:
   - Make sure your index.html file is located in the "public" folder (which is served statically by Express).
  


