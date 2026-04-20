import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/dbConnect.js';


class Post extends Model { }

Post.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING(200), allowNull: false },
        body: { type: DataTypes.TEXT, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
    }
);

export default Post;