import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect.js';


class Comment extends Model { }

Comment.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        content: { type: DataTypes.TEXT, allowNull: false },
        post_id: { type: DataTypes.INTEGER, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments',
        timestamps: true,
    }
);

export default Comment;