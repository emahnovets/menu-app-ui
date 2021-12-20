#!/bin/bash

# -e  Exit immediately if a command exits with a non-zero status
# -u  Treat unset variables as an error when substituting
# -o pipefail  The return value of a pipeline is the status of
#              the last command to exit with a non-zero status
set -euo pipefail

if [ "${CI:-false}" = true ] ; then
  dbPass="$DB_PASS"
  jwtSecret="$JWT_SECRET"
  adminEmail="$ADMIN_EMAIL"
  adminPass="$ADMIN_PASS"
else
  read -rp 'Database Password: ' dbPass
  read -rp 'JWT Secret: ' jwtSecret
  read -rp 'Admin Email: ' adminEmail
  read -rp 'Admin Password: ' adminPass
fi

sed "s+<db-pass>+$dbPass+g" api.env.template | \
sed "s+<jwt-secret>+$jwtSecret+g"  | \
sed "s+<app-admin-email>+$adminEmail+g" | \
sed "s+<app-admin-pass>+$adminPass+g" > api.env

cp db.env.template db.env
sed "s/<db-pass>/$dbPass/g" db.env.template > db.env

echo "{ \"TEST_USER_EMAIL\": \"$adminEmail\", \"TEST_USER_PASSWORD\": \"$adminPass\" }" > cypress.env.json
