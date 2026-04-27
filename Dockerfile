FROM cypress/included:15.13.0

RUN apt-get update && apt-get install -y firefox-esr