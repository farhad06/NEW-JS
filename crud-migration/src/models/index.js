// src/models/index.js
// This is like Laravel's relationship methods, but all in one place

import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';

// User has many Posts  (like Laravel: $this->hasMany(Post::class))
User.hasMany(Post, { foreignKey: 'user_id', as: 'posts' });

// Post belongs to User  (like Laravel: $this->belongsTo(User::class))
Post.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

// Post has many Comments
Post.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });

// Comment belongs to Post
Comment.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });

// Comment belongs to User
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'commenter' });

// User has many Comments
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });

export { User, Post, Comment };