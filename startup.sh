RED='\033[0;31m'
NC='\033[0m'

echo "${RED}Building the frontend${NC}"
cd ./frontend
bun run build

echo "${RED}Starting the Docker containers${NC}"
cd ..
docker compose up -d