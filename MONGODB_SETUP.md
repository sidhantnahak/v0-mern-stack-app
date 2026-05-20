# MongoDB Setup Instructions

## For Local Development

### Option 1: Using MongoDB Community Edition (Recommended)

#### macOS
```bash
# Install MongoDB using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running (should connect without errors)
mongosh
```

#### Windows
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB should start automatically as a service
4. Open Command Prompt and test:
```bash
mongosh
```

#### Linux (Ubuntu/Debian)
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb

# Verify it's running
mongosh
```

### Option 2: Using Docker

If you have Docker installed, this is the easiest way:

```bash
# Pull and run MongoDB in a container
docker run -d -p 27017:27017 --name mern-mongo mongo:latest

# Stop the container when done
docker stop mern-mongo

# Restart the container
docker start mern-mongo
```

### Option 3: Using MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-db?retryWrites=true&w=majority
```

## Verify MongoDB is Running

Run this command - it should connect without errors:
```bash
mongosh
```

If you see a MongoDB shell prompt, you're good to go!

## Troubleshooting

### MongoDB won't start on macOS
```bash
# Check if MongoDB is running
brew services list

# If not, try starting it
brew services start mongodb-community

# Check logs
cat /usr/local/var/log/mongodb/mongo.log
```

### Port 27017 already in use
MongoDB uses port 27017 by default. If this port is in use:
```bash
# On macOS/Linux, find what's using the port
lsof -i :27017

# On Windows
netstat -ano | findstr :27017
```

### Connection refused error
- Make sure MongoDB is running (see verification section above)
- Check that nothing is blocking port 27017
- Try restarting MongoDB

## Next Steps

Once MongoDB is running and your servers are started:

1. **Frontend** is at: http://localhost:3001
2. **Backend API** is at: http://localhost:5000

The app should now fully work with data persistence!
