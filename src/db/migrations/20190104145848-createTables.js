'use strict';

let dbm;
let type;
let seed;

const KEY = {
  type: 'int',
  unsigned: true,
  notNull: true
}

const PRIMARY = {
  ...KEY,
  primaryKey: true,
  autoIncrement: true
}


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('users', {
    id: PRIMARY,
    name: 'string'
  })

  await db.createTable('roles', {
    id: PRIMARY,
    name: 'string'
  })

  await db.createTable('resources', {
    id: PRIMARY,
    path: 'string',
    body: 'string'
  })

  await db.createTable('permissions', {
    id: PRIMARY,
    name: 'string'
  })

  await db.createTable('userPermissions', {
    id: PRIMARY,
    user: {
      ...KEY,
      foreignKey: {
        table: 'users',
        name: 'user_id_fk',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    permission: {
      ...KEY,
      foreignKey: {
        table: 'permissions',
        name: 'permission_id_fk',
        mapping: 'id',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    }
  })

  return null;
};

exports.down = function(db) {
  db.dropTable('userPermissions')
  db.dropTable('permissions')
  db.dropTable('resources')
  db.dropTable('roles')
  db.dropTable('users')
  return null;
};

exports._meta = {
  "version": 1
};
