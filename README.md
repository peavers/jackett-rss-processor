# Jackett Torrent Processor
![Release](https://github.com/peavers/jackett-rss-processor/workflows/Release/badge.svg)
![Super Linter](https://github.com/peavers/jackett-rss-processor/workflows/Super%20Linter/badge.svg)
![CodeQL](https://github.com/peavers/jackett-rss-processor/workflows/CodeQL/badge.svg)

A very simple RSS -> Blackhole web application 

## What
Setting up hundreds of RSS filters on your torrent client is fine until you want to try another client. This small application moves the RSS filters out of your client and to a standalone application. 

## Running
Docker is always going to be the easiest and cleanest way to get up and running  

Once the containers are running, access on `http://localhost:8080`

Note: Replace `${WATCH_DIRECTORY}` with the absolute path where you want torrent files to be downloaded.

```yaml
version: '3.7'
services:

  jackett:
    container_name: jackett
    image: linuxserver/jackett:latest
    restart: unless-stopped
    logging:
      options:
        max-size: "2m"
        max-file: "5"

  jackett-rss-processor:
    image: peavers/jackett-rss-processor:latest
    container_name: jackett-rss-processor
    restart: unless-stopped
    ports:
      - 8080:8080
    volumes:
      - ${WATCH_DIRECTORY}:/watched
    depends_on:
      - jackett
      - jackett-rss-mongo
    logging:
      options:
        max-size: "2m"
        max-file: "5"

  jackett-rss-mongo:
    image: mongo:latest
    container_name: jackett-rss-mongo
    restart: unless-stopped
    volumes:
      - mongo-data:/data/db
    logging:
      options:
        max-size: "2m"
        max-file: "5"

volumes:
  mongo-data:
```
## Screenshots
<img src="https://github.com/peavers/jackett-rss-processor/blob/master/webapp/.screenshots/add-new-feed-purple.png?raw=true" width="100%">
<img src="https://github.com/peavers/jackett-rss-processor/blob/master/webapp/.screenshots/pattern-edit-purple.png?raw=true" width="100%">
