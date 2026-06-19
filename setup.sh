#!/bin/bash

# Install Vite globally
npm install -g vite

# Or install Vite as a project dependency
npm install vite --save-dev

# Navigate to your PHP project directory and install PHP dependencies
cd /home/eightarch/Projects/App_TopUp_Game/api-topup
composer install
