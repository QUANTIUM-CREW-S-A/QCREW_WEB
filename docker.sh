#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}QCREW Web - Docker Management${NC}\n"

case "$1" in
  start)
    echo -e "${GREEN}Starting Docker container...${NC}"
    docker-compose up
    ;;
  stop)
    echo -e "${RED}Stopping Docker container...${NC}"
    docker-compose down
    ;;
  rebuild)
    echo -e "${GREEN}Rebuilding Docker image...${NC}"
    docker-compose up --build
    ;;
  logs)
    echo -e "${GREEN}Showing Docker logs...${NC}"
    docker-compose logs -f
    ;;
  clean)
    echo -e "${RED}Removing containers and images...${NC}"
    docker-compose down
    docker rmi qcrew-web
    ;;
  status)
    echo -e "${GREEN}Container status:${NC}"
    docker-compose ps
    ;;
  *)
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./docker.sh start     - Start the application"
    echo "  ./docker.sh stop      - Stop the application"
    echo "  ./docker.sh rebuild   - Rebuild and start"
    echo "  ./docker.sh logs      - Show live logs"
    echo "  ./docker.sh clean     - Remove containers and images"
    echo "  ./docker.sh status    - Show container status"
    ;;
esac
