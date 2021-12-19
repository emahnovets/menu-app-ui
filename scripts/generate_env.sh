#!/bin/bash

# -e  Exit immediately if a command exits with a non-zero status
# -u  Treat unset variables as an error when substituting
# -o pipefail  The return value of a pipeline is the status of
#              the last command to exit with a non-zero status
set -euo pipefail

sed "s+<db-pass>+$DB_PASS+g" api.env.template | \
sed "s+<jwt-secret>+$JWT_SECRET+g"  | \
sed "s+<app-admin-email>+$ADMIN_EMAIL+g" | \
sed "s+<app-admin-pass>+$ADMIN_PASS+g" > api.env

cp db.env.template db.env
sed "s/<db-pass>/$DB_PASS/g" db.env.template > db.env
