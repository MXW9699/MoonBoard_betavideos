# Soloproject_MB_betavideos
moonboard beta videos cache

implementing a project to get a collection of beta vidoes from instagram accounts 
for people with dedicated moonboard instagram accounts to post and browse beta videos as it is so hard to find beta videos
it is very hard to look up betavideos for a specific moonboard climb, even though there are so many mb centered insta accounts


**MVP Goals**
have users upload/link moonboard problems with video[x]
be able to look up a problem and see beta videos from other accounts [x]
be able to look through all of your own beta videos sorted through problems [x]
instagram scraping to get videos [x]
be able to delete and reupload a video [x]

**stretch**
filtering on grades [partial]
search by users[partial]
show actual problem on board[partial]

add other boards. [currently only 2019]
responsive towards mobile
rate limiting on api requests
log in application with instagram. 
import all videos based on instagram handle [partial]
better ui

STILL PERIODICALLY WORKING ON THIS....

### 1. Start the Local PosGres Database with Docker

To spin up the local PosGres container, run the following command:

    npm run docker

This will use Docker Compose to start the PosGres container based on the configuration in your `compose-local.yaml` file.

### 2. Set Up the Backend Server

After the database is running, follow these steps to start the backend server:

#### Install Dependencies

Install the required Node.js dependencies by running:

    npm install

Alternatively, if you’re using `pnpm`, you can run:

    pnpm install

#### Run Prisma Migrations
To apply any pending database migrations with Prisma, run:

    pnpm prisma generate
    pnpm prisma migrate dev

This will ensure your database schema is up-to-date with the current model definitions.

To view the prisma database on the web interface http://localhost:5555 you can run

    pnpm prisma studio