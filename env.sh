#!/usr/bin/env bash
#
# Sets Postgres uri env variable according to environment
#
# Usage:
#> env <test|dev|prod>
#

user="postgres"
pass="mysecretpassword"
dbname="kex_access_control"
host="127.0.0.1"
port="5432"
postfix=""

if [[ ! -z "$1" ]]; then
    postfix="_$1"
fi

export KEX_DB_URL="postgres://$user:$pass@$host:$port/$dbname$postfix"
export NODE_ENV="$1"