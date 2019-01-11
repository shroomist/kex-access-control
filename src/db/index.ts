import { Model, Sequelize } from 'sequelize-typescript'

const initDB = (url: string, models: Array<typeof Model>) => {
  const sqlz = new Sequelize({
    url,
    logging: false,
    operatorsAliases: Sequelize.Op as any, // maybe we'll use operators someday
  })

  sqlz.authenticate()
  sqlz.addModels(models)
  return sqlz
}

export { initDB }
