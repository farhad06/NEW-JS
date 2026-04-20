import { Post, User, Comment } from '../models/index.js';

// GET /posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, as: 'author', attributes: ['id', 'name', 'email'] },
                {
                    model: Comment, as: 'comments',
                    include: [{ model: User, as: 'commenter', attributes: ['id', 'name'] }],
                },
            ],
        });
        res.json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// POST /posts
export const createPost = async (req, res) => {
    try {
        const { title, body, user_id } = req.body;
        const post = await Post.create({ title, body, user_id });
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// DELETE /posts/:id
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
        await post.destroy();
        res.json({ success: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};