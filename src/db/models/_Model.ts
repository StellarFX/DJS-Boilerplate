// THIS IS AN EXAMPLE

import { Sequelize, DataTypes, Model } from 'sequelize';

class Foo extends Model {
    declare id: number;
}

export function initModel(sequelize: Sequelize) {
    Foo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, { sequelize });
}