#!/bin/bash

npm run migrate-deploy
npx prisma generate
npm run dev-container